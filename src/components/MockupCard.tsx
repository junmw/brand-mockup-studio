import React, { useState } from "react";
import { Download, Maximize2, RefreshCw, SlidersHorizontal } from "lucide-react";
import { MockupItem, AspectRatio } from "../types";

const AVAILABLE_RATIOS: Array<{ value: AspectRatio; label: string }> = [
  { value: "16:9", label: "Wide (16:9)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "1:1", label: "Square (1:1)" },
  { value: "3:4", label: "Portrait (3:4)" },
  { value: "9:16", label: "Story (9:16)" },
];

interface MockupCardProps {
  item: MockupItem;
  onExpand: (item: MockupItem) => void;
  onReroll?: (item: MockupItem) => void;
  onChangeAspectRatio?: (item: MockupItem, newRatio: AspectRatio) => void;
  isRerolling?: boolean;
}

export const MockupCard: React.FC<MockupCardProps> = ({
  item,
  onExpand,
  onReroll,
  onChangeAspectRatio,
  isRerolling = false,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = item.imageUrl;
    link.download = `${item.mediumId}-${Date.now()}.png`;
    link.click();
  };

  const getAspectClass = (ar: string) => {
    switch (ar) {
      case "16:9":
        return "aspect-[16/9]";
      case "4:3":
        return "aspect-[4/3]";
      case "3:4":
        return "aspect-[3/4]";
      case "9:16":
        return "aspect-[9/16]";
      case "1:1":
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Top clean metadata - unboxed with typographical separators */}
      <div className="text-xs text-gray-500 flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-800">{item.mediumName}</span>
          <span aria-hidden="true" className="text-gray-300">·</span>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="font-mono text-gray-600 hover:text-black underline decoration-dotted decoration-gray-400 underline-offset-2 transition-colors cursor-pointer"
            title="Click to toggle aspect ratio settings"
          >
            {item.aspectRatio}
          </button>
          {item.isReference && (
            <>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="text-gray-500">Style reference</span>
            </>
          )}
        </div>
      </div>

      {/* Main card box */}
      <div
        id={`mockup-card-${item.id}`}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition-all hover:border-gray-300"
      >
        {/* Action bar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2 bg-white text-xs">
          <span className="text-xs text-gray-600 truncate max-w-[180px]" title={item.productDescription}>
            {item.productDescription}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            {/* Settings button to toggle aspect ratios */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
              title="Change aspect ratio"
              className={`rounded p-1.5 transition-colors cursor-pointer ${
                showSettings
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-400 hover:text-black hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            {onReroll && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReroll(item);
                }}
                disabled={isRerolling}
                title="Re-render this medium"
                className="rounded p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRerolling ? "animate-spin" : ""}`} />
              </button>
            )}
            <button
              type="button"
              onClick={handleDownload}
              title="Download image"
              className="rounded p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onExpand(item)}
              title="View full size"
              className="rounded p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* In-Card Settings Drawer for Aspect Ratio */}
        {showSettings && (
          <div className="border-b border-gray-100 bg-[#FAFAFA] px-4 py-3 text-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">Aspect Ratio</span>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-black text-[11px] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {AVAILABLE_RATIOS.map((r) => {
                const isCurrent = item.aspectRatio === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCurrent && onChangeAspectRatio) {
                        onChangeAspectRatio(item, r.value);
                      }
                    }}
                    disabled={isRerolling}
                    title={r.label}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-black text-white font-medium shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="font-mono text-xs">{r.value}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-400 leading-tight">
              Toggling ratio re-renders this medium only. Other mockups remain unchanged.
            </p>
          </div>
        )}

        {/* Image Preview Container */}
        <div
          className={`relative w-full cursor-pointer bg-neutral-900 overflow-hidden ${getAspectClass(
            item.aspectRatio
          )}`}
          onClick={() => onExpand(item)}
        >
          <img
            src={item.imageUrl}
            alt={`${item.mediumName} layout for ${item.productDescription}`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
          />

          {isRerolling && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs text-white text-xs font-medium gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Updating layout ({item.aspectRatio})...</span>
            </div>
          )}

          <div className="absolute bottom-2 left-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
            Expand
          </div>
        </div>

        {/* Clean footer without status pills */}
        <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <span className="truncate">
            {item.isReference ? "Primary reference mockup" : "Matched to reference style"}
          </span>
          <span className="font-mono text-[11px] text-gray-400 shrink-0 ml-2">PNG</span>
        </div>
      </div>
    </div>
  );
};
