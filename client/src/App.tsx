import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./Layout/AuthLayout";
import LogIn from "./pages/LogIn";
import Resgister from "./pages/Resgister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogIn></LogIn>} />
          <Route path="/register" element={<Resgister></Resgister>} />
          <Route
            path="/reset-password"
            element={<ResetPassword></ResetPassword>}
          />
          \
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
