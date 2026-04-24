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
            font-family: 'Times New Roman', serif;
          }

          .certificate-wrapper {
            display: flex;
            justify-content: center;
            padding: 20px;
            overflow-x: auto;
          }

          .certificate-container {
            width: 210mm;
            height: 297mm;
            background: #fff;
            border: 6px solid #1e3a8a;
            padding: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.18);
            box-sizing: border-box;
          }

          /* 📱 MOBILE SCALE FIX (SAFE) */
          @media (max-width: 768px) {
            .certificate-container {
              transform: scale(0.6);
              transform-origin: top center;
            }
          }

          .certificate-inner {
            height: 100%;
            border: 2px solid #94a3b8;
            padding: 24px 30px;
            position: relative;
          }

          .certificate-inner::before {
            content: "";
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border: 1px solid #cbd5e1;
          }

          .gov-title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .dept-title {
            text-align: center;
            font-size: 14px;
            margin-top: 4px;
          }

          .certificate-title {
            text-align: center;
            color: #1e3a8a;
            font-size: 36px;
            font-weight: bold;
            margin: 20px 0;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 10px;
          }

          .meta-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;
          }

          .certificate-text {
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
          }

          .certificate-table {
            width: 100%;
            border-collapse: collapse;
          }

          .certificate-table td {
            border: 2px solid #000;
            padding: 10px;
          }

          .certificate-table td:first-child {
            background: #f1f5f9;
            font-weight: bold;
          }

          .bottom-section {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
          }

          .signature-name {
            font-size: 26px;
            font-family: cursive;
          }

          .signature-line {
            border-top: 2px solid black;
            margin-top: 6px;
            padding-top: 6px;
          }

          .footer-note {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
            border-top: 1px dashed #999;
            padding-top: 8px;
          }

          .print-btn, .new-btn {
            display: block;
            margin: 10px auto;
            padding: 12px 28px;
            border: none;
            border-radius: 10px;
            color: white;
            font-weight: bold;
          }

          .print-btn { background: #2563eb; }
          .new-btn { background: #16a34a; }

          /* 🖨️ PRINT FIX */
          @media print {
            .print-btn, .new-btn { display: none; }

            .certificate-container {
              transform: scale(1);
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `}
      </style>

      <div className="certificate-wrapper">
        <div ref={certificateRef} className="certificate-container">
          <div className="certificate-inner">

            <div className="gov-title">GOVERNMENT OF MAHARASHTRA</div>
            <div className="dept-title">Birth Registration Department</div>
            <div className="certificate-title">BIRTH CERTIFICATE</div>

            <div className="meta-row">
              <span>Reg No: {certificate.registrationNumber}</span>
              <span>App ID: {certificate.applicationId}</span>
            </div>

            <div className="certificate-text">
              This is to certify that the following birth has been registered.
            </div>

            <table className="certificate-table">
              <tbody>
                <tr><td>Child Name</td><td>{certificate.childName}</td></tr>
                <tr><td>Father Name</td><td>{certificate.fatherName}</td></tr>
                <tr><td>Mother Name</td><td>{certificate.motherName}</td></tr>
                <tr><td>Date of Birth</td><td>{certificate.birthDate}</td></tr>
                <tr><td>Place of Birth</td><td>{certificate.hospitalName}</td></tr>
              </tbody>
            </table>

            <div className="bottom-section">
              <QRCode value={certificate.registrationNumber} size={90}/>
              <div>
                <div className="signature-name">{certificate.issuedBy}</div>
                <div className="signature-line">Authorized Officer</div>
              </div>
            </div>

            <div className="footer-note">
              Digitally generated certificate.
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