import React, { useEffect, useState } from "react";
import { getCertificateData, deleteCertificateApi } from "../../../api/certificateApi";
import toast from "react-hot-toast";

const CertificateList = ({ onEdit, refresh }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await getCertificateData();
      let allCerts = Array.isArray(data.data) ? data.data : [];

      // Add hardcoded unremovable certificate
      const hardcodedCert = {
        _id: "static-th-0156",
        empID: "TH-0156",
        empName: "AAMEER J",
        isStatic: true, // Marker to disable delete
      };

      // Avoid duplicate if it somehow exists in DB
      if (!allCerts.find((c) => c.empID === "TH-0156")) {
        allCerts = [...allCerts, hardcodedCert];
      }

      setCertificates(allCerts);
    } catch (err) {
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this certificate?")) return;
    try {
      await deleteCertificateApi(id);
      setCertificates(certificates.filter((c) => c._id !== id));
      toast.success("Certificate deleted");
    } catch (err) {
      toast.error("Failed to delete certificate");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[50vh] ">
      <div className="loader"></div>
    </div>
  )

  // Pagination logic
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = certificates.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-md md:text-2xl font-bold mb-6 text-indigo-600">Certificate List</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Sl. No</th>
              <th className="py-3 px-4 text-left">Employee ID</th>
              <th className="py-3 px-4 text-left">Employee Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item._id || item.id}
                className="hover:bg-indigo-50 transition-colors duration-200 border-b border-gray-100"
              >
                <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4 font-medium text-gray-800">{item.empID}</td>
                <td className="py-2 px-4 text-gray-600">{item.empName}</td>
                <td className="py-2 px-4 flex gap-2 flex-wrap">
                  {item.isStatic ? (
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-semibold border border-gray-300">
                      Protected (Permanent)
                    </span>
                  ) : (
                    <>
                      <button
                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition text-sm"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border transition ${currentPage === i + 1
                ? "bg-indigo-500 text-white border-indigo-500"
                : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateList;
