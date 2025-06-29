import React from "react";
import { useState, useEffect } from "react";
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

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentLevel, setCurrentLevel] = useState<"country" | "city">(
    "country"
  );

  const getPlaceholder = () => {
    if (!selectedCity && !selectedCountry) {
      return "Selecciona un país y una ciudad";
    } else if (selectedCity) {
      return `${selectedCountry}, ${selectedCity}`;
    } else if (selectedCountry) {
      return `${selectedCountry}`;
    }
    return "Selecciona un país y una ciudad";
  };

  // Use useEffect to handle level changes
  useEffect(() => {
    if (selectedCity) {
      setCurrentLevel("city");
    } else if (selectedCountry) {
      setCurrentLevel("country");
    }
  }, [selectedCity, selectedCountry]);

  const handleBackToCountries = () => {
    setCurrentLevel("country");
    setSelectedCity("");
  };

  const getEmptyMessage = () => {
    return currentLevel === "country"
      ? "No se encontró el país."
      : "No se encontró la ciudad.";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-6">
      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                color: "var(--sidebar-text)",
                borderColor: "var(--sidebar-secondary)",
              }}
            >
              {getPlaceholder()}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full max-w-md p-0"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              borderColor: "var(--sidebar-secondary)",
            }}
          >
            <Command style={{ backgroundColor: "var(--sidebar-bg)" }}>
              <div
                className="flex items-center px-3"
                style={{ backgroundColor: "var(--sidebar-nav-bg)" }}
              >
                {currentLevel === "city" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 mr-2 hover:bg-[var(--sidebar-bg)]"
                    onClick={handleBackToCountries}
                    style={{
                      color: "var(--sidebar-text)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <CommandInput
                  placeholder={`Buscar ${currentLevel}`}
                  style={{
                    backgroundColor: "var(--sidebar-nav-bg)",
                    color: "var(--sidebar-text)",
                  }}
                />
              </div>
              <CommandList style={{ backgroundColor: "var(--sidebar-nav-bg)" }}>
                <CommandEmpty style={{ color: "var(--sidebar-secondary)" }}>
                  {getEmptyMessage()}
                </CommandEmpty>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
