// File: src/DocumentUpload.js

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function DocumentUpload() {
  const [documents, setDocuments] = useState({
    motherAadhar: null,
    fatherAadhar: null,
    birthSlip: null,
    addressProof: null,
    marriageCertificate: null
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setDocuments({
      ...documents,
      [e.target.name]: e.target.files[0]
    });
  };

  const uploadDocuments = async () => {
    const birthRegistration = JSON.parse(
      localStorage.getItem("birthRegistration")
    );

    if (!birthRegistration) {
      alert("Please fill birth registration form first");
      window.location.href = "/birth";
      return;
    }

    if (
      !documents.motherAadhar ||
      !documents.fatherAadhar ||
      !documents.birthSlip ||
      !documents.addressProof
    ) {
      alert("Please upload all required documents");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "birthRegistrationId",
        birthRegistration.id
      );

      formData.append(
        "motherAadhar",
        documents.motherAadhar
      );

      formData.append(
        "fatherAadhar",
        documents.fatherAadhar
      );

      formData.append(
        "birthSlip",
        documents.birthSlip
      );

      formData.append(
        "addressProof",
        documents.addressProof
      );

      if (documents.marriageCertificate) {
        formData.append(
          "marriageCertificate",
          documents.marriageCertificate
        );
      }

      const response = await axios.post(
        `${API_URL}/api/document/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const updatedRegistration = {
        ...birthRegistration,
        motherAadhar: response.data.motherAadhar,
        fatherAadhar: response.data.fatherAadhar,
        birthSlip: response.data.birthSlip,
        addressProof: response.data.addressProof,
        marriageCertificate: response.data.marriageCertificate,
        status: "Pending Hospital Verification"
      };

      localStorage.setItem(
        "birthRegistration",
        JSON.stringify(updatedRegistration)
      );

      alert(
        "Documents Uploaded Successfully. Application Sent For Hospital Verification."
      );

      window.location.href = "/status";
    } catch (error) {
      console.log(error);
      alert("Document Upload Failed");
    } finally {
      setLoading(false);
    }
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
        <div
          className="card border-0 shadow-lg mx-auto"
          style={{
            maxWidth: "1000px",
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
            <h1 className="fw-bold mb-2">
              Upload Required Documents
            </h1>

            <p className="mb-0 fs-5">
              Upload all mandatory documents for hospital verification
            </p>
          </div>

          <div className="p-5 bg-white">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Mother Aadhaar Card *
                </label>

                <input
                  type="file"
                  name="motherAadhar"
                  className="form-control form-control-lg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Father Aadhaar Card *
                </label>

                <input
                  type="file"
                  name="fatherAadhar"
                  className="form-control form-control-lg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Birth Slip / Hospital Report *
                </label>

                <input
                  type="file"
                  name="birthSlip"
                  className="form-control form-control-lg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Address Proof *
                </label>

                <input
                  type="file"
                  name="addressProof"
                  className="form-control form-control-lg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="form-label fw-bold">
                  Marriage Certificate (Optional)
                </label>

                <input
                  type="file"
                  name="marriageCertificate"
                  className="form-control form-control-lg"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>
            </div>

            <div className="alert alert-info rounded-4 mb-4">
              <strong>Note:</strong> Supported file formats are PDF, JPG, JPEG,
              and PNG. After upload, the documents will be sent to the hospital
              for verification.
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary btn-lg px-5"
                style={{
                  borderRadius: "14px"
                }}
                onClick={() => (window.location.href = "/birth")}
              >
                Back
              </button>

              <button
                className="btn btn-primary btn-lg px-5 fw-bold"
                style={{
                  background:
                    "linear-gradient(to right, #2563eb, #1d4ed8)",
                  border: "none",
                  borderRadius: "14px"
                }}
                onClick={uploadDocuments}
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;