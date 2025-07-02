import React, { useEffect } from "react";
import { Check, ChevronsUpDown, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "@/store/useAppStores";

export function Combobox() {
  const countries = useAppStore((state) => state.countries);
  const states = useAppStore((state) => state.states);
  const getCountries = useAppStore((state) => state.getCountries);
  const getStatesByCountry = useAppStore((state) => state.getStatesByCountry);
  const isLoading = useAppStore((state) => state.isloading);
  const error = useAppStore((state) => state.error);
  const openModal = useAppStore((state) => state.openModal);
  const setOpenModal = useAppStore((state) => state.setOpenModal);
  const selectedCountry = useAppStore((state) => state.selectedCountry);
  const selectedState = useAppStore((state) => state.selectedState);
  const setSelectedCountry = useAppStore((state) => state.setSelectedCountry);
  const setSelectedState = useAppStore((state) => state.setSelectedState);
  const currentLevel = useAppStore((state) => state.currentLevel);
  const setCurrentLevel = useAppStore((state) => state.setCurrentLevel);
  const fetchWeather = useAppStore((state) => state.fetchWeatherData);
  const fetchForecast = useAppStore((state) => state.fetchForecastData);
  // Cargar países al montar el componente
  useEffect(() => {
    console.log("Countries length:", countries.length);
    if (countries.length === 0) {
      console.log("Loading countries...");
      getCountries();
    }
  }, [countries.length, getCountries]);

  // Cargar estados cuando se selecciona un país
  useEffect(() => {
    if (selectedCountry && currentLevel === "country") {
      console.log("Loading states for:", selectedCountry);
      getStatesByCountry(selectedCountry).then(() => {
        setCurrentLevel("state");
      });
    }
  }, [selectedCountry, currentLevel, getStatesByCountry, setCurrentLevel]);

  const getPlaceholder = () => {
    if (error) {
      return `Error: ${error}`;
    }
    if (isLoading) {
      return "Cargando...";
    }
    if (!selectedState && !selectedCountry) {
      return "Selecciona un país y una ciudad";
    } else if (selectedState) {
      return `${selectedCountry}, ${selectedState}`;
    } else if (selectedCountry) {
      return `${selectedCountry}`;
    }
    return "Selecciona un país y una ciudad";
  };

  const handleBackToCountries = () => {
    setCurrentLevel("country");
    setSelectedState("");
    setSelectedCountry(""); // Add this line to clear the selected country
  };

  const handleCountrySelect = (country: string) => {
    console.log("Country selected:", country);
    setSelectedCountry(country);
    setSelectedState("");
    // No cambies el nivel aquí, solo cuando termine el fetch
  };

  const handleStateSelect = (state: string) => {
    console.log("State selected:", state);
    setSelectedState(state);
    fetchWeather(state); // Fetch weather data for the selected state
    fetchForecast(state); // Fetch forecast data for the selected state
    setOpenModal(false);
  };

  const getEmptyMessage = () => {
    if (isLoading) {
      return "Cargando datos...";
    }
    return currentLevel === "country"
      ? "No se encontró el país."
      : "No se encontró la ciudad.";
  };

  const getCurrentItems = () => {
    console.log("Current level:", currentLevel);
    console.log("Countries:", countries);
    console.log("States:", states);

    if (currentLevel === "country") {
      return countries || [];
    } else {
      return states || [];
    }
  };

  return (
    <div className="">
      <div className="space-y-2">
        <Popover open={openModal} onOpenChange={setOpenModal}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openModal}
              className="w-[350px] justify-between h-10" // Ancho fijo de 350px y altura fija
              style={{
                backgroundColor: "var(--sidebar-bg)",
                color: error
                  ? "var(--destructive, #ff0000)"
                  : "var(--sidebar-text)",
                borderColor: error
                  ? "var(--destructive, #ff0000)"
                  : "var(--sidebar-secondary)",
              }}
              disabled={isLoading}
            >
              <div className="truncate text-left w-[290px]">
                {getPlaceholder()}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[350px] p-0 shadow-lg rounded-md overflow-hidden animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              border: "1px solid var(--sidebar-secondary)",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Command style={{ backgroundColor: "var(--sidebar-bg)" }}>
              <div
                className="flex items-center px-3 py-2"
                style={{
                  backgroundColor: "var(--sidebar-nav-bg)",
                  borderBottomWidth: "0.5px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "var(--sidebar-secondary)",
                }}
              >
                {currentLevel === "state" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 mr-2 rounded-full hover:bg-[var(--sidebar-bg)] transition-colors"
                    onClick={handleBackToCountries}
                    style={{
                      color: "var(--sidebar-text)",
                    }}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <CommandInput
                  placeholder={`Buscar ${
                    currentLevel === "country" ? "país" : "ciudad"
                  }`}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--sidebar-text)",
                    boxShadow: "none",
                    border: "none",
                  }}
                  disabled={isLoading}
                  className="focus:outline-none outline-none border-none shadow-none"
                />
              </div>
              <CommandList
                style={{
                  backgroundColor: "var(--sidebar-nav-bg)",
                  height: "250px",
                  overflowY: "auto",
                }}
                className="scrollbar-thin scrollbar-thumb-[var(--sidebar-secondary)] scrollbar-track-transparent"
              >
                <CommandEmpty
                  style={{ color: "var(--sidebar-secondary)", padding: "12px" }}
                >
                  {getEmptyMessage()}
                </CommandEmpty>
                {!isLoading && (
                  <CommandGroup className="p-1">
                    {getCurrentItems().map((item, index) => (
                      <CommandItem
                        key={item.id || index}
                        value={item.name}
                        onSelect={() => {
                          if (currentLevel === "country") {
                            handleCountrySelect(item.name);
                          } else {
                            handleStateSelect(item.name);
                          }
                        }}
                        style={{
                          color: "var(--sidebar-text)",
                        }}
                        className="rounded-sm hover:bg-[var(--sidebar-bg)] transition-colors my-1 cursor-pointer"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 flex-shrink-0 ${
                            (currentLevel === "country"
                              ? selectedCountry
                              : selectedState) === item.name
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {isLoading && (
                  <div
                    className="py-8 text-center flex items-center justify-center"
                    style={{ color: "var(--sidebar-text)" }}
                  >
                    <div className="animate-pulse">Cargando...</div>
                  </div>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
