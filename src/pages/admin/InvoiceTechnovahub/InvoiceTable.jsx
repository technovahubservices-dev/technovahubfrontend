import React, { useState, useMemo, useRef } from "react";
import { deleteInvoice, deleteSelectedQuotations } from "../../../api/invoiceApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import QuotationIdSelect from "./QuotationIdSelect";
import BulkQuotationDeleteDialog from "./BulkQuotationDeleteDialog";
import { FaDownload } from "react-icons/fa";

const InvoiceTable = ({ invoices, onEdit, onRefresh, docType = "invoice" }) => {
  const isQuotation = docType === "quotation";
  const docLabel = isQuotation ? "Quotation" : "Invoice";
  const listPath = isQuotation ? "/admin/quotation" : "/admin/invoice";
  const [invoiceIdFilter, setInvoiceIdFilter] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deletedIds, setDeletedIds] = useState(new Set());
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const deleteInProgress = useRef(false);
  const rowsPerPage = 5;

  const updateFilter = (setter, value) => {
    setter(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${docLabel.toLowerCase()}?`)) return;
    try {
      await deleteInvoice(id);
      setSelectedIds((previous) => new Set([...previous].filter((selectedId) => selectedId !== id)));
      onRefresh();
    } catch (err) {
      console.error(err);
      alert(`Failed to delete ${docLabel.toLowerCase()}`);
    }
  };

  const remainingInvoices = invoices.filter((inv) => !deletedIds.has(inv._id));
  const uniqueInvoiceIds = [...new Set(remainingInvoices.map((inv) => inv.invoiceId))];

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

  const invoiceRows = remainingInvoices
    .map((inv) => {
      const items = Array.isArray(inv.items) ? inv.items : [];
      const firstDesc = items[0]?.desc || "-";
      const moreCount = Math.max(items.length - 1, 0);
      const desc = moreCount > 0 ? `${firstDesc} +${moreCount} more` : firstDesc;

      let totalAmount = 0;
      let totalBase = 0;
      let totalQty = 0;

      items.forEach((item) => {
        const qty = Number(item.qty) || 0;
        const rate = Number(item.rate) || 0;
        const discount = Number(item.discount) || 0;
        const gst = Number(item.gst) || 0;
        const baseAmount = qty * rate;
        const afterDiscount = baseAmount - (baseAmount * discount) / 100;
        totalAmount += afterDiscount + (afterDiscount * gst) / 100;
        totalBase += baseAmount;
        totalQty += qty;
      });

      return {
        _invoiceId: inv._id,
        invoiceId: inv.invoiceId,
        invoiceTo: inv.invoiceTo,
        date: inv.date,
        dueDate: inv.dueDate,
        desc,
        rate: totalQty > 0 ? totalBase / totalQty : 0,
        totalAmount,
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredRows = invoiceRows.filter((row) => {
    const matchesInvoiceId = invoiceIdFilter ? row.invoiceId === invoiceIdFilter : true;
    const matchesRate =
      (!minRate || row.rate >= parseFloat(minRate)) &&
      (!maxRate || row.rate <= parseFloat(maxRate));
    const searchValue = isQuotation ? row.invoiceTo : row.desc;
    const matchesSearch = String(searchValue ?? "").toLowerCase().includes(normalizedSearch);
    return matchesInvoiceId && matchesRate && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const selectableIds = [...new Set(filteredRows
    .filter((row) => isQuotation && /^QT-/i.test(row.invoiceId || ""))
    .map((row) => row._invoiceId)
    .filter(Boolean))];
  // Intersect with the current results so hidden or removed records cannot be deleted.
  const selectedQuotationIds = selectableIds.filter((id) => selectedIds.has(id));
  const allSelected = selectableIds.length > 0 && selectedQuotationIds.length === selectableIds.length;
  const toggleSelection = (id) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDownload = (id) => {
    if (!id || downloadingId) return;
    setDownloadingId(id);
    const previewUrl = new URL("/admin/quotation", window.location.origin);
    previewUrl.searchParams.set("downloadId", id);
    window.open(previewUrl.href, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setDownloadingId(null), 1500);
  };

  const confirmBulkDelete = async () => {
    if (!deleteConfirmation || deleteInProgress.current) return;
    const ids = deleteConfirmation.ids.filter((id) => selectedQuotationIds.includes(id));
    if (ids.length === 0) {
      setDeleteConfirmation(null);
      return;
    }
    deleteInProgress.current = true;
    setIsDeleting(true);
    try {
      const result = await deleteSelectedQuotations(ids);
      setDeletedIds((previous) => new Set([...previous, ...result.deletedIds]));
      setSelectedIds(new Set(result.failedIds));
      if (result.deletedCount > 0) {
        toast.success(`${result.deletedCount} quotation${result.deletedCount === 1 ? "" : "s"} deleted successfully.`);
      }
      if (result.failedIds.length > 0) {
        toast.error(`${result.failedIds.length} quotation${result.failedIds.length === 1 ? "" : "s"} could not be deleted. They remain selected for retry.`);
      }
      await onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not complete deletion. Please refresh the list and try again.");
    } finally {
      setDeleteConfirmation(null);
      setIsDeleting(false);
      deleteInProgress.current = false;
    }
  };
  const visiblePage = Math.min(currentPage, Math.max(1, totalPages));
  const currentRows = filteredRows.slice(
    (visiblePage - 1) * rowsPerPage,
    visiblePage * rowsPerPage
  );

  const clearFilters = () => {
    setSelectedIds(new Set());
    setInvoiceIdFilter("");
    setMinRate("");
    setMaxRate("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className={`mt-6 md:p-4 p-2 bg-white shadow-xl rounded-xl border border-gray-200 ${isQuotation ? "min-w-0 max-w-full" : ""}`}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col w-full sm:w-64">
          <label className="text-gray-700 font-medium mb-1">Search by Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => updateFilter(setSearchTerm, e.target.value)}
            placeholder={isQuotation ? "Enter customer name..." : "Enter item name..."}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full"
          />
        </div>
        <div className="flex flex-col w-full sm:w-48">
          <label className="text-gray-700 font-medium mb-1">{`Filter by ${docLabel} ID`}</label>
          {isQuotation ? (
            <QuotationIdSelect
              ids={uniqueInvoiceIds}
              value={invoiceIdFilter}
              onChange={(id) => updateFilter(setInvoiceIdFilter, id)}
            />
          ) : (
          <select
            value={invoiceIdFilter}
            onChange={(e) => updateFilter(setInvoiceIdFilter, e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full"
          >
            <option value="">{`All ${docLabel}s`}</option>
            {uniqueInvoiceIds.map((id, idx) => (
              <option key={idx} value={id}>
                {id}
              </option>
            ))}
          </select>
          )}
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-gray-700 font-medium mb-1">Rate Range</label>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="number"
              value={minRate}
              onChange={(e) => updateFilter(setMinRate, e.target.value)}
              placeholder="Min"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-20"
            />
            <span className="text-gray-600 font-medium">-</span>
            <input
              type="number"
              value={maxRate}
              onChange={(e) => updateFilter(setMaxRate, e.target.value)}
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

          <Link to={listPath}>
            <button className="text-blue-600 text-[10px] md:text-xl cursor-pointer">{`Go to ${docLabel} page`}</button>
          </Link>
        </div>
      </div>

      {isQuotation && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600">Select All includes all quotations matching the current filters across all pages.</span>
          {selectedQuotationIds.length > 0 && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setDeleteConfirmation({ ids: [...selectedQuotationIds], allSelected })}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs sm:text-sm disabled:opacity-50"
            >
              Delete Selected ({selectedQuotationIds.length})
            </button>
          )}
        </div>
      )}
      {isQuotation && deleteConfirmation && (
        <BulkQuotationDeleteDialog
          count={deleteConfirmation.ids.length}
          allSelected={deleteConfirmation.allSelected}
          busy={isDeleting}
          onCancel={() => { if (!deleteInProgress.current) setDeleteConfirmation(null); }}
          onConfirm={confirmBulkDelete}
        />
      )}

      {/* Table */}
      <div className={isQuotation ? "min-w-0 max-w-full overflow-x-auto" : "overflow-x-auto"}>
        <table className={`w-full text-sm sm:text-base ${isQuotation ? "table-fixed min-w-[760px] xl:min-w-0 [&_th]:align-middle [&_td]:align-middle [&_th:not(:first-child)]:px-2" : "min-w-[900px]"}`}>
          {isQuotation && (
            <colgroup>
              <col style={{ width: "3%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>
          )}
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              {isQuotation && (
                <th className="py-2 px-1 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all quotations matching current filters across all pages"
                    checked={allSelected}
                    ref={(element) => { if (element) element.indeterminate = selectedQuotationIds.length > 0 && !allSelected; }}
                    disabled={selectableIds.length === 0 || isDeleting}
                    onChange={() => setSelectedIds(allSelected ? new Set() : new Set(selectableIds))}
                  />
                </th>
              )}
              <th className="py-2 px-3 text-left">{`${docLabel} ID`}</th>
              <th className="py-2 px-3 text-left">{`${docLabel} To`}</th>
              <th className="py-2 px-3 text-left">Description</th>
              <th className="py-2 px-3 text-left">{`${docLabel} Date`}</th>
              <th className="py-2 px-3 text-left">Due On</th>
              <th className={`py-2 px-3 ${isQuotation ? "text-right" : "text-left"}`}>Amount</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={isQuotation ? 8 : 7} className="text-center py-6 text-gray-500">
                  {`No ${docLabel.toLowerCase()}s found.`}
                </td>
              </tr>
            ) : (
              currentRows.map((row, idx) => {
                const totalAmount = Number(row.totalAmount) || 0;

                return (
                  <tr
                    key={row._invoiceId + "-" + idx}
                    className={`transition hover:bg-blue-50 ${isQuotation ? "[&>td]:py-2.5 [&>td]:leading-[1.4] [&>td:not(:first-child)]:px-2" : ""} ${idx % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    {isQuotation && (
                      <td className="py-2 px-1 text-center">
                        <input
                          type="checkbox"
                          aria-label={`Select quotation ${row.invoiceId}`}
                          checked={selectedQuotationIds.includes(row._invoiceId)}
                          disabled={isDeleting || !selectableIds.includes(row._invoiceId)}
                          onChange={() => toggleSelection(row._invoiceId)}
                        />
                      </td>
                    )}
                    <td
                      className={`py-2 px-3 font-semibold ${isQuotation ? "break-words" : "text-white rounded-md"}`}
                      style={isQuotation ? undefined : { backgroundColor: invoiceColors[row.invoiceId] }}
                    >
                      {isQuotation ? (
                        <span
                          className="inline-block max-w-full rounded-md px-2 py-1 align-middle text-white"
                          style={{ backgroundColor: invoiceColors[row.invoiceId] }}
                        >
                          {row.invoiceId}
                        </span>
                      ) : row.invoiceId}
                    </td>
                    <td className={`py-2 px-3 ${isQuotation ? "break-words" : ""}`}>{row.invoiceTo}</td>
                    <td className={`py-2 px-3 ${isQuotation ? "break-words" : ""}`}>{row.desc}</td>
                    <td className={`py-2 px-3 ${isQuotation ? "whitespace-nowrap" : ""}`}>{row.date ? new Date(row.date).toLocaleDateString("en-GB") : "-"}</td>
                    <td className={`py-2 px-3 ${isQuotation ? "whitespace-nowrap" : ""}`}>{row.dueDate ? new Date(row.dueDate).toLocaleDateString("en-GB") : "-"}</td>
                    <td className={`py-2 px-3 font-semibold text-right ${isQuotation ? "whitespace-nowrap" : ""}`}>{"\u20B9"}{totalAmount.toFixed(2)}</td>
                    <td className={isQuotation ? "py-2 px-3" : "py-2 px-3 flex gap-2"}>
                      <div className={isQuotation ? "flex items-center gap-1 whitespace-nowrap" : "contents"}>
                      <button
                        onClick={() => {
                          const invoiceObj = invoices.find((inv) => inv._id === row._invoiceId);
                          onEdit(invoiceObj);
                        }}
                        className={`rounded bg-yellow-400 px-1.5 py-1 text-xs text-white shadow hover:bg-yellow-500 ${isQuotation ? "" : "sm:text-sm"}`}
                      >
                        Edit
                      </button>
                      {isQuotation && <button
                        type="button"
                        title="Download Quotation"
                        aria-label={`Download quotation ${row.invoiceId}`}
                        disabled={downloadingId === row._invoiceId}
                        onClick={() => handleDownload(row._invoiceId)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-60"
                      >
                        {downloadingId === row._invoiceId ? "…" : <FaDownload aria-hidden="true" />}
                      </button>}
                      <button
                        onClick={() => handleDelete(row._invoiceId)}
                        className={`rounded bg-red-500 px-1.5 py-1 text-xs text-white shadow hover:bg-red-600 ${isQuotation ? "" : "sm:text-sm"}`}
                      >
                        Delete
                      </button>
                      </div>
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
          onClick={() => setCurrentPage(Math.max(visiblePage - 1, 1))}
          disabled={visiblePage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              visiblePage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(visiblePage + 1, Math.max(1, totalPages)))}
          disabled={visiblePage >= totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
