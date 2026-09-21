import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addQuotation, updateQuotation } from "../../../api/quotationApi";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const QuotationForm = ({ editData, onClose, onUpdateComplete }) => {
  const [quotationData, setQuotationData] = useState({
    date: new Date().toISOString().slice(0, 10),
    contactName: "",
    mobile: "",
    address: "",
    paymentMode: "0 Days",
    dispatchedThrough: "By Hand",
    destination: "Free Door Delivery",
    immediateDated: "Immediate",
    items: [
      {
        desc: "",
        hsn: "",
        gst: 0,
        qty: 0,
        rate: 0,
        discount: 0,
        unit: "",
      },
    ],
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (editData) {
      setQuotationData({
        ...editData,
        date: editData.date
          ? editData.date.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
      setIsEdit(true);
      setEditId(editData._id);
    } else {
      setQuotationData((prev) => ({
        ...prev,
        date: new Date().toISOString().slice(0, 10),
      }));
      setIsEdit(false);
      setEditId(null);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...quotationData.items];
    updatedItems[index][name] =
      name === "desc" || name === "hsn" || name === "unit"
        ? value
        : parseFloat(value) || 0;
    setQuotationData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addNewItem = () => {
    setQuotationData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { desc: "", hsn: "", gst: 0, qty: 0, rate: 0, discount: 0, unit: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = quotationData.items.filter((_, idx) => idx !== index);
    setQuotationData((prev) => ({ ...prev, items: updatedItems }));
  };

  const calculateItemTotal = (item) => {
    const amount = item.qty * item.rate;
    const discountAmount = (amount * item.discount) / 100;
    const gstAmount = ((amount - discountAmount) * item.gst) / 100;
    return amount - discountAmount + gstAmount;
  };

  const subtotal = quotationData.items.reduce(
    (acc, item) => acc + calculateItemTotal(item),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && editId) {
        await updateQuotation(editId, quotationData);
        toast.success("Quotation updated successfully!");
      } else {
        await addQuotation(quotationData);
        toast.success("Quotation added successfully!");
      }
      onUpdateComplete();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save quotation");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl p-4 sm:p-6 relative border border-gray-100 overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center text-blue-700">
            {isEdit ? "Edit Quotation" : "Add New Quotation"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Date", name: "date", type: "date" },
                { label: "Contact Name", name: "contactName", type: "text" },
                { label: "Mobile", name: "mobile", type: "text" },
                { label: "Address", name: "address", type: "text" },
                { label: "Payment Mode", name: "paymentMode", type: "text" },
                {
                  label: "Dispatched Through",
                  name: "dispatchedThrough",
                  type: "text",
                },
                { label: "Destination", name: "destination", type: "text" },
                { label: "Immediate Dated", name: "immediateDated", type: "text" },
              ].map((field, idx) => (
                <div className="flex flex-col" key={idx}>
                  <label className="font-medium text-gray-700 text-sm sm:text-base">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={quotationData[field.name]}
                    onChange={handleChange}
                    className="border p-2 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
                    required={
                      field.name === "date" || field.name === "contactName"
                    }
                  />
                </div>
              ))}
            </div>

            {/* Items Section */}
            <div className="space-y-3">
              {quotationData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-9 gap-3 border p-3 rounded-lg bg-gray-50"
                >
                  {[
                    { label: "Description", name: "desc", colSpan: 2 },
                    { label: "HSN", name: "hsn" },
                    { label: "Qty", name: "qty", type: "number" },
                    { label: "Rate", name: "rate", type: "number" },
                    { label: "Discount %", name: "discount", type: "number" },
                    { label: "GST %", name: "gst", type: "number" },
                  ].map((field, i) => (
                    <div
                      className={`flex flex-col ${
                        field.colSpan ? `sm:col-span-${field.colSpan}` : ""
                      }`}
                      key={i}
                    >
                      <label className="text-gray-600 text-xs sm:text-sm">
                        {field.label}
                      </label>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.label}
                        value={item[field.name]}
                        onChange={(e) => handleItemChange(idx, e)}
                        className="border p-1.5 rounded text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        required={field.name === "desc"}
                      />
                    </div>
                  ))}

                  {/* Item Total */}
                  <div className="flex flex-col">
                    <label className="text-gray-600 text-xs sm:text-sm">
                      Total
                    </label>
                    <input
                      type="text"
                      value={calculateItemTotal(item).toFixed(2)}
                      className="border p-1.5 rounded bg-gray-100 text-sm"
                      readOnly
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="flex flex-col items-center justify-end">
                    <label className="text-gray-600 text-xs invisible">
                      Remove
                    </label>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addNewItem}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Add Item
              </button>
            </div>

            {/* Subtotal */}
            <div className="flex justify-end mt-3 text-base sm:text-lg font-semibold">
              Subtotal: ₹ {subtotal.toFixed(2)}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end mt-5 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all text-sm sm:text-base"
              >
                {isEdit ? "Update Quotation" : "Add Quotation"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuotationForm;
