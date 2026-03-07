"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import { useState } from "react";
import "./maintenance-fees.css";
import { IoHomeOutline } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import { FaRegCalendar, FaRegBell } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { LuStickyNote } from "react-icons/lu";
import { TbNotes } from "react-icons/tb";
import { IoPaperPlaneOutline } from "react-icons/io5";




export default function Maintenance() {
  const [activeTab, setActiveTab] = useState("Pending"); // Default tab
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
    { boxinfo: "UF", title: "Residential Unit", description: "Ocean View Residences", unit: "UF-101" },
    { boxinfo: "UF", title: "Residential Unit", description: "Ocean View Residences", unit: "UF-102" },
    { boxinfo: "UF", title: "Residential Unit", description: "Ocean View Residences", unit: "UF-201" },
    { boxinfo: "UF", title: "Residential Unit", description: "Ocean View Residences", unit: "UF-202" },
    { boxinfo: "UC", title: "Parking Space", description: "Ocean View Residences", unit: "UC-P01" },
    { boxinfo: "UC", title: "Parking Space", description: "Ocean View Residences", unit: "UC-P02" },
    { boxinfo: "UC", title: "Parking Space", description: "Ocean View Residences", unit: "UC-P03" },
  ];

  const paidunits = [
    { unitnumber: "UF-102", paydate: "Nov 15, 2025", buttonpay: "Tap to view payment details →", amttopaid: "Amount to be paid", amttopaidprice: "€450", amtpaid: "Amount Paid", amtgreen: "€450" },
    { unitnumber: "UF-202", paydate: "Nov 10, 2025", buttonpay: "Tap to view payment details →", amttopaid: "Amount to be paid", amttopaidprice: "€600", amtpaid: "Amount Paid", amtgreen: "€650" },
    { unitnumber: "UC-P02", paydate: "Nov 12, 2025", buttonpay: "Tap to view payment details →", amttopaid: "Amount to be paid", amttopaidprice: "€150", amtpaid: "Amount Paid", amtgreen: "€120" },
    { unitnumber: "UF-302", paydate: "Nov 18, 2025", buttonpay: "Tap to view payment details →", amttopaid: "Amount to be paid", amttopaidprice: "€540", amtpaid: "Amount Paid", amtgreen: "€540" },
  ];

  const invoices = [
    { id: "UF-201", amount: 450, lastReminder: "October 15, 2025" },
    { id: "UF-202", amount: 600, lastReminder: "November 18, 2025" },
    { id: "UC-P01", amount: 150, lastReminder: null },
    { id: "UC-301", amount: 540, lastReminder: null },
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

        {/* TAB CONTENT */}

        {activeTab === "Pending" && (
          <div className="pending-info">
            <div className="filters shadow-sm">
              <div className="blockdiv">
                <label>Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="blockdiv">
                <label>Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="summary-card sum-card-pend shadow-sm">
              <div className="upr-icon">
                <div className="icon-circle"><BiDollar /></div>
                <div className="summary-text">
                  <div className="title">Total Pending Amount</div>
                  <div className="amount">€1,760</div>
                  <div className="subtitle">Total Expenses: €3,480</div>
                </div>
              </div>
              <div className="due-date">
                <span><FaRegCalendar /></span>
                <p><span>Due Date:</span>November 30, 2025</p>
              </div>
            </div>

            <div className="section-title">
              <p>Unpaid Units (4)</p>
              <div className="remi-btn">
                <button><FaRegBell /> Send Reminder to All</button>
              </div>
            </div>

            <div>
              {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Paid" && (
          <div className="history-box paid-tabs">
            <div className="filters shadow-sm">
              <div className="blockdiv">
                <label>Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="blockdiv">
                <label>Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="summary-card">
              <div className="icon-circle"><BiDollar /></div>
              <div className="summary-text">
                <div className="title">Total Amount Paid</div>
                <div className="amount">€1,740</div>
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
            ))}
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
            ))}
            
          </div>
        )}
      </div>
    </>
  );
}


