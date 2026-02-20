export default function UserAgreement({ content, lastUpdated }) {
  return (
    <div className="px-4 sm:px-6 mt-6 pb-10">
      <div className="bg-white rounded-[16px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] p-5 sm:p-6 mx-auto">

        <h2 className="text-[16px] text-[#001F3F] mb-3">
          WEB/MOBILE APPLICATION END USER LICENSE AGREEMENT
        </h2>

        <div className="text-[12px] text-[#4A5565] leading-relaxed space-y-3 whitespace-pre-line">
          {content}
        </div>

        {lastUpdated && (
          <p className="mt-6 text-[12px] text-[#99A1AF] py-4 border-t border-[#E5E5E5]">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
}
