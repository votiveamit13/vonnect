"use client";
import NavigationHeader from "@/components/common/NavigationHeader";
import { useState } from "react";
import "./maintenance-fees.css";
import { IoHomeOutline } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { TbNotes } from "react-icons/tb";
import Link from "next/link";


export default function Maintenance() {
  const [activeTab, setActiveTab] = useState("Pending"); // ✅ Default Pending
  const tabs = ["Pending", "Paid", "Upload Charges", "History"];

   const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
  
    const years = [2025, 2024, 2023];
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    const historyfeatures = [
  {
    icon: "",
    boxinfo: "UF",
    title: "Residential Unit",
    description: "Ocean View Residences",
    unit: "UF-101",
  },
  {
    icon: "",
    boxinfo: "UF",
    title: "Residential Unit",
    description: "Ocean View Residences",
    unit: "UF-102",
  },
  {
    icon: "",
    boxinfo: "UF",
    title: "Residential Unit",
    description: "Ocean View Residences",
    unit: "UF-201",
  },
  {
    icon: "",
    boxinfo: "UF",
    title: "Residential Unit",
    description: "Ocean View Residences",
    unit: "UF-202",
  },
  {
    icon: "",
    boxinfo: "UC",
    title: "Parking Space",
    description: "Ocean View Residences",
    unit: "UC-P01",
  },
  {
    icon: "",
    boxinfo: "UC",
    title: "Parking Space",
    description: "Ocean View Residences",
    unit: "UC-P02",
  },
  {
    icon: "",
    boxinfo: "UC",
    title: "Parking Space",
    description: "Ocean View Residences",
    unit: "UC-P03",
  },

];

const paidunits = [
{
  unitnumber: "UF-102",
  paydate: "Nov 15, 2025",
  buttonpay: "Tap to view payment details →",
  amttopaid: "Amount to be paid",
  amttopaidprice: "€450",
  amtpaid: "Amount Paid",
  amtgreen: "€450",
},
{
  unitnumber: "UF-202",
  paydate: "Nov 10, 2025",
  buttonpay: "Tap to view payment details →",
  amttopaid: "Amount to be paid",
  amttopaidprice: "€600",
  amtpaid: "Amount Paid",
  amtgreen: "€650",
},
{
  unitnumber: "UC-P02",
  paydate: "Nov 12, 2025",
  buttonpay: "Tap to view payment details →",
  amttopaid: "Amount to be paid",
  amttopaidprice: "€150",
  amtpaid: "Amount Paid",
  amtgreen: "€120",
},
{
  unitnumber: "UF-302",
  paydate: "Nov 18, 2025",
  buttonpay: "Tap to view payment details →",
  amttopaid: "Amount to be paid",
  amttopaidprice: "€540",
  amtpaid: "Amount Paid",
  amtgreen: "€540",
},
];

  return (

    <>

      <NavigationHeader
  showBack
  backHref="/administration"
  title="Maintenance Fees"
  subtitle="Manage monthly payments and charges"
/>
    
    <div style={{ padding: "20px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid #d0d5dd",
                background: activeTab === tab ? "#0d2b45" : "#fff",
                color: activeTab === tab ? "#fff" : "#000",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= TAB CONTENT ================= */}

        {activeTab === "Pending" && (
          <div>
            <h3>Paid Content</h3>
            <p>This is paid tab content.</p>
          </div>
        )}

        {activeTab === "Paid" && (
          <div className="history-box paid-tabs">      
                <div className="filters">
                  <div className="blockdiv">
                    <label >Year</label>
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="blockdiv">
                  <label >Month</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  </div>
                </div>
          
                <div className="summary-card">
  <div className="icon-circle">$</div>
  <div className="summary-text">
    <div className="title">Total Amount Paid</div>
    <div className="amount">€1,760</div>
    <div className="subtitle">Total Expenses: €3,480</div>
  </div>
</div>

                      <div className="section-title">Paid Units (4)</div>

              
              {paidunits.map((unitinfo, index) => (

                <Link key={index} href="/administration/payment-details">    
                  <div className="card shadow-sm">
                    <div className="card-header">
                        <div className="left cust-h3 txt-gray">
                            <h3>{unitinfo.unitnumber}</h3>
                            <p>{unitinfo.paydate}</p>
                            <span>{unitinfo.buttonpay}</span>
                        </div>

                        <div className="right txt-gray">
                            <p className="label">{unitinfo.amttopaid}</p>
                            <div className="amount">{unitinfo.amttopaidprice}</div>

                            <p className="label">{unitinfo.amtpaid}</p>
                            <div className="paid">{unitinfo.amtgreen}</div>
                        </div>
                    </div>

                    <div className="buttons">
                      <button className="btn"><FiDownload /> Download Receipt</button>
                    </div>
                  </div>
              </Link>

              )



              )}
              

              
          
              </div>
        )}

        {activeTab === "Upload Charges" && (
          <div>
            <h3>Upload Charges Content</h3>
            <p>This is upload charges tab content.</p>
          </div>
        )}

        {activeTab === "History" && (
          <div>
            <div className="section-title">Select Unit</div>

            
            {historyfeatures.map((feature, index) => (

              <Link key={index} href="/administration/maintenance-history"> 
            <div className="unit-card shadow-sm">
              <div className="unit-left">
                <div className="icon-box"><IoHomeOutline /></div>
                <div className="unit-info">
                  <h3><span className="badge">{feature.boxinfo} </span> {feature.title}</h3>
                  <p>{feature.description}</p>
                  <p className="unit-number">{feature.unit}</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            </Link>

            )


            )}
            

          </div>
        )}
      </div>
    </>
  );
}