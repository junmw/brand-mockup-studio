import React from "react";
import { AlertTriangle, Download, Trash2, X } from "lucide-react";

interface NewProjectConfirmModalProps {
  isOpen: boolean;
  mockupsCount: number;
  isExporting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onExportAll: () => void;
}

export const NewProjectConfirmModal: React.FC<NewProjectConfirmModalProps> = ({
  isOpen,
  mockupsCount,
  isExporting,
  onClose,
  onConfirm,
  onExportAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="new-project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="new-project-modal-content"
        className="relative max-w-md w-full overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-200 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with warning icon and close button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Start a new project?
              </h3>
              <p className="text-xs text-gray-500">
                Action requires confirmation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning copy */}
        <div className="space-y-3 text-xs leading-relaxed text-gray-600">
          <p>
            Starting a new project will <strong className="text-red-700 font-semibold">permanently delete all {mockupsCount} created mockup{mockupsCount === 1 ? "" : "s"}</strong> and clear your product description and medium selections.
          </p>
          <p className="text-gray-500">
            This action cannot be undone. Any unsaved images will be lost from memory.
          </p>
        </div>

        {/* Export suggestion callout */}
        {mockupsCount > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-gray-800">
                Save your current work
              </p>
              <p className="text-gray-500 text-[11px]">
                Download all mockups as a ZIP before resetting.
              </p>
            </div>
            <button
              type="button"
              onClick={onExportAll}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-800 rounded-lg text-xs font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-xs cursor-pointer shrink-0 ml-3 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? "Exporting..." : "Download ZIP"}</span>
            </button>
          </div>
        )}

        {/* Actions buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors cursor-pointer"
          >
            Keep current project
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete & start new</span>
          </button>
        </div>
      </div>
    </div>
  );
};
