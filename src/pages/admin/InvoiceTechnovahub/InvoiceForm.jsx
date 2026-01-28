import React, { useEffect, useState } from "react";
import { addInvoice, updateInvoice } from "../../../api/invoiceApi";

const InvoiceForm = ({ onClose, onRefresh, editData }) => {
  const [invoiceTo, setInvoiceTo] = useState(editData?.invoiceTo || "");
  const [address, setAddress] = useState(editData?.address || "");
  const [items, setItems] = useState(
    editData?.items || [
      { desc: "", hsn: "", gst: 18, qty: 1, rate: 0, unit: "Nos", discount: 0 },
    ]
  );

  const today = new Date().toISOString().slice(0, 10);
  const defaultDue = new Date();
  defaultDue.setDate(defaultDue.getDate() + 30);
  const dueDateStr = defaultDue.toISOString().slice(0, 10);

  const [date, setDate] = useState(editData?.date?.slice(0, 10) || today);
  const [dueOn, setDueOn] = useState(editData?.dueDate?.slice(0, 10) || dueDateStr);

  useEffect(() => {
    if (editData) {
      const newDue = new Date(date);
      newDue.setDate(newDue.getDate() + 30);
      setDueOn(newDue.toISOString().slice(0, 10));
    }
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      invoiceTo,
      address,
      date,
      dueDate: dueOn,
      items: items.map((item) => ({
        ...item,
        qty: Number(item.qty),
        rate: Number(item.rate),
        gst: Number(item.gst),
        discount: Number(item.discount),
      })),
    };
    try {
      if (editData) {
        await updateInvoice(editData._id, dataToSend);
        alert("✅ Invoice updated successfully!");
      } else {
        await addInvoice(dataToSend);
        console.log("Sending invoice data:", dataToSend);
        alert("✅ Invoice created successfully!");
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Error saving invoice!");
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { desc: "", hsn: "", gst: 18, qty: 1, rate: 0, unit: "Nos", discount: 0 },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateRowAmount = (item) => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const gst = Number(item.gst) || 0;
    const base = qty * rate;
    const afterDiscount = base - (base * discount) / 100;
    return afterDiscount + (afterDiscount * gst) / 100;
  };

  const totalAmount = items.reduce((acc, item) => acc + calculateRowAmount(item), 0);

  return (
    <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
        {editData ? "Edit Invoice" : "Create New Invoice"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-medium text-gray-700">Invoice To</label>
          <input
            type="text"
            value={invoiceTo}
            onChange={(e) => setInvoiceTo(e.target.value)}
            required
            placeholder="Enter client or company name"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter client address"
            rows={3}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Invoice Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              readOnly={!editData}
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 ${
                editData ? "focus:ring-blue-400 bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueOn}
              onChange={(e) => setDueOn(e.target.value)}
              readOnly={!editData}
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 ${
                editData ? "focus:ring-blue-400 bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base border border-gray-200 rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">HSN</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Rate</th>
                <th className="py-2 px-3">GST %</th>
                <th className="py-2 px-3">Discount %</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.desc}
                      onChange={(e) => handleItemChange(index, "desc", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="HSN"
                      value={item.hsn}
                      onChange={(e) => handleItemChange(index, "hsn", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="GST %"
                      value={item.gst}
                      onChange={(e) => handleItemChange(index, "gst", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Discount %"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="text-right font-semibold px-2 py-1">
                    ₹{calculateRowAmount(item).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 font-bold hover:text-red-700"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
          >
            + Add Item
          </button>
          <div className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {editData ? "Update Invoice" : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
