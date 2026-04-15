import { useEffect, useRef, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;

function CertificatePage() {
  const [certificate, setCertificate] = useState(null);
  const certificateRef = useRef();

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
            padding: 20px 0 40px;
          }

          .certificate-container {
            width: 210mm;
            min-height: 297mm;
            background: #fff;
            border: 6px solid #1e3a8a;
            padding: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.18);
            box-sizing: border-box;
          }

          .certificate-inner {
            height: 100%;
            border: 2px solid #94a3b8;
            padding: 24px 30px;
            position: relative;
            box-sizing: border-box;
          }

          .certificate-inner::before {
            content: "";
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border: 1px solid #cbd5e1;
            pointer-events: none;
          }

          .gov-title {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #111827;
          }

          .dept-title {
            text-align: center;
            margin-top: 4px;
            font-size: 14px;
            color: #475569;
          }

          .certificate-title {
            text-align: center;
            color: #1e3a8a;
            font-size: 34px;
            font-weight: bold;
            letter-spacing: 3px;
            margin: 18px 0 24px;
            padding: 12px 0;
            border-top: 1px solid #cbd5e1;
            border-bottom: 1px solid #cbd5e1;
          }

          .meta-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;
          }

          .meta-label {
            display: block;
            font-size: 12px;
            font-weight: bold;
            color: #475569;
            margin-bottom: 4px;
          }

          .meta-value {
            font-size: 18px;
            font-weight: bold;
            color: #111827;
          }

          .certificate-text {
            text-align: center;
            font-size: 16px;
            line-height: 1.7;
            color: #374151;
            margin-bottom: 20px;
          }

          .certificate-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          .certificate-table td {
            border: 1.5px solid #475569;
            padding: 10px 12px;
            font-size: 15px;
          }

          .certificate-table td:first-child {
            width: 34%;
            background: #f8fafc;
            font-weight: bold;
          }

          .bottom-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 22px;
          }

          .qr-box {
            width: 140px;
            border: 1.5px solid #475569;
            padding: 10px;
            text-align: center;
          }

          .qr-label {
            margin-top: 8px;
            font-size: 11px;
            font-weight: bold;
            color: #374151;
          }

          .signature {
            text-align: center;
            width: 220px;
          }

          .signature-name {
            font-size: 28px;
            font-family: 'Brush Script MT', cursive;
            color: #1e3a8a;
          }

          .signature-line {
            border-top: 1.5px solid #111827;
            margin-top: 8px;
            padding-top: 8px;
            font-size: 13px;
            font-weight: bold;
          }

          .footer-note {
            margin-top: 18px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px dashed #cbd5e1;
            padding-top: 10px;
          }

          .print-btn {
            display: block;
            margin: 25px auto 40px;
            border: none;
            border-radius: 10px;
            background: #2563eb;
            color: white;
            padding: 12px 28px;
            font-size: 16px;
            font-weight: bold;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          @media print {
            body {
              background: white;
            }

            .print-btn {
              display: none;
            }

            .certificate-wrapper {
              padding: 0;
            }

            .certificate-container {
              width: 210mm;
              height: 297mm;
              margin: 0;
              box-shadow: none;
              border: 6px solid #1e3a8a;
              overflow: hidden;
              page-break-after: avoid;
              page-break-inside: avoid;
            }

            .certificate-inner {
              height: 100%;
            }

            .bottom-section {
              margin-top: 18px;
            }

            .footer-note {
              margin-top: 14px;
            }
          }
        `}
      </style>

      <div className="certificate-wrapper">
        <div ref={certificateRef} className="certificate-container">
          <div className="certificate-inner">
            <div className="gov-title">
              GOVERNMENT OF MAHARASHTRA
            </div>

            <div className="dept-title">
              Municipal Corporation Birth Registration Department
            </div>

            <div className="certificate-title">
              BIRTH CERTIFICATE
            </div>

            <div className="meta-row">
              <div>
                <span className="meta-label">Registration Number</span>
                <div className="meta-value">
                  {certificate.registrationNumber}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="meta-label">Application ID</span>
                <div className="meta-value">
                  {certificate.applicationId}
                </div>
              </div>
            </div>

            <p className="certificate-text">
              This is to certify that the following birth has been duly
              registered in the records of the Municipal Corporation.
            </p>

            <table className="certificate-table">
              <tbody>
                <tr>
                  <td>Child Name</td>
                  <td>{certificate.childName}</td>
                </tr>

                <tr>
                  <td>Father Name</td>
                  <td>{certificate.fatherName}</td>
                </tr>

                <tr>
                  <td>Mother Name</td>
                  <td>{certificate.motherName}</td>
                </tr>

                <tr>
                  <td>Date Of Birth</td>
                  <td>{certificate.birthDate}</td>
                </tr>

                <tr>
                  <td>Place Of Birth</td>
                  <td>{certificate.hospitalName}</td>
                </tr>

                <tr>
                  <td>Registration Number</td>
                  <td>{certificate.registrationNumber}</td>
                </tr>
              </tbody>
            </table>

            <div className="bottom-section">
              <div className="qr-box">
                <QRCode
                  value={`${certificate.registrationNumber} | ${certificate.applicationId}`}
                  size={90}
                />

                <div className="qr-label">
                  VERIFIED DIGITAL RECORD
                </div>
              </div>

              <div className="signature">
                <div className="signature-name">
                  {certificate.issuedBy}
                </div>

                <div className="signature-line">
                  Authorized BMC Officer
                </div>
              </div>
            </div>

            <div className="footer-note">
              This is a digitally generated certificate and does not require a
              physical signature.
            </div>
          </div>
        </div>
      </div>

      <button className="print-btn" onClick={printCertificate}>
        Print Certificate
      </button>
    </>
  );
}

export default CertificatePage;