import NavigationHeader from "@/components/common/NavigationHeader";

export default function ChangePasswordView() {
  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile?tab=settings"
        title="Change Password"
        subtitle="Update your account password"
      />

      <div className="px-4 sm:px-6 mt-6">
        <div className="bg-white rounded-[16px] shadow-sm p-4 sm:p-6 max-w-4xl mx-auto">

          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-[13px] text-[#6A7282] mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#001F3F]"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-[13px] text-[#6A7282] mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#001F3F]"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-[13px] text-[#6A7282] mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full h-[44px] border border-[#D1D5DC] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#001F3F]"
            />
          </div>

          {/* Submit */}
          <button className="w-full h-[48px] rounded-[12px] bg-[#001F3F] text-white hover:bg-[#003d7a] transition">
            Update Password
          </button>

        </div>
      </div>
    </main>
  );
}
