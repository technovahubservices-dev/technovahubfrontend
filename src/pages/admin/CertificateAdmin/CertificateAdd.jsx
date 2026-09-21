import React, { useState, useEffect } from "react";

import { addCertificateApi, updateCertificateApi } from "../../../api/certificateApi";
import toast  from "react-hot-toast";

const CertificateAdd = ({ editingCertificate, onDone }) => {
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCertificate) {
      setEmpID(editingCertificate.empID);
      setEmpName(editingCertificate.empName);
    } else {
      setEmpID("");
      setEmpName("");
    }
  }, [editingCertificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empID || !empName) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      if (editingCertificate) {
        await updateCertificateApi(editingCertificate._id, { empID, empName });
        toast.success("Certificate updated successfully!");
      } else {
        await addCertificateApi({ empID, empName });
        toast.success("Certificate added successfully!");
      }
      setEmpID("");
      setEmpName("");
      if (onDone) onDone(); // reset form + refresh list
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 max-w-4xl mx-auto mb-4">
      <h2 className="text-md md:text-xl mb-6 text-blue-400">
        {editingCertificate ? "Update Certificate" : "Add Certificate"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {/* <label className="block text-gray-700 font-medium mb-1">Employee ID</label> */}
          <input
            type="text"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            placeholder="Enter Employee ID"
             className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div>
          {/* <label className="block text-gray-700 font-medium mb-1">Employee Name</label> */}
          <input
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            placeholder="Enter Employee Name"
             className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? editingCertificate
                ? "Updating..."
                : "Adding..."
              : editingCertificate
                ? "Update Certificate"
                : "Add Certificate"}
          </button>
          {editingCertificate && (
            <button
              type="button"
              onClick={() => onDone()}
              className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CertificateAdd;
