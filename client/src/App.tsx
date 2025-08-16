import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthLayout from "./Layout/AuthLayout";
import LogIn from "./pages/LogIn";
import Resgister from "./pages/Resgister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";

import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/commonComponents.tsx/LoadingSpinner";
import DashLayout from "./Layout/DashLayout";

// Importaciones corregidas de páginas del Dashboard
import Home from "./pages/Dashboard/Home";
import Buscar from "./pages/Dashboard/Buscar";
import Favorites from "./pages/Dashboard/Favorites";
import Historial from "./pages/Dashboard/Historial";
import Settings from "./pages/Dashboard/Settings";
import VerDetallesDeBusqueda from "./pages/Dashboard/VerDetallesDeBusqueda";
import { useAppStore } from "./store/useAppStores"; // Corregido: singular

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isLoading = useAppStore((state) => state.isloading); // Corregido: isLoading

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const isLoading = useAppStore((state) => state.isloading); // Corregido: isLoading

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Resgister />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
          </Route>

          <Route element={<DashLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/search"
              element={
                <ProtectedRoute>
                  <Buscar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <ProtectedRoute>
                  <Historial />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/search/details/:lat/:lon"
              element={
                <ProtectedRoute>
                  <VerDetallesDeBusqueda />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