function InvoiceCard({ invoice }) {

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [showReminderHistory, setShowReminderHistory] = useState(false);

  // INITIAL REMINDER HISTORY
  const [reminders, setReminders] = useState(() => {
    if (!invoice.lastReminder) return [];

    const date = new Date(invoice.lastReminder);

    return [
      {
        date: invoice.lastReminder,
        period: date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        sentBy: "Admin User",
      },
    ];
  });

  // LATEST REMINDER
  const latestReminder = reminders[0]?.date;

  // SEND REMINDER
  const sendReminder = () => {

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const period = today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const newReminder = {
      date: formattedDate,
      period: period,
      sentBy: "Admin User",
    };

    setReminders([newReminder, ...reminders]);
  };

  const openNoteModal = () => setShowNoteModal(true);
  const closeNoteModal = () => setShowNoteModal(false);

  const saveNote = () => {

    const newNote = {
      text: noteText,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes([...notes, newNote]);
    setNoteText("");
    closeNoteModal();
  };

  const openReminderHistory = () => setShowReminderHistory(true);
  const closeReminderHistory = () => setShowReminderHistory(false);

  return (
    <>
      <div className="invoice-card shadow-sm">

        <div className="invoice-header">
          <div className="invoice-id">
            <h3>{invoice.id}</h3>
          </div>

          <div className="invoice-amount">
            <span className="amount-label">Amount to be Paid</span>
            <span className="amount-value">€{invoice.amount}</span>
          </div>
        </div>

        {latestReminder && (
          <div
            className="reminder-box"
            onClick={openReminderHistory}
            style={{ cursor: "pointer" }}
          >
            <div className="reminder-text">
              <div className="dflex">
                <FiBell />
              </div>

              <div className="reminder-history">
                <div className="lrs">
                  <span>Last Reminder Sent:</span> {latestReminder}
                </div>

                <div className="hist">
                  <LuHistory /> Click to view reminder history
                </div>
              </div>
            </div>
          </div>
        )}

        {notes.length > 0 && (
          <div className="notes-section" style={{ marginTop: 10, marginBottom: 10 }}>
            {notes.map((note, index) => (
              <div key={index} className="saved-note">
                <TbNotes /> <strong>Note:</strong> {note.text}
              </div>
            ))}
          </div>
        )}

        <button className="note-button" onClick={openNoteModal}>
          <LuStickyNote /> Add Note
        </button>

        <button className="reminder-button" onClick={sendReminder}>
          <FiBell /> Send Reminder
        </button>

      </div>

      {showNoteModal && (
        <NoteModal
          unitId={invoice.id}
          noteText={noteText}
          setNoteText={setNoteText}
          onClose={closeNoteModal}
          onSave={saveNote}
        />
      )}

      {showReminderHistory && (
        <ReminderHistoryModal
          unitId={invoice.id}
          reminders={reminders}
          onClose={closeReminderHistory}
        />
      )}
    </>
  );
}

// Modal Component
function NoteModal({ unitId, noteText, setNoteText, onClose, onSave }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // close modal on background click
    >
      <div
        style={{ backgroundColor: "white", padding: 20, borderRadius: 8, width: "800px", position: "relative" }}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
      >

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            lineHeight: "1",
          }}
          aria-label="Close modal"
          title="Close"
        >
          &#x2715; {/* This is the ✖ symbol */}
        </button>

        <div className="an-note"><h3>Add Note</h3></div>

        <div className="nf-note"><p>Note for Unit {unitId}</p></div>

        <textarea
          style={{ width: "100%", height: "100px", padding: 10, borderRadius: 10, border: "1px solid #D1D5DC", resize: "none" }}
          placeholder="Enter your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 10 }}>
          {/* <button onClick={onClose} style={{ padding: "6px 12px" }}>Cancel</button> */}
          <button className="submit-note"
            onClick={onSave}
            disabled={!noteText.trim()}
            style={{
              backgroundColor: noteText.trim() ? "#0d2b45" : "#D1D5DC",
              color: "white",
              cursor: noteText.trim() ? "pointer" : "not-allowed"
            }}
          >
            <IoPaperPlaneOutline /> Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

function ReminderHistoryModal({ unitId, reminders, onClose }) {

  const now = new Date();
  const monthYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: "800px",
          position: "relative",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <div className="an-note">
          <h3>Reminder History</h3>
          <div className="nf-note">
            <p>Unit {unitId} - {monthYear}</p>
          </div>
        </div>

        <div style={{
          overflowY: "auto",
          marginTop: "20px",
          paddingRight: "5px",
        }}>
          {reminders.map((reminder, index) => (
            <div key={index} className="history-info-rem">

              <div className="icon">
                <FiBell />
              </div>

              <div className="info">
                <h4>Reminder Sent</h4>
                <p>
                  <span>Date:</span> {reminder.date}
                </p>
                <p>
                  <span>Payment Period:</span> {reminder.period}
                </p>
                <p>
                  <span>Sent by:</span> {reminder.sentBy}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}