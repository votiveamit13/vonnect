"use client";

import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import {
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiTool,
  FiMessageSquare,
  FiBell,
} from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { updateNotificationSettingApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function NotificationTab({ title, items = [], loading }) {
  const [settings, setSettings] = useState(items);
  const [master, setMaster] = useState(true);

  const notificationIconMap = {
    1: FiDollarSign,
    2: FiCalendar,
    3: FiUsers,
    4: FiTool,
    5: FiMessageSquare,
    6: FiBell,
    7: CiCalendar,
  };

  useEffect(() => {
  if (settings.length > 0) {
    const allEnabled = settings.every(
      (s) => s.app && s.email
    );
    setMaster(allEnabled);
  }
}, [settings]);

  useEffect(() => {
    setSettings(items);
  }, [items]);

  const handleMasterToggle = async () => {
    const newValue = !master;
    setMaster(newValue);

    const updated = settings.map((item) => ({
      ...item,
      app: newValue,
      email: newValue,
    }));

    setSettings(updated);

    try {
      await Promise.all(
        updated.map((item) =>
          updateNotificationSettingApi({
            notification_type_id: item.id,
            app_enable: newValue,
            email_enable: newValue,
          })
        )
      );
      toast.success("All notification settings updated");
    } catch (err) {
      toast.error("Failed to update master settings");
    }
  };

  const toggle = async (item, type) => {
    const newValue = !item[type];

    setSettings((prev) =>
      prev.map((s) =>
        s.id === item.id ? { ...s, [type]: newValue } : s
      )
    );

    try {
      await updateNotificationSettingApi({
        notification_type_id: item.id,
        app_enable:
          type === "app" ? newValue : item.app,
        email_enable:
          type === "email" ? newValue : item.email,
      });
      toast.success("Notification setting updated");
    } catch (err) {
      toast.error("Failed to update setting");

      setSettings((prev) =>
        prev.map((s) =>
          s.id === item.id ? { ...s, [type]: !newValue } : s
        )
      );
    }
  };

  return (
    <div className="mt-4 px-4 sm:px-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] overflow-hidden">

        <div className="bg-[#001F3F] px-5 py-4 flex items-center justify-between text-white rounded-t-[16px]">
          <div className="flex gap-2 items-center">
            <FiBell size={16} />
            <p className="text-[14px]">Notification Settings</p>
          </div>
          <Toggle checked={master} onChange={handleMasterToggle} />
        </div>

        {loading ? (
          <Loader text="Loading notifications..." size="md" />
        ) : (
          <div>
            {settings.map((item) => (
              <div key={item.key} className="px-5 py-4 border-b-2 border-[#E5E5E5]">

                <div className="flex items-start gap-3">
                  <div className="text-[#99A1AF] mt-[2px]">
                    {(() => {
                      const Icon = notificationIconMap[item.id] || FiBell;
                      return <Icon size={20} />;
                    })()}
                  </div>

                  <div>
                    <p className="text-[14px] text-[#001F3F] leading-tight font-medium">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-[#6A7282] leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-3 pl-7">
                  <Channel
                    label="App"
                    checked={item.app}
                    onClick={() => toggle(item, "app")}
                  />
                  <Channel
                    label="Email"
                    checked={item.email}
                    onClick={() => toggle(item, "email")}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-[44px] h-[24px] rounded-full relative transition ${checked ? "bg-white" : "bg-white/30"
        }`}
    >
      <span
        className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] rounded-full bg-[#001F3F] transition ${checked ? "translate-x-5" : ""
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
        className={`w-[44px] h-[24px] rounded-full relative transition ${checked ? "bg-[#001F3F]" : "bg-[#D1D5DC]"
          }`}
      >
        <span
          className={`absolute top-[4px] left-[4px] w-[16px] h-[16px] rounded-full bg-white transition ${checked ? "translate-x-5" : ""
            }`}
        />
      </button>
    </div>
  );
}
