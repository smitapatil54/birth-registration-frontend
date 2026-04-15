// File: src/StatusPage.js

import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function StatusPage() {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const savedApplication = JSON.parse(
        localStorage.getItem("birthRegistration")
      );

      if (!savedApplication) {
        window.location.href = "/birth";
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/birth/${savedApplication.id}`
      );

      setApplication(response.data);

      localStorage.setItem(
        "birthRegistration",
        JSON.stringify(response.data)
      );

    } catch (error) {
      console.log(error);
      alert("Unable To Load Application Status");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStatusColor = () => {
    if (!application) return "#64748b";

    if (application.status === "Pending Hospital Verification") {
      return "#f59e0b";
    }

    if (application.status === "Pending BMC Approval") {
      return "#2563eb";
    }

    if (application.status === "Certificate Generated") {
      return "#16a34a";
    }

    if (
      application.status === "Rejected By Hospital" ||
      application.status === "Rejected By BMC"
    ) {
      return "#dc2626";
    }

    return "#64748b";
  };

  if (!application) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#f1f5f9"
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3"></div>
          <h4>Loading Application Status...</h4>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        padding: "40px 20px"
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold text-primary mb-2">
              Application Status
            </h1>

            <p className="text-muted fs-5 mb-0">
              Track your birth registration application
            </p>
          </div>

          <div className="d-flex gap-3">
            {application.status === "Certificate Generated" && (
              <button
                className="btn btn-success px-4 py-2 fw-bold"
                style={{ borderRadius: "14px" }}
                onClick={() =>
                  (window.location.href = "/certificate")
                }
              >
                View Certificate
              </button>
            )}

            <button
              className="btn btn-outline-danger px-4 py-2 fw-bold"
              style={{ borderRadius: "14px" }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "30px",
            overflow: "hidden"
          }}
        >
          <div
            className="p-5 text-white"
            style={{
              background:
                "linear-gradient(to right, #1e3a8a, #2563eb)"
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="fw-bold mb-2">
                  {application.applicationId}
                </h2>

                <div className="fs-5">
                  Child Name: {application.childName}
                </div>
              </div>

              <div
                className="px-4 py-3 mt-3 mt-md-0 fw-bold"
                style={{
                  background: getStatusColor(),
                  borderRadius: "14px",
                  fontSize: "16px"
                }}
              >
                {application.status}
              </div>
            </div>
          </div>

          <div className="p-5 bg-white">
            <div className="row mb-5">
              <div className="col-md-4 mb-4">
                <strong>Father Name</strong>
                <div>{application.fatherName}</div>
              </div>

              <div className="col-md-4 mb-4">
                <strong>Mother Name</strong>
                <div>{application.motherName}</div>
              </div>

              <div className="col-md-4 mb-4">
                <strong>Gender</strong>
                <div>{application.gender}</div>
              </div>

              <div className="col-md-4 mb-4">
                <strong>Date Of Birth</strong>
                <div>{application.birthDate}</div>
              </div>

              <div className="col-md-4 mb-4">
                <strong>Time Of Birth</strong>
                <div>{application.birthTime}</div>
              </div>

              <div className="col-md-4 mb-4">
                <strong>Hospital Name</strong>
                <div>{application.hospitalName}</div>
              </div>

              <div className="col-md-12 mb-4">
                <strong>Address</strong>
                <div>{application.address}</div>
              </div>
            </div>

            <h3 className="fw-bold text-primary mb-4">
              Application Progress
            </h3>

            <div className="row">
              <div className="col-md-4 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "20px",
                    background: "#dbeafe"
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="mx-auto mb-3 d-flex justify-content-center align-items-center text-white fw-bold"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background: "#2563eb"
                      }}
                    >
                      1
                    </div>

                    <h5 className="fw-bold">
                      Application Submitted
                    </h5>

                    <p className="text-muted mb-0">
                      Birth registration and documents submitted successfully
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "20px",
                    background:
                      application.status === "Pending BMC Approval" ||
                      application.status === "Certificate Generated"
                        ? "#dcfce7"
                        : application.status === "Rejected By Hospital"
                        ? "#fee2e2"
                        : "#fef3c7"
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="mx-auto mb-3 d-flex justify-content-center align-items-center text-white fw-bold"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background:
                          application.status === "Rejected By Hospital"
                            ? "#dc2626"
                            : "#16a34a"
                      }}
                    >
                      2
                    </div>

                    <h5 className="fw-bold">
                      Hospital Verification
                    </h5>

                    <p className="text-muted mb-0">
                      {application.status === "Pending Hospital Verification" &&
                        "Your application is waiting for hospital approval"}

                      {application.status === "Pending BMC Approval" &&
                        "Hospital has approved your application"}

                      {application.status === "Certificate Generated" &&
                        "Hospital verification completed successfully"}

                      {application.status === "Rejected By Hospital" &&
                        "Hospital rejected your application"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "20px",
                    background:
                      application.status === "Certificate Generated"
                        ? "#dcfce7"
                        : application.status === "Rejected By BMC"
                        ? "#fee2e2"
                        : "#e2e8f0"
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="mx-auto mb-3 d-flex justify-content-center align-items-center text-white fw-bold"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        background:
                          application.status === "Certificate Generated"
                            ? "#16a34a"
                            : application.status === "Rejected By BMC"
                            ? "#dc2626"
                            : "#64748b"
                      }}
                    >
                      3
                    </div>

                    <h5 className="fw-bold">
                      BMC Approval & Certificate
                    </h5>

                    <p className="text-muted mb-0">
                      {application.status === "Pending Hospital Verification" &&
                        "Waiting for hospital approval before BMC verification"}

                      {application.status === "Pending BMC Approval" &&
                        "Application approved by hospital and waiting for BMC"}

                      {application.status === "Certificate Generated" &&
                        "Certificate generated successfully. You can now view and download it."}

                      {application.status === "Rejected By BMC" &&
                        "BMC rejected your application"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {application.status === "Certificate Generated" && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-success btn-lg px-5 fw-bold"
                  style={{ borderRadius: "14px" }}
                  onClick={() =>
                    (window.location.href = "/certificate")
                  }
                >
                  View Birth Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;