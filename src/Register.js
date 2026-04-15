// File: src/Register.js

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "USER"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    if (
      user.name.trim() === "" ||
      user.email.trim() === "" ||
      user.mobile.trim() === "" ||
      user.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/user/register`,
        user
      );

      if (response.data.message === "Registration Success") {
        alert("Registration Successful");

        window.location.href = "/login";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
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
          maxWidth: "1150px",
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
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "30px"
              }}
            >
              BR
            </div>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "3.2rem",
                lineHeight: "1.15"
              }}
            >
              Create Your Account
            </h1>

            <p
              style={{
                color: "#dbeafe",
                fontSize: "1.1rem",
                lineHeight: "1.9"
              }}
            >
              Register as a citizen, hospital officer, or BMC officer to access
              the Birth Registration & Certificate Management System.
            </p>

            <div className="mt-5">
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
                <span>Secure Registration</span>
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
                <span>Digital Certificate Generation</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-white p-5">
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-2">
                Register
              </h2>

              <p className="text-muted">
                Fill in your details to continue
              </p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter your full name"
                style={{
                  borderRadius: "16px",
                  padding: "14px"
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter your email"
                style={{
                  borderRadius: "16px",
                  padding: "14px"
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter your mobile number"
                style={{
                  borderRadius: "16px",
                  padding: "14px"
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Create password"
                style={{
                  borderRadius: "16px",
                  padding: "14px"
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Register As
              </label>

              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="form-select form-select-lg"
                style={{
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <option value="USER">Citizen / Parent</option>
                <option value="HOSPITAL">Hospital Officer</option>
                <option value="BMC">BMC Officer</option>
              </select>
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
              onClick={register}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <div className="text-center mt-4">
              <span className="text-muted">
                Already have an account?
              </span>

              <span
                className="fw-bold ms-2"
                style={{
                  color: "#2563eb",
                  cursor: "pointer"
                }}
                onClick={() => (window.location.href = "/login")}
              >
                Login Here
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

export default Register;