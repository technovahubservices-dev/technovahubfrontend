import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getInvoice } from "../../../api/invoiceApi";
import { FaDownload, FaPrint } from "react-icons/fa";
import qr from "../../../assets/images/logoremove.png";
import {Link} from "react-router-dom"

export default function InvoiceCertificate() {
  const quotationRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceIdFilter, setInvoiceIdFilter] = useState("");

  const [declarationInfo, setDeclarationInfo] = useState({
    declarationText:
      "Product Quality: Tested by QMS, EMS, OHSAS. No Sales Involved. Payments will be received only in company name through Cheque. Goods once sold cannot be taken back in any circumstances.",
    bankName: "STATE BANK OF INDIA, VILLIYANUR",
    accountNo: "41331089375",
    branchIfsc: "SBIN0016854",
    AccountName: "TECHNOVAHUB",
  });

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getInvoice();
        setItems(data || []);
        if (data?.length) setInvoiceIdFilter(data[0].invoiceId);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const invoiceIdOptions = items.map((inv) => inv.invoiceId);
  const filteredInvoices = items.filter(
    (inv) => inv.invoiceId === invoiceIdFilter
  );
  const selectedInvoice = filteredInvoices[0] || null;

  const tableItems =
    selectedInvoice?.items.map((item, idx) => ({
      ...item,
      _uniqueKey: selectedInvoice._id + "_" + idx,
      invoiceId: selectedInvoice.invoiceId,
      invoiceTo: selectedInvoice.invoiceTo,
      date: selectedInvoice.date,
      dueDate: selectedInvoice.dueDate,
      gstin: selectedInvoice.gstin,
      address: selectedInvoice.address,
      mobile: selectedInvoice.mobile,
    })) || [];

  const total = tableItems.reduce((acc, item) => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const gst = Number(item.gst) || 0;
    const amount = qty * rate;
    const afterDiscount = amount - (amount * discount) / 100;
    const finalAmt = afterDiscount + (afterDiscount * gst) / 100;
    return acc + finalAmt;
  }, 0);

  const amountWords = "INR " + numberToWords(total);

  function numberToWords(num) {
    if (!isFinite(num) || num === 0) return "Zero Only";
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);

    function convertNumber(n) {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + convertNumber(n % 100) : "")
        );
      if (n < 100000)
        return (
          convertNumber(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + convertNumber(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          convertNumber(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + convertNumber(n % 100000) : "")
        );
      return (
        convertNumber(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + convertNumber(n % 10000000) : "")
      );
    }

    let words = "";
    if (rupees > 0)
      words += convertNumber(rupees) + " Rupee" + (rupees !== 1 ? "s" : "");
    if (paise > 0)
      words += (rupees > 0 ? " And " : "") + convertNumber(paise) + " Paise";
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
        background: "#ffffff",
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
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`Invoice_${tableItems[0]?.invoiceId || "000"}.pdf`);
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



 // ===== Calculation =====
  const subtotal = tableItems.reduce((acc, item) => {
    return acc + Number(item.qty) * Number(item.rate);
  }, 0);

  // Total discount amount
  const totalDiscount = tableItems.reduce((acc, item) => {
    const amount = Number(item.qty) * Number(item.rate);
    const discount = Number(item.discount) || 0;
    return acc + (amount * discount) / 100;
  }, 0);

  // Total GST amount
  const totalGst = tableItems.reduce((acc, item) => {
    const amount = Number(item.qty) * Number(item.rate);
    const discount = Number(item.discount) || 0;
    const afterDiscount = amount - (amount * discount) / 100;
    const gst = Number(item.gst) || 0;
    return acc + (afterDiscount * gst) / 100;
  }, 0);

  // CGST and SGST (assuming 50%-50%)
  const cgst = totalGst / 2;
  const sgst = totalGst / 2;

  // Grand total
  const grandTotal = subtotal - totalDiscount + totalGst;

  // Saved/Evolo logic
  const savedAmount = totalDiscount; // show how much customer saved


  
