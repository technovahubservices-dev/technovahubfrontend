import React, { useState, useMemo } from "react";
import { deleteInvoice } from "../../../api/invoiceApi";
import { Link } from "react-router-dom";

const InvoiceTable = ({ invoices, onEdit, onRefresh }) => {
  const [invoiceIdFilter, setInvoiceIdFilter] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await deleteInvoice(id);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete invoice");
    }
  };

  const uniqueInvoiceIds = [...new Set(invoices.map((inv) => inv.invoiceId))];

  const invoiceColors = useMemo(() => {
    const generateColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 70%)`;
    };
    const colorMap = {};
    uniqueInvoiceIds.forEach((id) => {
      colorMap[id] = generateColor();
    });
    return colorMap;
  }, [uniqueInvoiceIds]);

  const invoiceRows = invoices
    .flatMap((inv) =>
      inv.items.map((item) => ({
        invoiceId: inv.invoiceId,
        invoiceTo: inv.invoiceTo,
        address: inv.address,
        date: inv.date,
        dueDate: inv.dueDate,
        ...item,
        _invoiceId: inv._id,
      }))
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredRows = invoiceRows.filter((row) => {
    const matchesInvoiceId = invoiceIdFilter ? row.invoiceId === invoiceIdFilter : true;
    const matchesRate =
      (!minRate || row.rate >= parseFloat(minRate)) &&
      (!maxRate || row.rate <= parseFloat(maxRate));
    const matchesSearch = searchTerm
      ? row.desc.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesInvoiceId && matchesRate && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const clearFilters = () => {
    setInvoiceIdFilter("");
    setMinRate("");
    setMaxRate("");
    setSearchTerm("");
  };

  return (
    <div className="mt-6 md:p-4 p-2 bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col w-full sm:w-64">
          <label className="text-gray-700 font-medium mb-1">Search Description</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter description..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full"
          />
        </div>
        <div className="flex flex-col w-full sm:w-48">
          <label className="text-gray-700 font-medium mb-1">Filter by Invoice ID</label>
          <select
            value={invoiceIdFilter}
            onChange={(e) => setInvoiceIdFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full"
          >
            <option value="">All Invoices</option>
            {uniqueInvoiceIds.map((id, idx) => (
              <option key={idx} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-gray-700 font-medium mb-1">Rate Range</label>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="number"
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
              placeholder="Min"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-20"
            />
            <span className="text-gray-600 font-medium">–</span>
            <input
              type="number"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              placeholder="Max"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-20"
            />
          </div>
        </div>
        <div className="flex justify-between items-end w-full ">
          <button
            onClick={clearFilters}
            className="md:px-4 md:py-2 cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg shadow px-3 py-2"
          >
            Clear Filters
          </button>

          <Link to="/admin/invoice">
            <button className="text-blue-600 text-[10px] md:text-xl cursor-pointer">Go to Invoice page </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]  text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="py-2 px-3 text-left">Invoice ID</th>
              <th className="py-2 px-3 text-left">Invoice To</th>
              <th className="py-2 px-3 text-left">Address</th>
              <th className="py-2 px-3 text-left">Description</th>
              <th className="py-2 px-3 text-left">HSN</th>
              <th className="py-2 px-3 text-left">GST %</th>
              <th className="py-2 px-3 text-left">Invoice Date</th>
              <th className="py-2 px-3 text-left">Due On</th>
              <th className="py-2 px-3 text-left">Qty</th>
              <th className="py-2 px-3 text-left">Rate</th>
              <th className="py-2 px-3 text-left">Discount %</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-6 text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              currentRows.map((row, idx) => {
                const qty = Number(row.qty) || 0;
                const rate = Number(row.rate) || 0;
                const discount = Number(row.discount) || 0;
                const gst = Number(row.gst) || 0;
                const baseAmount = qty * rate;
                const afterDiscount = baseAmount - (baseAmount * discount) / 100;
                const totalAmount = afterDiscount + (afterDiscount * gst) / 100;

                return (
                  <tr
                    key={row._invoiceId + "-" + idx}
                    className={`transition hover:bg-blue-50  ${idx % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td
                      className="py-2 px-3 font-semibold text-white rounded-md"
                      style={{ backgroundColor: invoiceColors[row.invoiceId] }}
                    >
                      {row.invoiceId}
                    </td>
                    <td className="py-2 px-3">{row.invoiceTo}</td>
                    <td className="py-2 px-3">{row.address}</td>
                    <td className="py-2 px-3">{row.desc}</td>
                    <td className="py-2 px-3">{row.hsn}</td>
                    <td className="py-2 px-3">{gst}%</td>
                    <td className="py-2 px-3">{row.date ? new Date(row.date).toLocaleDateString("en-GB") : "-"}</td>
                    <td className="py-2 px-3">{row.dueDate ? new Date(row.dueDate).toLocaleDateString("en-GB") : "-"}</td>
                    <td className="py-2 px-3">{qty}</td>
                    <td className="py-2 px-3">{rate.toFixed(2)}</td>
                    <td className="py-2 px-3">{discount}%</td>
                    <td className="py-2 px-3 font-semibold text-right">₹{totalAmount.toFixed(2)}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <button
                        onClick={() => {
                          const invoiceObj = invoices.find((inv) => inv._id === row._invoiceId);
                          onEdit(invoiceObj);
                        }}
                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row._invoiceId)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
