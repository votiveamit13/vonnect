    "use client";

export default function Loader({ text = "Loading...", size = "sm" }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-7 h-7 border-[3px]",
    lg: "w-10 h-10 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <div
        className={`animate-spin rounded-full border-[#001F3F] border-t-transparent ${sizes[size]}`}
      />
      {text && (
        <p className="text-[12px] text-[#6A7282]">
          {text}
        </p>
      )}
    </div>
  );
}