// File: src/HospitalDashboard.js

import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function HospitalDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/birth/all`
      );

      const pendingApplications = response.data.filter(
        (item) =>
          item.status === "Pending Hospital Verification"
      );

      setApplications(pendingApplications);
    } catch (error) {
      console.log(error);
      alert("Unable To Load Applications");
    }
  };

  const approveApplication = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/birth/status/${id}?status=Pending BMC Approval`
      );

      alert("Application Approved And Sent To BMC");
      loadApplications();
    } catch (error) {
      console.log(error);
      alert("Unable To Approve Application");
    }
  };

  const rejectApplication = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/birth/status/${id}?status=Rejected By Hospital`
      );

      alert("Application Rejected");
      loadApplications();
    } catch (error) {
      console.log(error);
      alert("Unable To Reject Application");
    }
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/birth/delete/${id}`
      );

      alert("Application Deleted");
      loadApplications();
    } catch (error) {
      console.log(error);
      alert("Unable To Delete Application");
    }
  };

  const openDocument = (fileName) => {
    if (!fileName) {
      alert("Document Not Uploaded");
      return;
    }

    window.open(
      `${API_URL}/uploads/${fileName}`,
      "_blank"
    );
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

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
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold text-primary mb-2">
              Hospital Verification Dashboard
            </h1>

            <p className="text-muted fs-5 mb-0">
              Review applications, verify documents and send to BMC
            </p>
          </div>

          <button
            className="btn btn-outline-danger fw-bold px-4 py-2"
            style={{ borderRadius: "14px" }}
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {applications.length === 0 ? (
          <div
            className="card border-0 shadow-sm text-center p-5"
            style={{ borderRadius: "24px" }}
          >
            <h3 className="fw-bold text-secondary">
              No Pending Applications
            </h3>

            <p className="text-muted mb-0 mt-2">
              All applications have been verified.
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="card border-0 shadow-lg mb-5"
              style={{
                borderRadius: "28px",
                overflow: "hidden"
              }}
            >
              <div
                className="p-4 text-white"
                style={{
                  background:
                    "linear-gradient(to right, #1e3a8a, #2563eb)"
                }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h2 className="fw-bold mb-2">
                      {app.applicationId}
                    </h2>

                    <div className="fs-5">
                      Child Name: {app.childName}
                    </div>
                  </div>

                  <div
                    className="px-4 py-2 mt-3 mt-md-0 fw-bold"
                    style={{
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.15)"
                    }}
                  >
                    {app.status}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white">
                <h3 className="fw-bold text-primary mb-4">
                  Birth Registration Details
                </h3>

                <div className="row">
                  <div className="col-md-4 mb-4">
                    <strong>Child Name</strong>
                    <div>{app.childName}</div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <strong>Gender</strong>
                    <div>{app.gender}</div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <strong>Date Of Birth</strong>
                    <div>{app.birthDate}</div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <strong>Time Of Birth</strong>
                    <div>{app.birthTime}</div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <strong>Father Name</strong>
                    <div>{app.fatherName}</div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <strong>Mother Name</strong>
                    <div>{app.motherName}</div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <strong>Hospital Name</strong>
                    <div>{app.hospitalName}</div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <strong>Address</strong>
                    <div>{app.address}</div>
                  </div>
                </div>

                <hr className="my-4" />

                <h3 className="fw-bold text-primary mb-4">
                  Uploaded Documents
                </h3>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 py-3 fw-bold"
                      style={{ borderRadius: "14px" }}
                      onClick={() => openDocument(app.motherAadhar)}
                    >
                      View Mother Aadhaar
                    </button>
                  </div>

                  <div className="col-md-4 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 py-3 fw-bold"
                      style={{ borderRadius: "14px" }}
                      onClick={() => openDocument(app.fatherAadhar)}
                    >
                      View Father Aadhaar
                    </button>
                  </div>

                  <div className="col-md-4 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 py-3 fw-bold"
                      style={{ borderRadius: "14px" }}
                      onClick={() => openDocument(app.birthSlip)}
                    >
                      View Birth Slip
                    </button>
                  </div>

                  <div className="col-md-6 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 py-3 fw-bold"
                      style={{ borderRadius: "14px" }}
                      onClick={() => openDocument(app.addressProof)}
                    >
                      View Address Proof
                    </button>
                  </div>

                  <div className="col-md-6 mb-3">
                    <button
                      className="btn btn-outline-primary w-100 py-3 fw-bold"
                      style={{ borderRadius: "14px" }}
                      onClick={() =>
                        openDocument(app.marriageCertificate)
                      }
                    >
                      View Marriage Certificate
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mt-5">
                  <button
                    className="btn btn-success btn-lg px-5 fw-bold"
                    style={{ borderRadius: "14px" }}
                    onClick={() => approveApplication(app.id)}
                  >
                    Approve & Send To BMC
                  </button>

                  <button
                    className="btn btn-danger btn-lg px-5 fw-bold"
                    style={{ borderRadius: "14px" }}
                    onClick={() => rejectApplication(app.id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-outline-dark btn-lg px-5 fw-bold"
                    style={{ borderRadius: "14px" }}
                    onClick={() => deleteApplication(app.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HospitalDashboard;