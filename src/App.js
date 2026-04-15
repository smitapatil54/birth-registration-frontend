// File: src/App.js

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import BirthForm from "./BirthForm";
import DocumentUpload from "./DocumentUpload";
import StatusPage from "./StatusPage";
import HospitalDashboard from "./HospitalDashboard";
import BmcDashboard from "./BmcDashboard";
import CertificatePage from "./CertificatePage";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/birth"
          element={
            userRole === "USER" ? (
              <BirthForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/documents"
          element={
            userRole === "USER" ? (
              <DocumentUpload />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/status"
          element={
            userRole === "USER" ? (
              <StatusPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/certificate"
          element={
            userRole === "USER" ? (
              <CertificatePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/hospital"
          element={
            userRole === "HOSPITAL" ? (
              <HospitalDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/bmc"
          element={
            userRole === "BMC" ? (
              <BmcDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;