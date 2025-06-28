import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./Layout/AuthLayout";
import LogIn from "./pages/LogIn";
import Resgister from "./pages/Resgister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";

import { useAuthStore } from "./store/useAppStores";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/commonComponents.tsx/LoadingSpinner";
import DashLayout from "./Layout/DashLayout";

// Importaciones corregidas de páginas del Dashboard
import Home from "./pages/Dashboard/Home";
import Buscar from "./pages/Dashboard/Buscar";
import Favorites from "./pages/Dashboard/Favorites"; // Corregido
import Historial from "./pages/Dashboard/Historial"; // Corregido
import Settings from "./pages/Dashboard/Settings";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isloading);

  // Utilizar el spinner global, así que no es necesario mostrar uno aquí
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const isLoading = useAuthStore((state) => state.isloading);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Resgister />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
          </Route>

          <Route element={<DashLayout />}>
            {/* Rutas del Dashboard correctamente configuradas */}
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
