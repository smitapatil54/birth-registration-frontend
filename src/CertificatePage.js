import { useEffect, useRef, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function CertificatePage() {
  const [certificate, setCertificate] = useState(null);
  const certificateRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    loadCertificate();
  }, []);

  const loadCertificate = async () => {
    try {
      const birthRegistration = JSON.parse(
        localStorage.getItem("birthRegistration")
      );

      const response = await axios.get(
        `${API_URL}/api/certificate/birth/${birthRegistration.id}`
      );

      setCertificate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const handleNewRegistration = () => {
    localStorage.removeItem("birthRegistration");
    navigate("/register");
  };

  const formatDate = (date) => {
    if (!date) return new Date().toLocaleDateString("en-GB");
    return new Date(date).toLocaleDateString("en-GB");
  };

  if (!certificate) {
    return (
      <div className="container mt-5 text-center">
        <h3>Certificate Not Generated Yet</h3>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
        body {
          background: #eef2ff;
          font-family: "Georgia", "Times New Roman", serif;
        }

        .certificate-wrapper {
          display: flex;
          justify-content: center;
          padding: 20px;
          overflow-x: auto;
        }

        .certificate-container {
          width: 210mm;
          height: 297mm; /* ✅ FIXED HEIGHT */
          background: #fff;
          border: 6px solid #1e3a8a;
          padding: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          box-sizing: border-box;
          overflow: hidden; /* 🔥 important */
        }

        @media (max-width: 768px) {
          .certificate-container {
            transform: scale(0.6);
            transform-origin: top center;
          }
        }

        .certificate-inner {
          height: 100%;
          border: 2px solid #94a3b8;
          padding: 25px 30px;
          display: flex;
          flex-direction: column;
        }

        .gov-title {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .dept-title {
          text-align: center;
          font-size: 15px;
        }

        .certificate-title {
          text-align: center;
          font-size: 40px;
          font-weight: bold;
          margin: 15px 0;
          border-top: 2px solid black;
          border-bottom: 2px solid black;
          padding: 10px;
        }

        .legal-text {
          font-size: 14px;
          text-align: center;
          margin: 10px 0;
          line-height: 1.6;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 10px;
        }

        .certificate-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        .certificate-table td {
          border: 1.5px solid black;
          padding: 10px;
          font-size: 15px;
        }

        .certificate-table tr {
          height: 45px;
        }

        .certificate-table td:first-child {
          font-weight: bold;
          width: 35%;
          background: #f8fafc;
        }

        .bottom-section {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .qr-box {
          text-align: center;
        }

        .qr-label {
          font-size: 11px;
          margin-top: 5px;
          font-weight: bold;
        }

        .signature {
          text-align: center;
        }

        .signature-name {
          font-size: 28px;
          font-family: "Brush Script MT", "Segoe Script", cursive;
          color: #1e3a8a;
        }

        .signature-line {
          border-top: 1px solid black;
          margin-top: 6px;
          padding-top: 6px;
          font-size: 13px;
        }

        .footer-note {
          text-align: center;
          font-size: 13px;
          margin-top: 15px;
          border-top: 1px dashed gray;
          padding-top: 8px;
        }

        .print-btn, .new-btn {
          display: block;
          margin: 10px auto;
          padding: 12px 28px;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
        }

        .print-btn { background: #2563eb; }
        .new-btn { background: #16a34a; }

        /* 🖨️ PRINT FIX */
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          .print-btn, .new-btn {
            display: none;
          }

          .certificate-container {
            height: 297mm;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden;
            box-shadow: none;
          }
        }
        `}
      </style>

      <div className="certificate-wrapper">
        <div ref={certificateRef} className="certificate-container">
          <div className="certificate-inner">

            <div>
              <div className="gov-title">GOVERNMENT OF MAHARASHTRA</div>
              <div className="dept-title">DEPARTMENT OF HEALTH</div>
              <div className="dept-title">Municipal Corporation</div>

              <div className="certificate-title">BIRTH CERTIFICATE</div>

              <div className="legal-text">
                THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN TAKEN FROM THE ORIGINAL RECORD OF BIRTH UNDER THE REGISTRATION OF BIRTHS & DEATHS ACT, 1969.
              </div>

              <div className="meta-row">
                <span>Reg No: {certificate.registrationNumber}</span>
                <span>App ID: {certificate.applicationId}</span>
              </div>

              <table className="certificate-table">
                <tbody>
                  <tr><td>Child Name</td><td>{certificate.childName}</td></tr>
                  <tr><td>Gender</td><td>{certificate.gender}</td></tr>
                  <tr><td>Father Name</td><td>{certificate.fatherName}</td></tr>
                  <tr><td>Mother Name</td><td>{certificate.motherName}</td></tr>
                  <tr><td>Date of Birth</td><td>{formatDate(certificate.birthDate)}</td></tr>
                  <tr><td>Place of Birth</td><td>{certificate.hospitalName}</td></tr>
                  <tr><td>Address</td><td>{certificate.address}</td></tr>
                  <tr><td>Date of Registration</td><td>{formatDate(certificate.registrationDate)}</td></tr>
                  <tr><td>Date of Issue</td><td>{formatDate(certificate.issueDate)}</td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <div className="bottom-section">
                <div className="qr-box">
                  <QRCode value={certificate.registrationNumber} size={90}/>
                  <div className="qr-label">VERIFIED DIGITAL RECORD</div>
                </div>

                <div className="signature">
                  <div className="signature-name">{certificate.issuedBy}</div>
                  <div className="signature-line">Authorized Registrar</div>
                </div>
              </div>

              <div className="footer-note">
                THIS IS A COMPUTER GENERATED CERTIFICATE AND DOES NOT REQUIRE PHYSICAL SIGNATURE.
              </div>
            </div>

          </div>
        </div>
      </div>

      <button className="print-btn" onClick={printCertificate}>
        Print Certificate
      </button>

      <button className="new-btn" onClick={handleNewRegistration}>
        New Registration
      </button>
    </>
  );
}

export default CertificatePage;