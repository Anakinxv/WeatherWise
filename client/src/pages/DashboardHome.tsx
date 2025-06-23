import React from "react";

function DashboardHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Bienvenido al Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1 */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-2">Usuarios activos</h2>
          <p className="text-3xl font-bold text-blue-600">128</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-2">Reportes hoy</h2>
          <p className="text-3xl font-bold text-green-600">32</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-2">Tareas pendientes</h2>
          <p className="text-3xl font-bold text-red-600">7</p>
        </div>
      </div>

      {/* Sección adicional */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Últimas actualizaciones</h2>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-700">No hay actualizaciones recientes.</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
