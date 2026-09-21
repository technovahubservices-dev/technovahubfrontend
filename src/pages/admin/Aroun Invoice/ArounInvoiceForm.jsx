import React, { useEffect, useState } from "react";
import { addAInvoice, updateAInvoice } from "../../../api/arounInvoiceApi";

const ArounInvoiceForm = ({ onClose, onRefresh, editData }) => {
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
        await updateAInvoice(editData._id, dataToSend);
        alert("✅ Invoice updated successfully!");
      } else {
        await addAInvoice(dataToSend);
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
    const total = afterDiscount + (afterDiscount * gst) / 100;
    return total.toFixed(2);
  };

  const totalAmount = items
    .reduce((sum, item) => sum + parseFloat(calculateRowAmount(item)), 0)
    .toFixed(2);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 md:p-6 bg-white rounded-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
        {editData ? "Edit Invoice" : "Create New Invoice"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Invoice To</label>
          <input
            type="text"
            value={invoiceTo}
            onChange={(e) => setInvoiceTo(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Invoice Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={dueOn}
            onChange={(e) => setDueOn(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2"
          />
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2">Items</h3>
      <table className="w-full mb-4 border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>Description</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST%</th>
            <th>Disc%</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-t text-center">
              <td>
                <input
                  value={item.desc}
                  onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                  className="border rounded w-full px-2 py-1"
                />
              </td>
              <td>
                <input
                  value={item.hsn}
                  onChange={(e) => handleItemChange(idx, "hsn", e.target.value)}
                  className="border rounded w-full px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                  className="border rounded w-16 px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                  className="border rounded w-20 px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.gst}
                  onChange={(e) => handleItemChange(idx, "gst", e.target.value)}
                  className="border rounded w-16 px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.discount}
                  onChange={(e) =>
                    handleItemChange(idx, "discount", e.target.value)
                  }
                  className="border rounded w-16 px-2 py-1"
                />
              </td>
              <td className="font-medium">₹{calculateRowAmount(item)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={addItem}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
      >
        + Add Item
      </button>

      <div className="text-right font-semibold text-lg mb-4">
        Total: ₹{totalAmount}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editData ? "Update Invoice" : "Create Invoice"}
        </button>
      </div>
    </form>
  );
};

export default ArounInvoiceForm;
