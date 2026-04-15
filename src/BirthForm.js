// File: src/BirthForm.js

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BirthForm() {
  const [form, setForm] = useState({
    childName: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    hospitalName: "",
    fatherName: "",
    motherName: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async () => {
    if (
      !form.childName ||
      !form.gender ||
      !form.birthDate ||
      !form.birthTime ||
      !form.hospitalName ||
      !form.fatherName ||
      !form.motherName ||
      !form.address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:8081/api/birth/save",
        {
          ...form,
          userId: userId
        }
      );

      localStorage.setItem(
        "birthRegistration",
        JSON.stringify(response.data)
      );

      alert("Birth Registration Submitted Successfully");

      window.location.href = "/documents";
    } catch (error) {
      console.log(error);
      alert("Unable To Submit Birth Registration");
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
            maxWidth: "1100px",
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
              Birth Registration Form
            </h1>

            <p className="mb-0 fs-5">
              Enter child and parent details to continue the registration process
            </p>
          </div>

          <div className="p-5 bg-white">
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Child Name
                </label>

                <input
                  type="text"
                  name="childName"
                  value={form.childName}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter child name"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Gender
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Time Of Birth
                </label>

                <input
                  type="time"
                  name="birthTime"
                  value={form.birthTime}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="form-label fw-bold">
                  Hospital Name
                </label>

                <input
                  type="text"
                  name="hospitalName"
                  value={form.hospitalName}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter hospital name"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Father Name
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter father name"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-bold">
                  Mother Name
                </label>

                <input
                  type="text"
                  name="motherName"
                  value={form.motherName}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter mother name"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="form-label fw-bold">
                  Full Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  rows="4"
                  placeholder="Enter full residential address"
                  style={{
                    borderRadius: "16px",
                    padding: "14px"
                  }}
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary btn-lg px-5"
                style={{
                  borderRadius: "14px"
                }}
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary btn-lg px-5 fw-bold"
                style={{
                  background:
                    "linear-gradient(to right, #2563eb, #1d4ed8)",
                  border: "none",
                  borderRadius: "14px"
                }}
                onClick={submitForm}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Continue To Document Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BirthForm;