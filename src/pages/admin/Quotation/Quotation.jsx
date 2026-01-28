import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getQuotation } from "../../../api/quotationApi";
import qr from "../../../assets/images/qrlogo.jpeg";
import qr2 from "../../../assets/images/iso.jpg";
import qr3 from "../../../assets/images/fsai.png";
import qr4 from "../../../assets/images/gmp.jpg";
import { FaDownload,  FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function QuotationUI() {
  const quotationRef = useRef(null);

  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [buyerInfo, setBuyerInfo] = useState({});
  const [voucherInfo, setVoucherInfo] = useState({});
  const [declarationInfo, setDeclarationInfo] = useState({
    declarationText:
      "Product Quality: Tested by QMS, EMS, OHSAS. No Sales Involved. Payments will be received only in company name through Cheque. Goods once sold cannot be taken back in any circumstances.",
    bankName: "HDFC BANK",
    accountNo: "50200000453361",
    branchIfsc: "45 FEET ROAD, & HDFC0001278",
  });

  // Selected voucher
  const [selectedVoucher, setSelectedVoucher] = useState("");

  // Fetch quotations
  useEffect(() => {
    async function fetchQuotations() {
      try {
        const data = await getQuotation();
        setQuotations(data || []);
        if (data && data.length > 0) {
          const first = data[0];
          setSelectedVoucher(first.voucherNo);
        }
      } catch (error) {
        console.error("Error fetching quotations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuotations();
  }, []);

  // Get the selected quotation
 const selectedQuotation = React.useMemo(
  () => quotations.find((q) => q.voucherNo === selectedVoucher) || [],
  [quotations, selectedVoucher]
);

  const items = selectedQuotation.items || [];

  // Update buyerInfo and voucherInfo whenever selectedQuotation changes
  useEffect(() => {
  if (!selectedQuotation) return;

  setBuyerInfo({
    contact: selectedQuotation.contactName || "",
    mobile: selectedQuotation.mobile || "",
    address: selectedQuotation.address || "",
  });

  setVoucherInfo({
    voucherNo: selectedQuotation.voucherNo || "",
    dated: selectedQuotation.date ? new Date(selectedQuotation.date).toLocaleDateString("en-GB") : "",
    paymentMode: selectedQuotation.paymentMode || "",
    dispatchedThrough: selectedQuotation.dispatchedThrough || "",
    destination: selectedQuotation.destination || "",
    immediateDated: selectedQuotation.immediateDated || "",
  });
}, [selectedQuotation]);

  // Calculate total amount
  const total = items.reduce((acc, row) => {
    const qty = Number(row.qty) || 0;
    const rate = Number(row.rate) || 0;
    const discount = Number(row.discount) || 0;
    const gst = Number(row.gst) || 0;

    const amount = qty * rate;
    const afterDiscount = amount - (amount * discount) / 100;
    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;
    return acc + finalAmt;
  }, 0);

  const amountWords = "INR " + numberToWords(total);

  function numberToWords(num) {
    if (!isFinite(num) || num === 0) return "Zero Only";
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);

    function convertNumber(n) {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convertNumber(n % 100) : "");
      if (n < 100000)
        return convertNumber(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convertNumber(n % 1000) : "");
      if (n < 10000000)
        return convertNumber(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convertNumber(n % 100000) : "");
      return convertNumber(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convertNumber(n % 10000000) : "");
    }

    let words = "";
    if (rupees > 0) words += convertNumber(rupees) + " Rupee" + (rupees !== 1 ? "s" : "");
    if (paise > 0) words += (rupees > 0 ? " And " : "") + convertNumber(paise) + " Paise";
    return words + " Only";
  }

  const handleDownload = async () => {
    if (!quotationRef.current) return;
    try {
      const clone = quotationRef.current.cloneNode(true);
      Object.assign(clone.style, {
        transform: "scale(1)",
        width: "210mm",
        minHeight: "297mm",
        position: "absolute",
        top: "-9999px",
        left: "0",
        background: "white",
        maxWidth: "100%",
        zoom: "1",
      });
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 210 * 4,
        windowHeight: 297 * 4,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Quotation_${voucherInfo.voucherNo}.pdf`);
      document.body.removeChild(clone);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };







const handlePrint = () => {
  if (!quotationRef.current) return;

  // Clone original element for printing
  const clone = quotationRef.current.cloneNode(true);
  clone.style.transform = "none";
  clone.style.width = "210mm";
  clone.style.minHeight = "297mm";
  clone.style.margin = "0 auto";
  clone.style.boxSizing = "border-box";

  // Create new print window
  const printWindow = window.open("", "_blank", "width=1200,height=900");

  // Copy current styles from the main document
  const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
    .map((node) => node.outerHTML)
    .join("\n");

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        ${styles}
        <style>
          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          html, body {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            color: black;
            font-family: 'Poppins', 'Segoe UI', sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .quotation-print {
            width: 100%;
            box-sizing: border-box;
          }

          /* Ensure all borders and shadows print cleanly */
          * {
            box-shadow: none !important;
          }

          /* Prevent page breaks inside important blocks */
          .no-break {
            page-break-inside: avoid;
          }

          /* Prevent elements from shrinking in print */
          img, table {
            max-width: 100%;
          }

          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="quotation-print">${clone.outerHTML}</div>
      </body>
    </html>
  `);
  printWindow.document.close();

  // Wait for assets (fonts, images) to load before printing
  printWindow.onload = () => {
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};













  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh] ">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-blue-100 flex flex-col items-center py-8 px-2 md:px-4">

<div className="flex flex-col md:flex-row w-full justify-center items-start md:items-center gap-4 mb-6 px-2 md:px-0">

  {/* Left Section: Download & Modify Buttons */}
  <div className="flex flex-col  sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
    >
      <FaDownload />
      <span>Download Quotation</span>
    </button>

    <Link to="/admin/quotationEdit" className="w-full sm:w-auto">
      <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition w-full sm:w-auto">
        Modify Quotation
      </button>
    </Link>


     <button
              onClick={handlePrint}
              className="shadow-lg px-4 py-2 md:px-6 md:py-3 rounded-md bg-green-500 text-white flex items-center gap-2 text-sm md:text-base hover:bg-green-600 transition-colors"
            >
              <FaPrint />
              <span>Print Invoice</span>
            </button>
  </div>

  {/* Right Section: Voucher Dropdown */}
  <div className="w-full md:w-[300px]">
    <select
      className="w-full border border-blue-500 rounded-lg p-2 outline-none shadow focus:border-blue-700 transition"
      value={selectedVoucher}
      onChange={(e) => setSelectedVoucher(e.target.value)}
    >
      <option value="">Select Voucher No...</option>
      {quotations.map((q, index) => (
        <option key={index} value={q.voucherNo}>
          {q.voucherNo}
        </option>
      ))}
    </select>
  </div>

</div>

     
     

      {/* Scrollable container */}
      <div className="flex justify-center items-start   w-full overflow-x-auto ">
        <div className="origin-top w-[1000px] h-[400px] scale-[0.40] sm:w-[1000px] sm:h-[900px] sm:scale-[0.20] md:w-[190mm] md:scale-[0.95] lg:w-[210mm] lg:scale-[1]" style={{ transition: "transform 0.3s ease-in-out" }}>
          <div ref={quotationRef} className="relative bg-white text-black shadow-3xl border border-white p-4 sm:p-6 overflow-hidden" style={{ width: "210mm", minHeight: "297mm", maxWidth: "100%", transformOrigin: "top center" }}>
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center border-b pb-4 gap-10 mb-4">
              <div><img src={qr} alt="logo" className="md:w-[300px] md:h-[60px]" /></div>
              <div>
                <h1 className="text-sm sm:text-lg font-bold">Aroun Systems & Safety Equipments</h1>
                <p className="text-[13px]">Manufacturer & Wholesalers For Fire & Safety Equipments</p>
                <p className="text-xs sm:text-sm mt-2">GSTIN : 34ADXPA0879K1Z3 | Address : 38, 39, 2nd Cross Street, Green Garden, Lawspet Post, Puducherry - 605 008</p>
              </div>
              <div className="flex gap-2">
                <img src={qr2} alt="" className="w-[50px] h-[30px]" />
                <img src={qr3} alt="" className="w-[50px] h-[30px]" />
                <img src={qr4} alt="" className="w-[50px] h-[30px]" />
              </div>
            </div>

            {/* Title */}
            <div className="flex justify-center mb-5"><h1 className="  text-xl font-bold">AROUN - QUOTATION</h1></div>

            {/* Buyer & Voucher Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">

           <div className="p-4 border border-border  rounded">
  <h3 className="font-bold text-foreground mb-3">Buyer (Bill to)</h3>

  {/* Static GST line */}
  <p className="text-sm mt-2  font-bold">
    <span className="font-bold ">GST:</span> 34ADXPA0879K1Z3
  </p>

  {Object.entries(buyerInfo).map(([key, value]) => (
    <p
      key={key}
      className="text-sm mt-2 text-foreground"
      onInput={(e) =>
        setBuyerInfo({ ...buyerInfo, [key]: e.currentTarget.textContent || "" })
      }
    >
      {key === "contact" ? (
        <>
          <span className=" font-bold ">Contact Name:</span> {value}
        </>
      ) : key === "mobile" ? (
        <>
          <span className=" font-bold ">Mobile:</span> {value}
        </>
      ) : key === "address" ? (
        <>
          <span className=" font-bold">Address:</span> {value}
        </>
      ) : (
        value
      )}
    </p>
  ))}
</div>

              <div className="p-4 border border-border  rounded">
  {Object.entries(voucherInfo).map(([key, value]) => (
    <div key={key} className="flex justify-between items-center mt-2">
      <h4 className="font-bold text-sm text-foreground">
        {key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}:
      </h4>
      <p
        className="text-sm text-foreground"
        onInput={(e) =>
          setVoucherInfo({ ...voucherInfo, [key]: e.currentTarget.textContent || "" })
        }
      >
        {value}
      </p>
    </div>
  ))}
</div>



            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border border-collapse">
                <thead >
                  <tr className="bg-muted text-center">
                    <th className="px-2 py-1 border border-border">Sl No.</th>
                    <th className="px-2 py-1 border border-border text-left">Description</th>
                    <th className="px-2 py-1 border border-border">HSN</th>
                    <th className="px-2 py-1 border border-border">GST%</th>
                    <th className="px-2 py-1 border border-border">Qty</th>
                    <th className="px-2 py-1 border border-border text-right">Rate</th>
                   
                    <th className="px-2 py-1 border border-border text-right">Disc%</th>
                    <th className="px-2 py-1 border border-border text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, index) => {
                    const qty = Number(row.qty) || 0;
                    const rate = Number(row.rate) || 0;
                    const discount = Number(row.discount) || 0;
                    const gst = Number(row.gst) || 0;
                    const amount = qty * rate;
                    const afterDiscount = amount - (amount * discount) / 100;
                    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;

                    return (
                      <tr key={index} className="text-sm text-foreground">
                        <td className="px-2 py-1 border border-border text-center">{index + 1}</td>
                        <td className="px-2 py-1 border border-border text-left">{row.desc}</td>
                        <td className="px-2 py-1 border border-border text-center">{row.hsn}</td>
                        <td className="px-2 py-1 border border-border text-center">{gst}%</td>
                        <td className="px-2 py-1 border border-border text-right">{qty}</td>
                        <td className="px-2 py-1 border border-border text-right">{rate.toFixed(2)}</td>
                      
                        <td className="px-2 py-1 border border-border text-right">{discount}</td>
                        <td className="px-2 py-1 border border-border text-right">{finalAmt.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr className=" text-right bg-muted">
                    <td colSpan={7} className="px-2 py-1 border border-border font-bold text-right">Total</td>
                    <td className="px-2 py-1 border border-border text-right ">{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Declaration + Bank */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded p-4">
                <strong className="text-foreground">Amount Chargeable (in words):</strong>
                <div className="mt-2 text-sm">{amountWords}</div>
                <h4 className="font-bold mt-6 text-foreground">Declaration</h4>
                <p className="mt-2 text-xs text-muted-foreground" contentEditable suppressContentEditableWarning={true} onInput={(e) => setDeclarationInfo({ ...declarationInfo, declarationText: e.currentTarget.textContent || "" })}>{declarationInfo.declarationText}</p>
              </div>

              <div className="border border-border rounded p-4">
                <h4 className="font-bold text-foreground mb-3">Company's Bank Details</h4>
                {["bankName", "accountNo", "branchIfsc"].map((key) => (
                  <div key={key} className="flex justify-between items-center mt-2">
                    <h5 className="font-semibold text-sm text-foreground">{key === "bankName" ? "Bank Name:" : key === "accountNo" ? "A/c No.:" : "Branch & IFS Code:"}</h5>
                    <p className="text-sm text-foreground" contentEditable suppressContentEditableWarning={true} onInput={(e) => setDeclarationInfo({ ...declarationInfo, [key]: e.currentTarget.textContent || "" })}>{declarationInfo[key]}</p>
                  </div>
                ))}
                <div className="mt-6">
                  <h5 className="font-bold text-foreground">For Aroun Systems & Safety Equipments</h5>
                </div>
                <div className="flex justify-end mt-8 font-bold text-foreground">
                  <h5>Authorised Signatory</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
