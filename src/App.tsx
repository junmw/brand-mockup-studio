import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { AlertCircle, RotateCcw, Download, BookOpen } from "lucide-react";
import { MockupItem, MediumId, AspectRatio } from "./types";
import { MockupCard } from "./components/MockupCard";
import { UngeneratedMediumCard } from "./components/UngeneratedMediumCard";
import { LightboxModal } from "./components/LightboxModal";
import { NewProjectConfirmModal } from "./components/NewProjectConfirmModal";
import { UserGuide } from "./components/UserGuide";
import { createSampleMockups } from "./sampleMockups";

const AVAILABLE_MEDIUMS: Array<{ id: MediumId; label: string; ratio: string }> = [
  { id: "billboard", label: "Billboard", ratio: "16:9" },
  { id: "newspaper", label: "Newspaper", ratio: "3:4" },
  { id: "social_post", label: "Social Post", ratio: "1:1" },
  { id: "subway_poster", label: "Subway Poster", ratio: "3:4" },
  { id: "magazine", label: "Magazine Ad", ratio: "4:3" },
];

export default function App() {
  const [productDescription, setProductDescription] = useState("");
  const [selectedMediums, setSelectedMediums] = useState<MediumId[]>([]);
  const [mockups, setMockups] = useState<MockupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [generatingMediumId, setGeneratingMediumId] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; isQuota?: boolean } | null>(null);
  const [activeLightboxItem, setActiveLightboxItem] = useState<MockupItem | null>(null);
  const [rerollingId, setRerollingId] = useState<string | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentView, setCurrentView] = useState<"studio" | "guide">(() => {
    if (typeof window !== "undefined" && window.location.hash === "#guide") {
      return "guide";
    }
    return "studio";
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#guide") {
        setCurrentView("guide");
      } else {
        setCurrentView("studio");
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigate = (view: "studio" | "guide") => {
    setCurrentView(view);
    if (typeof window !== "undefined") {
      if (view === "guide") {
        window.location.hash = "guide";
      } else if (window.location.hash === "#guide") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  // Toggle medium selection: selecting or deselecting hides or displays the corresponding section
  const toggleMedium = (id: MediumId) => {
    if (selectedMediums.includes(id)) {
      setSelectedMediums(selectedMediums.filter((m) => m !== id));
    } else {
      setSelectedMediums([...selectedMediums, id]);
    }
  };

  // Extract reference image data to preserve product appearance
  const getAnchorReference = (currentMockups = mockups) => {
    const anchor = currentMockups.find((m) => m.isReference) || currentMockups[0];
    if (!anchor) return undefined;

    if (anchor.base64Data) {
      return {
        data: anchor.base64Data,
        mimeType: anchor.mimeType || "image/png",
      };
    }

    if (anchor.imageUrl?.startsWith("data:image/")) {
      const match = anchor.imageUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        return {
          mimeType: match[1],
          data: match[2],
        };
      }
    }

    return undefined;
  };

  const anchorItem = mockups.find((m) => m.isReference) || mockups[0];
  const missingMediums = selectedMediums.filter(
    (id) => !mockups.some((m) => m.mediumId === id)
  );
  const generatedSelectedCount = selectedMediums.filter(
    (id) => mockups.some((m) => m.mediumId === id)
  ).length;

  // Generate all currently selected mediums from scratch
  const handleGenerateAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = productDescription.trim();
    if (!query) return;
    if (selectedMediums.length === 0) {
      setError({ message: "Please select at least one medium above to generate." });
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep("Creating initial mockups...");

    try {
      const response = await fetch("/api/generate-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription: query,
          mediumIds: selectedMediums,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const isQuota = data.isQuotaError || response.status === 429;
        setError({
          message: data.error || "Unable to generate mockups.",
          isQuota,
        });
        if (isQuota) {
          const samples = createSampleMockups(query).filter((s) =>
            selectedMediums.includes(s.mediumId)
          );
          setMockups(samples);
        }
        return;
      }

      if (!data.items || data.items.length === 0) {
        setError({
          message: "No images were returned. Please try again.",
        });
        return;
      }

      if (data.warning) {
        setError({
          message: data.warning,
          isQuota: true,
        });
      }

      setMockups(data.items);
    } catch (err: any) {
      console.error(err);
      setError({
        message: err.message || "An unexpected error occurred while generating images.",
      });
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  // Generate only missing mediums referencing the initially created mockup
  const handleGenerateMissing = async (specificMediumId?: MediumId) => {
    const query = productDescription.trim();
    if (!query) return;

    const targetsToGenerate: MediumId[] = specificMediumId
      ? [specificMediumId]
      : missingMediums;

    if (targetsToGenerate.length === 0) return;

    if (mockups.length === 0) {
      return handleGenerateAll();
    }

    setIsLoading(true);
    if (specificMediumId) {
      setGeneratingMediumId(specificMediumId);
    }
    setError(null);
    const targetLabel = specificMediumId
      ? AVAILABLE_MEDIUMS.find((m) => m.id === specificMediumId)?.label || specificMediumId
      : `${targetsToGenerate.length} medium(s)`;

    setLoadingStep(`Rendering ${targetLabel}...`);

    try {
      const referenceImage = getAnchorReference();

      const response = await fetch("/api/generate-missing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription: query,
          mediumIds: targetsToGenerate,
          referenceImage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const isQuota = data.isQuotaError || response.status === 429;
        setError({
          message: data.error || `Unable to render ${targetLabel}.`,
          isQuota,
        });
        if (isQuota) {
          const fallbackItems = createSampleMockups(query).filter((s) =>
            targetsToGenerate.includes(s.mediumId)
          );
          setMockups((prev) => {
            const existingIds = new Set(prev.map((m) => m.mediumId));
            const newItems = fallbackItems.filter((f) => !existingIds.has(f.mediumId));
            return [...prev, ...newItems];
          });
        }
        return;
      }

      if (data.warning) {
        setError({
          message: data.warning,
          isQuota: true,
        });
      }

      if (data.items && data.items.length > 0) {
        setMockups((prev) => {
          const existingIds = new Set(prev.map((m) => m.mediumId));
          const additions = data.items.filter(
            (item: MockupItem) => !existingIds.has(item.mediumId)
          );
          return [...prev, ...additions];
        });
      }
    } catch (err: any) {
      console.error(err);
      setError({
        message: `Unable to render ${targetLabel}: ${err.message}`,
      });
    } finally {
      setIsLoading(false);
      setLoadingStep("");
      setGeneratingMediumId(null);
    }
  };

  // Re-roll an individual medium
  const handleReroll = async (item: MockupItem) => {
    setRerollingId(item.id);
    setError(null);

    try {
      const referenceImage = !item.isReference ? getAnchorReference() : undefined;

      const response = await fetch("/api/generate-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription: item.productDescription,
          mediumId: item.mediumId,
          referenceImage,
          aspectRatio: item.aspectRatio,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const isQuota = data.isQuotaError || response.status === 429;
        setError({
          message: data.error || `Unable to re-render ${item.mediumName}.`,
          isQuota,
        });
        return;
      }

      if (data.warning) {
        setError({
          message: data.warning,
          isQuota: true,
        });
      }

      setMockups((prev) =>
        prev.map((m) => (m.id === item.id ? { ...data.item, id: item.id } : m))
      );
    } catch (err: any) {
      console.error(err);
      setError({
        message: `Unable to re-render ${item.mediumName}: ${err.message}`,
      });
    } finally {
      setRerollingId(null);
    }
  };

  // Change aspect ratio for an individual medium card without re-generating the entire set
  const handleChangeAspectRatio = async (item: MockupItem, newRatio: AspectRatio) => {
    if (item.aspectRatio === newRatio) return;
    setRerollingId(item.id);
    setError(null);

    // Optimistically update ratio in UI layout
    setMockups((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, aspectRatio: newRatio } : m))
    );

    try {
      const referenceImage = !item.isReference ? getAnchorReference() : undefined;

      const response = await fetch("/api/generate-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDescription: item.productDescription,
          mediumId: item.mediumId,
          referenceImage,
          aspectRatio: newRatio,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const isQuota = data.isQuotaError || response.status === 429;
        setError({
          message: data.error || `Unable to re-render ${item.mediumName} in ${newRatio}.`,
          isQuota,
        });
        return;
      }

      if (data.warning) {
        setError({
          message: data.warning,
          isQuota: true,
        });
      }

      setMockups((prev) =>
        prev.map((m) => (m.id === item.id ? { ...data.item, id: item.id } : m))
      );
    } catch (err: any) {
      console.error(err);
      setError({
        message: `Unable to re-render ${item.mediumName} in ${newRatio}: ${err.message}`,
      });
    } finally {
      setRerollingId(null);
    }
  };

  const handleDownloadAll = async () => {
    if (mockups.length === 0) return;
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("brand-mockups") || zip;

      for (let i = 0; i < mockups.length; i++) {
        const item = mockups[i];
        const cleanMedium = item.mediumId.replace(/_/g, "-");
        const num = String(i + 1).padStart(2, "0");

        if (item.imageUrl.startsWith("data:image/svg+xml")) {
          const svgContent = item.imageUrl.startsWith("data:image/svg+xml;utf8,")
            ? decodeURIComponent(item.imageUrl.replace("data:image/svg+xml;utf8,", ""))
            : atob(item.imageUrl.replace(/^data:image\/svg\+xml;base64,/, ""));
          folder.file(`${num}-${cleanMedium}.svg`, svgContent);
        } else if (item.imageUrl.startsWith("data:")) {
          const match = item.imageUrl.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            const mime = match[1];
            const data = match[2];
            const ext = mime.includes("jpeg") || mime.includes("jpg") ? "jpg" : "png";
            folder.file(`${num}-${cleanMedium}.${ext}`, data, { base64: true });
          }
        } else {
          const res = await fetch(item.imageUrl);
          const blob = await res.blob();
          folder.file(`${num}-${cleanMedium}.png`, blob);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `brand-mockups-${Date.now()}.zip`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } catch (err) {
      console.error("Bulk export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmNewProject = () => {
    setMockups([]);
    setSelectedMediums([]);
    setProductDescription("");
    setIsNewProjectModalOpen(false);
  };

  const handlePrimaryButtonClick = () => {
    if (mockups.length === 0) {
      handleGenerateAll();
    } else if (missingMediums.length > 0) {
      handleGenerateMissing();
    } else {
      handleGenerateAll();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 sm:px-10 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center space-x-6 sm:space-x-8">
          <button
            type="button"
            onClick={() => handleNavigate("studio")}
            className="flex items-center space-x-3 text-left cursor-pointer group"
          >
            <span className="font-bold tracking-tight text-lg text-gray-900 group-hover:text-black transition-colors">
              Brand Mockup Studio
            </span>
          </button>

          {/* Navigation links */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5" aria-label="Main navigation">
            <button
              type="button"
              id="nav-studio-btn"
              onClick={() => handleNavigate("studio")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentView === "studio"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Studio
            </button>
            <button
              type="button"
              id="nav-guide-btn"
              onClick={() => handleNavigate("guide")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === "guide"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>User Guide</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {currentView === "guide" ? (
            <button
              type="button"
              onClick={() => handleNavigate("studio")}
              className="text-xs text-gray-600 hover:text-black font-medium transition-colors cursor-pointer"
            >
              Back to Studio
            </button>
          ) : mockups.length > 0 ? (
            <button
              type="button"
              id="header-new-project-btn"
              onClick={() => setIsNewProjectModalOpen(true)}
              className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
              title="Reset and start a new project"
            >
              New project
            </button>
          ) : null}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-10 py-8 space-y-8">
        {currentView === "guide" ? (
          <UserGuide onBackToStudio={() => handleNavigate("studio")} />
        ) : (
          <>
            {/* Input Card */}
            <section className="w-full max-w-3xl mx-auto space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="product-input"
                className="block text-xs font-medium text-gray-700"
              >
                Product description
              </label>

              <textarea
                id="product-input"
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Matte black ceramic coffee dripper with a cork base, studio lighting"
                className="w-full bg-white border border-gray-200 rounded-lg p-4 text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black resize-none shadow-xs transition-all"
              />
            </div>

            {/* Medium Selector Buttons */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-gray-700">
                  Select mediums to display:
                </span>
                <div className="flex items-center gap-2">
                  <span>
                    {selectedMediums.length} of {AVAILABLE_MEDIUMS.length} selected
                  </span>
                  {selectedMediums.length < AVAILABLE_MEDIUMS.length ? (
                    <button
                      type="button"
                      onClick={() => setSelectedMediums(AVAILABLE_MEDIUMS.map((m) => m.id))}
                      className="text-xs text-gray-400 hover:text-black transition-colors cursor-pointer"
                    >
                      · Select all
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedMediums([])}
                      className="text-xs text-gray-400 hover:text-black transition-colors cursor-pointer"
                    >
                      · Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Clean interactive filter tabs without status pills or pulsing dots */}
              <div className="flex flex-wrap items-center gap-2">
                {AVAILABLE_MEDIUMS.map((med) => {
                  const isSelected = selectedMediums.includes(med.id);

                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => toggleMedium(med.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-black text-white font-medium shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
                      }`}
                    >
                      <span>{med.label}</span>
                      <span aria-hidden="true" className={isSelected ? "text-gray-400" : "text-gray-400"}>·</span>
                      <span className="font-mono text-[11px] opacity-80">{med.ratio}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {mockups.length > 0 ? (
                    missingMediums.length > 0 ? (
                      <span>
                        {missingMediums.length} medium ready to render with reference styling.
                      </span>
                    ) : (
                      <span>All selected mediums rendered.</span>
                    )
                  ) : (
                    <span>Select mediums above to control what appears in your collection.</span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Regenerate all button in control bar */}
                  {mockups.length > 0 && (
                    <button
                      type="button"
                      id="regenerate-all-btn"
                      onClick={() => handleGenerateAll()}
                      disabled={isLoading || !productDescription.trim() || selectedMediums.length === 0}
                      title="Generate a new set of all selected mediums"
                      className="inline-flex items-center justify-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isLoading && loadingStep.includes("initial") ? "animate-spin" : ""}`} />
                      <span>Regenerate All</span>
                    </button>
                  )}

                  {/* Primary Generate / Generate Missing Button */}
                  <button
                    type="button"
                    id="primary-generate-btn"
                    onClick={handlePrimaryButtonClick}
                    disabled={isLoading || !productDescription.trim() || selectedMediums.length === 0}
                    className="inline-flex items-center justify-center gap-1.5 bg-black text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Rendering...</span>
                      </>
                    ) : selectedMediums.length === 0 ? (
                      <span>Select Mediums</span>
                    ) : mockups.length === 0 ? (
                      <span>Create Mockups ({selectedMediums.length})</span>
                    ) : missingMediums.length > 0 ? (
                      <span>Create Missing ({missingMediums.length})</span>
                    ) : (
                      <span>Regenerate All</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clean helper line */}
          <div className="px-1 text-xs text-gray-500 flex items-center justify-between">
            <span>New mediums match the design and palette of your first mockup.</span>
            <span>Commercial layout resolution</span>
          </div>
        </section>

        {/* Loading State Banner */}
        {isLoading && (
          <div
            id="loading-banner"
            className="w-full max-w-3xl mx-auto rounded-xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col items-center justify-center text-center space-y-3"
          >
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
              <span className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{loadingStep}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Rendering selected mediums
              </p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div
            id="error-banner"
            className={`w-full max-w-3xl mx-auto rounded-xl border p-4 text-xs flex flex-col sm:flex-row items-start gap-3 transition-all shadow-xs ${
              error.isQuota
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg shrink-0 ${
                error.isQuota ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-xs text-inherit">
                  {error.isQuota ? "Offline Preview" : "Generation Notice"}
                </h4>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-gray-400 hover:text-black text-xs cursor-pointer ml-2"
                >
                  Dismiss
                </button>
              </div>

              <p className="text-xs leading-relaxed text-inherit opacity-90">{error.message}</p>
            </div>
          </div>
        )}

        {/* Mock-Up Collection Display */}
        {selectedMediums.length === 0 ? (
          <section className="w-full max-w-3xl mx-auto rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center flex flex-col items-center justify-center space-y-2 shadow-xs">
            <h3 className="text-sm font-semibold text-gray-800">
              No Mediums Selected
            </h3>
            <p className="text-xs text-gray-500 max-w-md">
              Select one or more mediums above to display them in this collection.
            </p>
          </section>
        ) : mockups.length > 0 || selectedMediums.length > 0 ? (
          <section className="space-y-6">
            {/* Clean collection header with bulk download action */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Mockup Collection
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {generatedSelectedCount} rendered · {missingMediums.length} pending · {selectedMediums.length} in collection
                </p>
              </div>

              <div className="flex items-center gap-3">
                {mockups.length > 0 && (
                  <button
                    type="button"
                    id="collection-bulk-download-btn"
                    onClick={handleDownloadAll}
                    disabled={isExporting}
                    title="Download all created mockups as a ZIP file"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Download className={`w-3.5 h-3.5 ${isExporting ? "animate-bounce" : ""}`} />
                    <span>{isExporting ? "Packaging ZIP..." : `Download All (${mockups.length})`}</span>
                  </button>
                )}
                <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                  {selectedMediums.length} active
                </span>
              </div>
            </div>

            {/* Grid of Mediums (only showing currently selected mediums) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedMediums.map((mId) => {
                const medDef = AVAILABLE_MEDIUMS.find((m) => m.id === mId)!;
                const existingItem = mockups.find((m) => m.mediumId === mId);

                if (existingItem) {
                  return (
                    <MockupCard
                      key={existingItem.id}
                      item={existingItem}
                      onExpand={(it) => setActiveLightboxItem(it)}
                      onReroll={handleReroll}
                      onChangeAspectRatio={handleChangeAspectRatio}
                      isRerolling={rerollingId === existingItem.id}
                    />
                  );
                }

                return (
                  <UngeneratedMediumCard
                    key={`ungenerated-${mId}`}
                    medium={medDef}
                    hasAnchor={mockups.length > 0}
                    anchorMediumName={anchorItem?.mediumName}
                    onGenerate={() => handleGenerateMissing(mId)}
                    isGenerating={isLoading && (generatingMediumId === mId || loadingStep.includes(medDef.label))}
                  />
                );
              })}
            </div>
          </section>
        ) : null}
          </>
        )}
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      {/* New Project Confirmation Modal */}
      <NewProjectConfirmModal
        isOpen={isNewProjectModalOpen}
        mockupsCount={mockups.length}
        isExporting={isExporting}
        onClose={() => setIsNewProjectModalOpen(false)}
        onConfirm={handleConfirmNewProject}
        onExportAll={handleDownloadAll}
      />

      {/* Clean Footer with User Guide Link */}
      <footer className="h-12 border-t border-gray-200 bg-white px-6 sm:px-10 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2 sm:gap-3">
          <span>© 2025 Brand Mockup Studio</span>
          <span aria-hidden="true" className="text-gray-300">·</span>
          <span className="hidden sm:inline">Commercial print and digital layouts</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavigate("guide")}
            className={`transition-colors cursor-pointer hover:text-black ${
              currentView === "guide" ? "font-semibold text-black" : "text-gray-500"
            }`}
          >
            User Guide
          </button>
        </div>
      </footer>
    </div>
  );
}