if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh] ">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-blue-100 flex flex-col items-center py-8 px-2 md:px-4">
      <div className="mb-6 w-full flex flex-col md:flex-row justify-center md:justify-center items-center gap-4 px-2 md:px-0 print:hidden">
          <div className="w-full md:w-[300px]">
          <select
            value={invoiceIdFilter}
            onChange={(e) => setInvoiceIdFilter(e.target.value)}
            className="border border-[#3b82f6] outline-none p-2 rounded w-full text-sm md:text-base"
          >
            {invoiceIdOptions.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
<Link to="/admin/invoiceEdit">
<button className="bg-yellow-500 p-3 px-6 font-bold text-white cursor-pointer rounded-md">
          Modify Changes
        </button>
</Link>
        

        <button
          onClick={handleDownload}
          className="shadow-lg px-4 py-2 md:px-6 md:py-3 rounded-md bg-green-600 text-white flex items-center gap-2 text-sm md:text-base font-bold  transition-colors"
        >
          <FaDownload />
          <span>Download Invoice</span>
        </button>

        <button
          onClick={handlePrint}
          className="shadow-lg px-4 py-2 md:px-6 md:py-3 rounded-md bg-green-500 text-white flex items-center gap-2 text-sm md:text-base hover:bg-green-600 transition-colors"
        >
          <FaPrint />
          <span>Print Invoice</span>
        </button>

      
      </div>

      <div className="flex justify-center items-start w-full overflow-x-auto overflow-y-auto">
        <div
          className="origin-top w-[1000px] h-[400px] scale-[0.40] sm:w-[1000px] sm:h-[900px] sm:scale-[0.20] md:w-[190mm] md:scale-[0.95] lg:w-[210mm] lg:scale-[1]"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <div
            ref={quotationRef}
            className="relative bg-white text-black shadow-xl border-none p-4 sm:p-6 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "100%",
              transformOrigin: "top center",
            }}
          >
            {/* HEADER */}
            <div className="flex justify-center ">
              <img
                src={qr}
                alt="logo"
                className="md:w-[200px] md:h-[150px] rounded-full w-[120px] h-[120px]"
              />
            </div>
            <div className="flex justify-center text-xl mb-5">
              <h1 style={{ color: "#05499bff", fontWeight: "bold"  }}>INVOICE</h1>
            </div>

            {/* Buyer Info & Invoice Details */}
            <div className="flex flex-row justify-between items-center gap-[10px] mb-4">
              <div>
                <h2 style={{ fontSize: "11px",  color: "#060608ff", }}>
                  No.48, First Floor,
                  <br />
                  Lawspet Main Road, Puducherry - 605008
                </h2>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  textAlign: "right",
                  color: "#090a0cff",
                }}
              >
                <p>Phone: 9360962810 | Email: technovahubcareer@gmail.com</p>
                <p>GSTIN: 34ADXPA0879K1Z3 | State: 34-Puducherry</p>
              </div>
            </div>
            <hr style={{ borderColor: "#d1d5db" }} />

            {/* Invoice To & Details */}
            <div className="w-full flex flex-col gap-3 mt-5 md:flex-row justify-between mb-3">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <p style={{ color: "#05438fff", fontWeight:"bold",  marginBottom: "10px" ,fontSize:"13px"}}>
                  Invoice To: <br />{" "}
                  <span style={{ color: "#040202ff", fontWeight: "500" }}>
                    {tableItems[0]?.invoiceTo || "N/A"}
                  </span>
                </p>
                <hr style={{ borderColor: "#d1d5db" }} />
               <p style={{ color: "#05438fff", fontWeight:"bold",  marginBottom: "10px" , fontSize:"13px" }}>
                  GST IN: <br />{" "}
                  <span style={{ color: "#040202ff", fontWeight: "500" }}>
                    34ADXPA0879K1Z3
                  </span>{" "}
                </p>
                <hr style={{ borderColor: "#d1d5db" }} />
                <div
                  style={{ color: "#05438fff", fontWeight:"bold",  marginBottom: "0px", fontSize:"13px" }}
                >
                  Address: <br />
                  <p style={{ color: "#040202ff", fontWeight: "500" }}>
                    {tableItems[0]?.address || "N/A"}
                  </p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="md:w-1/2">
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "11px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
  {[
    {
      label: "Invoice #",
      value: tableItems[0]?.invoiceId || "-",
    },
    {
      label: "Date",
    value: selectedInvoice?.date
        ? new Date(selectedInvoice.date).toLocaleDateString("en-GB")
        : "-",
    },
    {
      label: "Due Date",
     value: selectedInvoice?.dueDate
        ? new Date(selectedInvoice.dueDate).toLocaleDateString("en-GB")
        : "-",
    },
  ].map((row, index) => (
    <tr
      key={index}
      style={{
        backgroundColor: index % 2 === 0 ? "#e0f2fe" : "#f8fafc",
      }}
    >
      <td
        style={{
          padding: "8px 10px",
          fontWeight: "600",
          color: "#1e3a8a",
          border: "1px solid #d1d5db",
          width: "40%",
        }}
      >
        {row.label}
      </td>
      <td
        style={{
          padding: "8px 10px",
          color: "#111827",
          border: "1px solid #d1d5db",
          width: "60%",
        }}
      >
        {row.value}
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            </div>

            <hr style={{ borderColor: "#d1d5db" }} />

            {/* Invoice Table */}
            <div className="w-full overflow-x-auto mt-10">
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#0c5cbdff", // Tailwind blue-600
                      color: "#ffffff",
                      textTransform: "uppercase",
                      fontSize: "14px", 
                    }}
                  >
                    <th className="px-3 py-2">Sl No.</th>
                    <th className="px-3 py-2 text-left">Items Desc</th>
                    <th className="px-3 py-2">HSN/SAC</th>
                    <th className="px-3 py-2 text-right">Qty</th>
                    <th className="px-3 py-2 text-right">Price</th>
                    <th className="px-3 py-2 text-right">Disc%</th>
                    <th className="px-3 py-2">GST%</th>
                    <th className="px-3 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableItems.map((row, index) => {
                    const qty = Number(row.qty) || 0;
                    const rate = Number(row.rate) || 0;
                    const discount = Number(row.discount) || 0;
                    const gst = Number(row.gst) || 0;
                    const amount = qty * rate;
                    const afterDiscount = amount - (amount * discount) / 100;
                    const finalAmt =
                      afterDiscount + (afterDiscount * gst) / 100;

                    return (
                      <tr
                        key={row._uniqueKey}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9fafb" : "#ffffff",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#e0f2fe")
                        } // Tailwind blue-100
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#f9fafb" : "#ffffff")
                        }
                      >
                        <td className="px-3 py-2 text-center">{index + 1}</td>
                        <td className="px-3 py-2 text-left text-[12px]">{row.desc}</td>
                        <td className="px-3 py-2 text-center  text-[12px]">{row.hsn}</td>
                        <td className="px-3 py-2 text-right  text-[12px]">{qty}</td>
                        <td className="px-3 py-2 text-right  text-[12px]">
                          ₹ {rate.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 text-right  text-[12px]">{discount}%</td>
                        <td className="px-3 py-2 text-center  text-[12px]">{gst}%</td>
                        <td className="px-3 py-2 text-right  text-[12px]">
                           ₹{finalAmt.toFixed(2)}
                        </td>
                      </tr>

                    );
                  
                  })}
                 
                  
                   <br />
                  <tr style={{ borderTop: "1px solid #ddd" }}>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#444" }}>
    Sub Total
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#222" }}>
    ₹ {subtotal.toFixed(2)}
  </td>
