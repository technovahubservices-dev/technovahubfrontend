import React, { useEffect, useState } from "react";
import { getQuotation, deleteQuotation } from "../../../api/quotationApi";
import { Link } from "react-router-dom";

const QuotationTable = ({ onEdit }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [voucherFilter, setVoucherFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const data = await getQuotation();
      setQuotations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteQuotation(id);
      fetchQuotations();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleEdit = (quotation) => {
    if (onEdit) onEdit(quotation);
  };

  // Filtering logic
  const filteredQuotations = quotations.filter((q) => {
    const matchesVoucher = voucherFilter
      ? q.voucherNo === voucherFilter
      : true;

    const matchesPrice =
      (!minPrice || q.subTotal >= parseFloat(minPrice)) &&
      (!maxPrice || q.subTotal <= parseFloat(maxPrice));

    const matchesSearch = searchTerm
      ? q.items.some((item) =>
          item.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return matchesVoucher && matchesPrice && matchesSearch;
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredQuotations.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredQuotations.length / rowsPerPage);

  const handleClearFilters = () => {
    setVoucherFilter("");
    setMinPrice("");
    setMaxPrice("");
    setSearchTerm("");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-gray-200 overflow-x-auto">
      {/* Filters */}
    <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap gap-6 mb-6 p-4 bg-white shadow-md rounded-lg">

  {/* Voucher Filter Dropdown */}
  <div className="flex flex-col w-full sm:w-64">
    <label className="text-gray-700 font-semibold mb-1">Voucher No</label>
    <select
      value={voucherFilter}
      onChange={(e) => setVoucherFilter(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full shadow-sm hover:border-blue-400 transition"
    >
      <option value="">All Vouchers</option>
      {[...new Set(quotations.map((q) => q.voucherNo).filter(Boolean))].map(
        (voucher, idx) => (
          <option key={idx} value={voucher}>
            {voucher}
          </option>
        )
      )}
    </select>
  </div>

  {/* Description Search */}
  <div className="flex flex-col w-full sm:w-64">
    <label className="text-gray-700 font-semibold mb-1">Search Description</label>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Enter item description..."
      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full shadow-sm hover:border-blue-400 transition"
    />
  </div>

  {/* Price Range Filter */}
  <div className="flex flex-col w-full sm:w-48">
    <label className="text-gray-700 font-semibold mb-1">Price Range</label>
    <div className="flex gap-2 items-center">
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min"
        className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm hover:border-blue-400 transition"
      />
      <span className="text-gray-600 font-medium">–</span>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max"
        className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm hover:border-blue-400 transition"
      />
    </div>
  </div>

  {/* Clear Filters Button */}
  <button
    onClick={handleClearFilters}
    className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto font-semibold"
  >
    Clear Filters
  </button>

  {/* View Quotation Button */}
  <Link to="/admin/quotation" className="w-full sm:w-auto">
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto font-semibold">
      View Quotation
    </button>
  </Link>
</div>


      {/* Table */}
      <table className="w-full min-w-[900px] text-sm sm:text-base">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-2 px-3 text-left">Voucher No</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Contact Name</th>
            <th className="py-2 px-3 text-left">Description</th>
            <th className="py-2 px-3 text-left">HSN</th>
            <th className="py-2 px-3 text-left">Qty</th>
            <th className="py-2 px-3 text-left">Rate</th>
            <th className="py-2 px-3 text-left">Discount %</th>
            <th className="py-2 px-3 text-left">GST %</th>
            <th className="py-2 px-3 text-left">Amount</th>
            <th className="py-2 px-3 text-left">Total Amount</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentRows.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center py-6 text-gray-500">
                No quotations found.
              </td>
            </tr>
          ) : (
            currentRows.map((q) =>
              q.items.map((item, idx) => (
                <tr
                  key={`${q._id}-${idx}`}
                  className={`transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  {idx === 0 && (
                    <>
                      <td rowSpan={q.items.length} className="py-2 px-3 font-semibold">
                        {q.voucherNo}
                      </td>
                      <td rowSpan={q.items.length} className="py-2 px-3">
                        {new Date(q.date).toLocaleDateString()}
                      </td>
                      <td rowSpan={q.items.length} className="py-2 px-3">
                        {q.contactName}
                      </td>
                    </>
                  )}
                  <td className="py-2 px-3">{item.desc}</td>
                  <td className="py-2 px-3">{item.hsn}</td>
                  <td className="py-2 px-3">{item.qty}</td>
                  <td className="py-2 px-3">₹{item.rate.toFixed(2)}</td>
                  <td className="py-2 px-3">{item.discount}</td>
                  <td className="py-2 px-3">{item.gst}</td>
                  <td className="py-2 px-3">₹{item.amount.toFixed(2)}</td>
                  <td className="py-2 px-3 font-semibold">₹{item.totalAmount.toFixed(2)}</td>
                  {idx === 0 && (
                    <td rowSpan={q.items.length} className="py-2 px-3 flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(q)}
                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuotationTable;
