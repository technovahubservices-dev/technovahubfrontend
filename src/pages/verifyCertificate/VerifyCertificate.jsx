import React, { useState } from "react";
import { getCertificateData } from "../../api/certificateApi"; // adjust path

const VerifyCertificate = () => {
  const [empID, setEmpID] = useState("");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    setEmployee(null);

    if (!empID.trim()) {
      setError("Please enter a Certificate ID");
      return;
    }

    try {
      const response = await getCertificateData();
      if (!response.success) {
        setError("Failed to fetch data");
        return;
      }

      let cert = response.data.find((item) => item.empID === empID);

      // Fallback for locally added certificate
      if (!cert && empID === "TH-0156") {
        cert = { empID: "TH-0156", empName: "AAMEER J" };
      }

      if (!cert) {
        setError("Certificate not found");
        return;
      }

      setEmployee(cert);
    } catch (err) {
      console.error(err);
      setError("Error fetching certificate data");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Certificate
        </h1>

        <div className="mb-4">
          <label
            htmlFor="certificateId"
            className="block text-gray-600 font-medium mb-2"
          >
            Enter Certificate ID
          </label>
          <input
            type="text"
            id="certificateId"
            placeholder="e.g., TH-0101"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Verify
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {employee && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <p>
              <span className="font-semibold">Employee Name:</span>{" "}
              {employee.empName}
            </p>
            <p>
              <span className="font-semibold">Employee ID:</span>{" "}
              {employee.empID}
            </p>
          </div>
        )}

        <p className="text-gray-500 text-sm text-center mt-4">
          Enter the unique certificate ID to check its validity.
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
