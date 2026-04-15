import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #dbeafe, #f8fafc)",
        padding: "40px"
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">
            Birth Registration Dashboard
          </h1>
          <p className="text-muted fs-5">
            Welcome to the Birth Registration and Management System
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">New Registration</h4>
              <p className="text-muted">
                Fill a new birth registration form
              </p>
              <Link to="/birth" className="btn btn-primary mt-auto">
                Open Form
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">Upload Documents</h4>
              <p className="text-muted">
                Upload Aadhaar, Birth Slip and Address Proof
              </p>
              <Link to="/documents" className="btn btn-success mt-auto">
                Upload
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">Application Status</h4>
              <p className="text-muted">
                Track your application progress
              </p>
              <Link to="/status" className="btn btn-warning mt-auto">
                View Status
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">Certificate</h4>
              <p className="text-muted">
                Download and print birth certificate
              </p>
              <Link to="/certificate" className="btn btn-info text-white mt-auto">
                Open Certificate
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">Hospital Verification</h4>
              <p className="text-muted">
                Hospital staff can approve or reject applications
              </p>
              <Link to="/hospital" className="btn btn-danger mt-auto">
                Open Hospital Panel
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 h-100 p-4 text-center">
              <h4 className="fw-bold mb-3">BMC Verification</h4>
              <p className="text-muted">
                BMC officer approval and certificate generation
              </p>
              <Link to="/bmc" className="btn btn-dark mt-auto">
                Open BMC Panel
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;