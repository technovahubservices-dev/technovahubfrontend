import React, { useState } from "react";
import QuotationForm from "./QuotationForm";
import QuotationTable from "./QuotationTable";
import qr from "../../../assets/images/qrlogo.jpeg";

const QuotationManager = () => {
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (quotation) => {
    setEditData(quotation);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  return (
    <div className="md:p-8 p-4 bg-white">

      {/* Header */}
      <div><img src={qr} alt="logo" className="md:w-[290px] md:h-[50px] w-[300px] mb-6" /></div>
      <div className="flex justify-between items-center mb-6">
  
        <h1 className="md:text-2xl font-bold text-blue-800">Aroun Quotation List</h1>
        <button
          onClick={handleAddNew}
          className="md:px-5 md:py-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
        >
          + Add Quotation
        </button>
      </div>

      {/* Quotation Table */}
      <QuotationTable onEdit={handleEdit} />

      {/* Modal Form */}
      {isModalOpen && (
        <QuotationForm
          editData={editData}
          onClose={() => setIsModalOpen(false)}
          onUpdateComplete={() => {
            setIsModalOpen(false);
            setEditData(null);
          }}
        />
      )}
    </div>
  );
};

export default QuotationManager;
