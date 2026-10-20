import React, { useEffect, useId, useRef } from "react";

const BulkQuotationDeleteDialog = ({ count, allSelected, busy, onCancel, onConfirm }) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/40"
    >
      <h2 id={titleId} className="text-lg font-semibold mb-3">Delete selected quotations</h2>
      <p id={descriptionId} className="text-sm text-gray-600">
        {allSelected
          ? `Are you sure you want to delete all ${count} selected quotations matching the current filters?`
          : `Are you sure you want to delete ${count} selected quotation${count === 1 ? "" : "s"}?`}
        {" This action cannot be undone."}
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" autoFocus disabled={busy} onClick={onCancel} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          Cancel
        </button>
        <button type="button" disabled={busy} onClick={onConfirm} className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow disabled:opacity-50">
          {busy ? "Deleting..." : `Delete ${count} Quotation${count === 1 ? "" : "s"}`}
        </button>
      </div>
    </dialog>
  );
};

export default BulkQuotationDeleteDialog;
