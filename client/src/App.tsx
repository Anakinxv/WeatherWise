import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./Layout/AuthLayout";
import LogIn from "./pages/LogIn";
import Resgister from "./pages/Resgister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import DashboardHome from "./pages/DashboardHome";
import { useAuthStore } from "./store/useAppStores";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/commonComponents.tsx/LoadingSpinner";

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
          <Route path="/" element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Resgister />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
          </Route>

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
