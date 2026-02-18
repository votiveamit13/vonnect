import Link from "next/link";
import { FiUpload } from "react-icons/fi";

export default function DocumentViewer({ title, fileUrl, uploadHref }) {
  return (
    <div className="px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#001F3F]">{title}</h2>

          <Link
            href={uploadHref}
            className="flex items-center gap-2 text-[#001F3F] text-sm hover:underline"
          >
            <FiUpload />
            Upload
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {fileUrl ? (
            <iframe src={fileUrl} className="w-full h-[450px]" />
          ) : (
            <div className="p-6 text-center text-gray-400">
              No document uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
