import React from "react";
import { X, Download } from "lucide-react";
import { MockupItem } from "../types";

interface LightboxModalProps {
  item: MockupItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = item.imageUrl;
    link.download = `${item.mediumId}-${Date.now()}.png`;
    link.click();
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="lightbox-content"
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3.5 bg-white text-gray-900">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-900 text-sm">{item.mediumName}</span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span className="font-mono text-xs">{item.aspectRatio}</span>
            {item.isReference && (
              <>
                <span aria-hidden="true" className="text-gray-300">·</span>
                <span className="text-gray-500">Style reference</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              id="lightbox-download-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-black hover:bg-gray-800 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              title="Download image"
            >
              <Download className="w-3.5 h-3.5" />
              Download PNG
            </button>
            <button
              id="lightbox-close-btn"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 bg-[#F9F9F9] max-h-[78vh] overflow-auto">
          <img
            src={item.imageUrl}
            alt={`${item.mediumName} mockup for ${item.productDescription}`}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-xs"
          />
        </div>

        <div className="border-t border-gray-100 px-6 py-3 bg-white text-xs text-gray-500 flex items-center justify-between">
          <p className="truncate max-w-xl text-xs">
            <span className="font-medium text-gray-900 mr-1.5">Product:</span>
            {item.productDescription}
          </p>
          <span className="font-mono text-[11px] text-gray-400 shrink-0 ml-4">
            Full resolution
          </span>
        </div>
      </div>
    </div>
  );
};
