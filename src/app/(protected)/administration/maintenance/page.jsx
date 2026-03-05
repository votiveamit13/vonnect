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

              <Link href="#" className="card-link">    
                <div className="card">
                  <div className="card-header">
                      <div className="left cust-h3 txt-gray">
                          <h3>UF-102</h3>
                          <p>Payment Date: Nov 15, 2025</p>
                          <span>Tap to view payment details →</span>
                      </div>

                      <div className="right txt-gray">
                          <p className="label">Amount to be Paid</p>
                          <div className="amount">€450</div>

                          <p className="label">Amount Paid</p>
                          <div className="paid">€450</div>
                      </div>
                  </div>

                  <div className="buttons">
                    <button className="btn"><FiDownload /> Download Receipt</button>
                  </div>
                </div>
              </Link>

              <Link href="#" className="card-link">    
                <div className="card">
                  <div className="card-header">
                      <div className="left cust-h3 txt-gray">
                          <h3>UF-202</h3>
                          <p>Payment Date: Nov 10, 2025</p>
                          <span>Tap to view payment details →</span>
                      </div>

                      <div className="right txt-gray">
                          <p className="label">Amount to be Paid</p>
                          <div className="amount">€600</div>

                          <p className="label">Amount Paid</p>
                          <div className="paid">€650</div>
                      </div>
                  </div>

                  <div className="buttons">
                    <button className="btn"><FiDownload /> Download Receipt</button>
                  </div>
                </div>
              </Link>

              <Link href="#" className="card-link">    
                <div className="card">
                  <div className="card-header">
                      <div className="left cust-h3 txt-gray">
                          <h3>UC-P02</h3>
                          <p>Payment Date: Nov 12, 2025</p>
                          <span>Tap to view payment details →</span>
                      </div>

                      <div className="right txt-gray">
                          <p className="label">Amount to be Paid</p>
                          <div className="amount">€150</div>

                          <p className="label">Amount Paid</p>
                          <div className="paid">€120</div>
                      </div>
                  </div>

                  <div className="buttons">
                    <button className="btn"><FiDownload /> Download Receipt</button>
                  </div>
                </div>
              </Link>

              <Link href="#" className="card-link">    
                <div className="card">
                  <div className="card-header">
                      <div className="left cust-h3 txt-gray">
                          <h3>UF-302</h3>
                          <p>Payment Date: Nov 18, 2025</p>
                          <span>Tap to view payment details →</span>
                      </div>

                      <div className="right txt-gray">
                          <p className="label">Amount to be Paid</p>
                          <div className="amount">€540</div>

                          <p className="label">Amount Paid</p>
                          <div className="paid">€540</div>
                      </div>
                  </div>

                  <div className="buttons">
                    <button className="btn"><FiDownload /> Download Receipt</button>
                  </div>
                </div>
              </Link>
          
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
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><IoHomeOutline /></div>
                <div className="unit-info">
                  <h3><span className="badge">UF</span> Residential Unit</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UF-101</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><IoHomeOutline /></div>
                <div className="unit-info">
                  <h3><span className="badge">UF</span> Residential Unit</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UF-102</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><IoHomeOutline /></div>
                <div className="unit-info">
                  <h3><span className="badge">UF</span> Residential Unit</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UF-201</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><IoHomeOutline /></div>
                <div className="unit-info">
                  <h3><span className="badge">UF</span> Residential Unit</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UF-202</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><FaCarSide /></div>
                <div className="unit-info">
                  <h3><span className="badge">UC</span> Parking Space</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UC-P01</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><FaCarSide /></div>
                <div className="unit-info">
                  <h3><span className="badge">UC</span> Parking Space</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UC-P02</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
            <div className="unit-card">
              <div className="unit-left">
                <div className="icon-box"><FaCarSide /></div>
                <div className="unit-info">
                  <h3><span className="badge">UC</span> Parking Space</h3>
                  <p>Ocean View Residences</p>
                  <p className="unit-number">Unit: UC-P03</p>
                </div>
              </div>
              <div className="arrow"><BsChevronRight /></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}