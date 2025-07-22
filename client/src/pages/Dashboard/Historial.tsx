import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, ArrowRight } from "@geist-ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
// ...existing code...

const historialClima = [
  {
    id: 1,
    ciudad: "Santo Domingo",
    estado: "Distrito Nacional",
    pais: "República Dominicana",
    lat: 18.4861,
    lon: -69.9312,
    temperatura: 32,
    condicion: "Soleado",
    fecha: "2025-07-21",
    hora: "12:30:00 PM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },

  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
  {
    id: 2,
    ciudad: "Madrid",
    estado: "Madrid",
    pais: "España",
    lat: 40.4168,
    lon: -3.7038,
    temperatura: 27,
    condicion: "Parcialmente nublado",
    fecha: "2025-07-21",
    hora: "6:10:00 PM",
  },
  {
    id: 3,
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    pais: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    temperatura: 21,
    condicion: "Lluvia ligera",
    fecha: "2025-07-21",
    hora: "1:45:00 PM",
  },
  {
    id: 4,
    ciudad: "New York",
    estado: "NY",
    pais: "Estados Unidos",
    lat: 40.7128,
    lon: -74.006,
    temperatura: 29,
    condicion: "Nublado",
    fecha: "2025-07-21",
    hora: "9:15:00 AM",
  },
];

function Historial() {
  const ItemsPerPage = 20;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(historialClima.length / ItemsPerPage);
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentItems = historialClima.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Función para generar los números de página a mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Si hay muchas páginas, mostrar con lógica de elipsis
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      // Siempre mostrar la primera página
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis-start");
        }
      }

      // Páginas del rango actual
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Siempre mostrar la última página
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis-end");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Encabezado */}
      <section className="w-full flex justify-between items-center ">
        <header className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Historial de Búsqueda</h1>
          <p className="text-gray-600">
            Aquí puedes ver el historial de tus búsquedas de clima.
          </p>
        </header>

        <div className="mt-4">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Limpiar Historial
          </Button>
        </div>
      </section>

      <section className="w-full max-w-6xl">
        <Table>
          <TableCaption>
            Historial de búsquedas de clima. Puedes limpiar el historial en
            cualquier momento. Página {currentPage} de {totalPages}
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Temperatura</TableHead>
              <TableHead>Condición</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No hay registros en el historial.
                </TableCell>
              </TableRow>
            )}
            {currentItems.map((registro, index) => (
              <TableRow key={`${registro.id}-${startIndex + index}`}>
                <TableCell>
                  {registro.fecha} {registro.hora}
                </TableCell>
                <TableCell>
                  {registro.ciudad}, {registro.estado}, {registro.pais}
                </TableCell>
                <TableCell>{registro.temperatura} °C</TableCell>
                <TableCell>{registro.condicion}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Trash />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowRight />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {typeof pageNumber === "string" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageClick(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
}

export default Historial;
