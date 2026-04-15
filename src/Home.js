// File: src/Home.js

import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 35%, #1d4ed8 100%)",
        color: "white"
      }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div className="container">
          <span className="navbar-brand fw-bold fs-3">
            Birth Registration Portal
          </span>

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-light px-4 fw-bold"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>

            <button
              className="btn btn-light px-4 fw-bold text-primary"
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 mb-5">
            <div
              className="badge px-4 py-2 mb-4"
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "30px",
                fontSize: "14px"
              }}
            >
              Government Verified Digital Service
            </div>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "4rem",
                lineHeight: "1.1"
              }}
            >
              Secure Birth Registration & Certificate Portal
            </h1>

            <p
              className="mb-5"
              style={{
                fontSize: "1.2rem",
                color: "#cbd5e1",
                lineHeight: "1.8"
              }}
            >
              Register a birth online, upload documents, track hospital and BMC
              verification, and receive a digitally signed birth certificate.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
                style={{
                  borderRadius: "14px",
                  background:
                    "linear-gradient(to right, #2563eb, #3b82f6)",
                  border: "none"
                }}
                onClick={() => (window.location.href = "/register")}
              >
                Start Registration
              </button>

              <button
                className="btn btn-outline-light btn-lg px-5 py-3 fw-bold"
                style={{
                  borderRadius: "14px"
                }}
                onClick={() => (window.location.href = "/login")}
              >
                Track Application
              </button>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 mb-3">
                <div
                  className="p-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "18px",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <h3 className="fw-bold">24x7</h3>
                  <div style={{ color: "#cbd5e1" }}>
                    Online Service
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div
                  className="p-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "18px"
                  }}
                >
                  <h3 className="fw-bold">100%</h3>
                  <div style={{ color: "#cbd5e1" }}>
                    Secure Verification
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div
                  className="p-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "18px"
                  }}
                >
                  <h3 className="fw-bold">Instant</h3>
                  <div style={{ color: "#cbd5e1" }}>
                    Certificate Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="p-5"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "30px",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <h3 className="fw-bold mb-4 text-center">
                Application Workflow
              </h3>

              <div className="mb-4 d-flex">
                <div
                  className="me-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    fontWeight: "bold"
                  }}
                >
                  1
                </div>

                <div>
                  <h5 className="fw-bold">User Registration</h5>
                  <p style={{ color: "#cbd5e1" }}>
                    Create account and login securely.
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <div
                  className="me-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    fontWeight: "bold"
                  }}
                >
                  2
                </div>

                <div>
                  <h5 className="fw-bold">Birth Registration</h5>
                  <p style={{ color: "#cbd5e1" }}>
                    Fill child and parent details and upload documents.
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <div
                  className="me-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    fontWeight: "bold"
                  }}
                >
                  3
                </div>

                <div>
                  <h5 className="fw-bold">Hospital Verification</h5>
                  <p style={{ color: "#cbd5e1" }}>
                    Hospital verifies documents and approves the application.
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <div
                  className="me-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    fontWeight: "bold"
                  }}
                >
                  4
                </div>

                <div>
                  <h5 className="fw-bold">BMC Approval</h5>
                  <p style={{ color: "#cbd5e1" }}>
                    BMC officer reviews and generates the certificate.
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div
                  className="me-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#16a34a",
                    borderRadius: "50%",
                    fontWeight: "bold"
                  }}
                >
                  5
                </div>

                <div>
                  <h5 className="fw-bold">Certificate Delivered</h5>
                  <p style={{ color: "#cbd5e1" }}>
                    User receives downloadable birth certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default Home;