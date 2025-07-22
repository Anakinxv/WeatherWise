import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Preferencias from "@/components/SettingsComponents/Preferencias";
import Seguridad from "@/components/SettingsComponents/Seguridad";
import VistalGeneral from "@/components/SettingsComponents/VistalGeneral";

function Settings() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Encabezado */}
      <section className="w-full flex justify-between items-center">
        <header className="mb-4">
          <h1 className="text-2xl font-bold mb-2 text-[var(--sidebar-text)]">
            Configuración
          </h1>
          <p className="text-[var(--sidebar-secondary)]">
            Personaliza tu experiencia y ajusta tus preferencias según tus
            necesidades.
          </p>
        </header>
      </section>

      <section className="w-full flex items-center  rounded-lg ">
        <Tabs className="w-full  bg-none  " defaultValue="general">
          <TabsList className="w-full  h-full text-[var(--sidebar-secondary)] border border-[var(--sidebar-border)] rounded-lg grid grid-cols-3">
            <TabsTrigger
              value="general"
              className="h-full text-[var(--sidebar-text)] data-[state=active]:bg-[var(--sidebar-icon)] data-[state=active]:text-white font-medium transition-all duration-200 hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-text)]"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="h-full text-[var(--sidebar-text)] data-[state=active]:bg-[var(--sidebar-icon)] data-[state=active]:text-white font-medium transition-all duration-200 hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-text)]"
            >
              Preferencias
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="h-full text-[var(--sidebar-text)] data-[state=active]:bg-[var(--sidebar-icon)] data-[state=active]:text-white font-medium transition-all duration-200 hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-text)]"
            >
              Seguridad
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 h-96 overflow-y-auto bg-[var(--sidebar-bg)] rounded-lg border border-[var(--sidebar-border)] p-4">
            <TabsContent value="general" className="h-full m-0">
              <VistalGeneral />
            </TabsContent>
            <TabsContent value="preferences" className="h-full m-0">
              <Preferencias />
            </TabsContent>
            <TabsContent value="security" className="h-full m-0">
              <Seguridad />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default Settings;
