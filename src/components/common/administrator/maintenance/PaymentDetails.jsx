"use client";
import { useState } from "react";
import { FiEdit2, FiSave } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function PaymentDetails({ amountDue, totalPaid }) {

  const due = Number(amountDue);
  const paid = Number(totalPaid);
  const difference = paid - due;

  const items = [
    { label: "Amount Due:", value: amountDue },
    { label: "Total Paid:", value: totalPaid, color: "green" },

    difference > 0 && {
      label: "Overpaid:",
      value: difference.toFixed(2),
      color: "green",
      rowClass: "overpaid-row",
    },

    difference < 0 && {
      label: "Underpaid:",
      value: Math.abs(difference).toFixed(2),
      color: "red",
      rowClass: "underpaid-row",
    },
  ].filter(Boolean);

  const [amount, setAmount] = useState(450);
  const [editing, setEditing] = useState(false);
  const [tempAmount, setTempAmount] = useState(amount);

  const handleSave = () => {
    setAmount(tempAmount);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempAmount(amount);
    setEditing(false);
  };

  return (
    <div className="pay-details-box">

      {/* Payment Summary */}
      <div className="card shadow-sm">
        <h3>Payment Summary</h3>

        {items.map((item, index) => (
          <div key={index} className={`row info-amt ${item.rowClass || ""}`}>
            <span>{item.label}</span>
            <span className={`amount ${item.color || ""}`}>
              €{item.value}
            </span>
          </div>
        ))}
      </div>

      {/* History Title */}
      <div className="hist-show">
        <h3>Payment History (1)</h3>
      </div>

      {/* Payment History Card */}
      <div className="history-card shadow-sm">

        <div className="history-left">
          <p>Payment Date</p>
          <p className="bold1">Nov 15, 2025</p>
        </div>

        <div className="paid-amnt">

          <div className="l-amt">
            <p>{editing ? "Edit Amount" : "Amount Paid"}</p>
            <p className="paid">€{amount}</p>
          </div>

          {!editing ? (
            <button className="btn-edit" onClick={() => setEditing(true)}>
              <FiEdit2 />
            </button>
          ) : (
            <div className="edit-save" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "-30"}}>
             <div className="currency-input"> 
              <span className="currency">€</span>
              <input
                type="number"
                value={tempAmount}
                onChange={(e) => setTempAmount(Number(e.target.value))}
              />
              </div>
              <button className="save-btn" onClick={handleSave}>
                <FiSave />
              </button>
              <button className="close-btn" onClick={handleCancel}>
                <IoClose />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}