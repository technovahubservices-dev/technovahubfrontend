import React from "react";

const SalarySlip = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT SIDE - FORM */}
          <div className="w-full lg:w-1/2 bg-white shadow-md rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Salary Slip Generator</h2>
            
            {/* Form Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Employee Name</label>
                <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Employee ID</label>
                <input type="text" className="w-full border rounded-md px-3 py-2 mt-1" />
              </div>

              {/* Add rest of your inputs here */}
            </div>

            <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Generate Salary Slip
            </button>
          </div>

          {/* RIGHT SIDE - SLIP PREVIEW */}
          <div className="w-full lg:w-1/2 bg-white shadow-md rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4 text-center">Salary Slip Preview</h2>

            <div className="border p-4 rounded-md min-h-[500px]">
             
             



            </div>

            <div className="flex gap-3 justify-center mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Download PDF
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                Print Slip
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SalarySlip;
