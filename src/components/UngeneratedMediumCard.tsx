import React from "react";
import { Plus, RefreshCw, Image as ImageIcon } from "lucide-react";

interface UngeneratedMediumCardProps {
  medium: {
    id: string;
    label: string;
    ratio: string;
  };
  hasAnchor: boolean;
  anchorMediumName?: string;
  onGenerate: (mediumId: string) => void;
  isGenerating?: boolean;
}

export const UngeneratedMediumCard: React.FC<UngeneratedMediumCardProps> = ({
  medium,
  hasAnchor,
  anchorMediumName,
  onGenerate,
  isGenerating = false,
}) => {
  const getAspectClass = (ar: string) => {
    switch (ar) {
      case "16:9":
        return "aspect-video";
      case "3:4":
        return "aspect-[3/4]";
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Top clean metadata - unboxed with typographical separator */}
      <div className="text-xs text-gray-500 flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-800">{medium.label}</span>
          <span aria-hidden="true" className="text-gray-300">·</span>
          <span className="font-mono text-gray-500">{medium.ratio}</span>
          <span aria-hidden="true" className="text-gray-300">·</span>
          <span className="text-gray-400">Unrendered</span>
        </div>
      </div>

      {/* Main card box with aspect ratio container */}
      <div
        id={`ungenerated-card-${medium.id}`}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50/50 hover:bg-white hover:border-gray-400 transition-all shadow-xs"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-dashed border-gray-200 px-4 py-2 bg-gray-50 text-xs">
          <span className="text-xs text-gray-500 font-medium">Ready to render</span>
          <span className="font-mono text-[11px] text-gray-400">{medium.ratio}</span>
        </div>

        {/* Aspect Ratio Placeholder Container */}
        <div
          className={`relative w-full flex flex-col items-center justify-center p-6 text-center ${getAspectClass(
            medium.ratio
          )}`}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center space-y-2.5">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin text-gray-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">
                  Rendering {medium.label}...
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {hasAnchor
                    ? `Matching ${anchorMediumName || "first"} mockup`
                    : "Preparing initial layout"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 max-w-[220px]">
              <div className="h-9 w-9 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-900">
                  {medium.label}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                  {hasAnchor
                    ? `Uses your ${anchorMediumName || "first"} image as a visual reference.`
                    : "Click below to render this layout."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onGenerate(medium.id)}
                className="mt-1 inline-flex items-center gap-1.5 bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create {medium.label}</span>
              </button>
            </div>
          )}
        </div>

        {/* Clean footer */}
        <div className="px-4 py-2.5 bg-gray-50/80 border-t border-dashed border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <span className="truncate">
            {hasAnchor ? `References ${anchorMediumName || "primary layout"}` : "Stand-alone layout"}
          </span>
          <span className="font-mono text-[11px] text-gray-400">Draft</span>
        </div>
      </div>
    </div>
  );
};
