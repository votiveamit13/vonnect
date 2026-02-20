"use client";

import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";

export default function NotificationTab({ title = "Notification Settings", items = [] }) {
  const [settings, setSettings] = useState(items);
  const [master, setMaster] = useState(true);

  // Sync master toggle with children
  useEffect(() => {
    setSettings((prev) =>
      prev.map((item) => ({
        ...item,
        app: master,
        email: master,
      }))
    );
  }, [master]);

  const toggle = (key, type) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [type]: !item[type] } : item
      )
    );
  };

  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">

        {/* Header */}
        <div className="bg-[#001F3F] px-5 py-4 flex items-center justify-between text-white rounded-t-[16px]">
          <div className="flex gap-2 items-center">
            <FiBell size={16} />
            <p className="text-[14px]">Notification Settings</p>
          </div>
          <Toggle checked={master} onChange={() => setMaster(!master)} />
        </div>

        {/* Rows */}
        <div>
          {settings.map((item) => (
            <div key={item.key} className="px-5 py-4 border-b-2 border-[#E5E5E5]">

              {/* Top Row */}
              <div className="flex items-start gap-3">
                <div className="text-[#99A1AF] mt-[2px]">
                  {item.icon}
                </div>

                <div>
                  <p className="text-[14px] text-[#001F3F] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[#6A7282] leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Toggles under text (like your screenshot) */}
              <div className="flex items-center gap-6 mt-3 pl-7">
                <Channel
                  label="App"
                  checked={item.app}
                  onClick={() => toggle(item.key, "app")}
                />
                <Channel
                  label="Email"
                  checked={item.email}
                  onClick={() => toggle(item.key, "email")}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-[44px] h-[24px] rounded-full relative transition ${
        checked ? "bg-white" : "bg-white/30"
      }`}
    >
      <span
        className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] rounded-full bg-[#99A1AF] transition ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function Channel({ label, checked, onClick }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] text-[#4A5565]">{label}</span>
      <button
        onClick={onClick}
        className={`w-[44px] h-[24px] rounded-full relative transition ${
          checked ? "bg-[#001F3F]" : "bg-[#D1D5DC]"
        }`}
      >
        <span
          className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] rounded-full bg-white transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
