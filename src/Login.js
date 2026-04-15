// File: src/Login.js

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    if (user.email.trim() === "" || user.password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/user/login`,
        user
      );

      const data = response.data;

      if (data.message !== "Login Success") {
        alert("Invalid Email or Password");
        setLoading(false);
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(data));
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);

      if (data.role === "USER") {
        try {
          const applicationResponse = await axios.get(
            `${API_URL}/api/birth/user/${data.id}`
          );

          if (applicationResponse.data) {
            localStorage.setItem(
              "birthRegistration",
              JSON.stringify(applicationResponse.data)
            );

            if (
              applicationResponse.data.status ===
              "Certificate Generated"
            ) {
              window.location.href = "/certificate";
            } else {
              window.location.href = "/status";
            }
          } else {
            window.location.href = "/birth";
          }
        } catch {
          window.location.href = "/birth";
        }
      }

      if (data.role === "HOSPITAL") {
        window.location.href = "/hospital";
      }

      if (data.role === "BMC") {
        window.location.href = "/bmc";
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 30%, #1d4ed8 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "1100px",
          borderRadius: "32px"
        }}
      >
        <div className="row g-0">
          <div
            className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5 text-white"
            style={{
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)"
            }}
          >
            <div
              className="mb-4"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              BR
            </div>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "3.5rem",
                lineHeight: "1.1"
              }}
            >
              Welcome Back
            </h1>

            <p
              className="mb-5"
              style={{
                fontSize: "1.15rem",
                color: "#dbeafe",
                lineHeight: "1.8"
              }}
            >
              Access your birth registration application, hospital verification,
              BMC approval status, and download your certificate instantly.
            </p>

            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#93c5fd",
                    marginRight: "12px"
                  }}
                ></div>
                <span>Secure User Login</span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#93c5fd",
                    marginRight: "12px"
                  }}
                ></div>
                <span>Hospital & BMC Verification</span>
              </div>

              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#93c5fd",
                    marginRight: "12px"
                  }}
                ></div>
                <span>Instant Certificate Access</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-white p-5">
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-2">
                Sign In
              </h2>

              <p className="text-muted">
                Login to continue to the Birth Registration Portal
              </p>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control form-control-lg"
                style={{
                  borderRadius: "16px",
                  padding: "14px",
                  border: "1px solid #cbd5e1"
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-control form-control-lg"
                style={{
                  borderRadius: "16px",
                  padding: "14px",
                  border: "1px solid #cbd5e1"
                }}
              />
            </div>

            <button
              className="btn btn-lg w-100 text-white fw-bold"
              style={{
                background:
                  "linear-gradient(to right, #2563eb, #1d4ed8)",
                border: "none",
                borderRadius: "16px",
                padding: "14px"
              }}
              onClick={login}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            <div className="text-center mt-4">
              <span className="text-muted">
                Don't have an account?
              </span>

              <span
                className="fw-bold ms-2"
                style={{
                  color: "#2563eb",
                  cursor: "pointer"
                }}
                onClick={() => (window.location.href = "/register")}
              >
                Register Here
              </span>
            </div>

            <div className="text-center mt-3">
              <span
                style={{
                  color: "#64748b",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
                onClick={() => (window.location.href = "/")}
              >
                ← Back To Home
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;