</tr>

<tr>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#444" }}>
    Total Discount
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#198754" }}>
    ₹ {totalDiscount.toFixed(2)}
  </td>
</tr>

<tr style={{ backgroundColor: "#f9f9f9" }}>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#444" }}>
    CGST (9%)
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#222" }}>
    ₹ {cgst.toFixed(2)}
  </td>
</tr>

<tr style={{ backgroundColor: "#f9f9f9" }}>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#444" }}>
    SGST (9%)
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#222" }}>
    ₹ {sgst.toFixed(2)}
  </td>
</tr>

<tr style={{ borderTop: "2px solid #999", backgroundColor: "#f1f1f1" }}>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "15px", fontWeight: "700", color: "#111" }}>
    Grand Total
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "15px", fontWeight: "700", color: "#111" }}>
    ₹ {grandTotal.toFixed(2)}
  </td>
</tr>

<tr>
  <td colSpan={7} style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "600", color: "#444" }}>
    You Saved
  </td>
  <td style={{ padding: "8px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#198754" }}>
    ₹ {savedAmount.toFixed(2)}
  </td>
</tr>

                </tbody>
              </table>
            </div>

            <div
              className="flex justify-end mt-2 text-[10px] mb-10"
              style={{ color: "#1774b7ff" }}
            >
              {amountWords}
            </div>

             <hr style={{ borderColor: "#d1d5db" }} />

            {/* Declaration + Bank */}
            <div className="grid grid-cols-2 gap-10 mt-6">
              <div className="p-4">
                <h4 style={{ color: "#60a5fa" }}>Bank Details</h4>
                {[
                  { key: "bankName", label: "Bank Name:" },
                  { key: "accountNo", label: "A/c No.:" },
                  { key: "branchIfsc", label: "Branch & IFS Code:" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex gap-2 items-center mt-2">
                    <h5
                      style={{
                        fontWeight: "600",
                        fontSize: "12px",
                        color: "#111",
                      }}
                    >
                      {label}
                    </h5>
                    <p
                      style={{ fontSize: "12px", color: "#111" }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={(e) =>
                        setDeclarationInfo({
                          ...declarationInfo,
                          [key]: e.currentTarget.textContent || "",
                        })
                      }
                    >
                      {declarationInfo[key]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className="flex justify-end text-[#60a5fa] text-sm mt-8">
                  <h5>For TECHNOVAHUB</h5>
                </div>
                <div className="flex justify-end text-sm">
                  <h5>Authorized Signatory</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
