"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { TbNotes } from "react-icons/tb";



export default function History() {

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const years = [2025, 2024, 2023];
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  


  return (
    <div className="history-box">

      <div className="filters shadow-sm">
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

      
      <div className="card box-hist shadow-sm ">
        <div className="card-header">
          <span><FaRegCalendar /> October 2025</span>
          <span className="badge">Paid</span>
        </div>

        <div className="row first-row"><span>Outstanding Balance:</span><span>€0</span></div>
        <div className="row"><span>Monthly Expenses:</span><span>€12,500</span></div>
        <div className="row"><span>Payment Made:</span><span>€12,500</span></div>
        <div className="row final"><span>Final Balance:</span><span>€0</span></div>

        <div className="meta">
          <div><FaRegCalendar /> Paid on: 8 Oct 2025</div>
          <div><TbNotes /> Receipt: RCP-2025-10-001</div>
        </div>

        <div className="buttons">
          <a href="#" className="btn"><FiDownload /> Download Receipt</a>
          <a href="#" className="btn"><FiDownload /> Download Invoice</a>
        </div>
      </div>
      

      <div className="card box-hist shadow-sm">
        <div className="card-header">
          <span><FaRegCalendar /> September 2025</span>
          <span className="badge">Paid</span>
        </div>

        <div className="row first-row"><span>Outstanding Balance:</span><span>€0</span></div>
        <div className="row"><span>Monthly Expenses:</span><span>€15,500</span></div>
        <div className="row"><span>Payment Made:</span><span>€15,500</span></div>
        <div className="row final"><span>Final Balance:</span><span>€0</span></div>

        <div className="meta">
          <div><FaRegCalendar />Paid on: 9 Sep 2025</div>
          <div><TbNotes />Receipt: RCP-2025-09-001</div>
        </div>

        <div className="buttons">
          <a href="#" className="btn"><FiDownload /> Download Receipt</a>
          <a href="#" className="btn"><FiDownload /> Download Invoice</a>
        </div>
      </div>

      <div className="card box-hist shadow-sm">
        <div className="card-header">
          <span><FaRegCalendar /> August 2025</span>
          <span className="badge">Paid</span>
        </div>

        <div className="row first-row"><span>Outstanding Balance:</span><span>€12,500</span></div>
        <div className="row"><span>Monthly Expenses:</span><span>€12,500</span></div>
        <div className="row">
          <span>Late Payment Interest:</span>
          <span className="danger">€625</span>
        </div>
        <div className="row"><span>Payment Made:</span><span>€25,625</span></div>
        <div className="row final"><span>Final Balance:</span><span>€0</span></div>

        <div className="meta">
          <div><FaRegCalendar />Paid on: 15 Aug 2025</div>
          <div><TbNotes />Receipt: RCP-2025-08-001</div>
        </div>

        <div className="buttons">
          <a href="#" className="btn"><FiDownload /> Download Receipt</a>
          <a href="#" className="btn"><FiDownload /> Download Invoice</a>
        </div>
      </div>

    </div>
  );
}