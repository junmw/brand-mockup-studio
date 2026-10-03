import React from "react";
import {
  Sparkles,
  Layers,
  RefreshCw,
  SlidersHorizontal,
  Download,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  Compass,
  FileArchive,
  Maximize2,
} from "lucide-react";

interface UserGuideProps {
  onBackToStudio: () => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({ onBackToStudio }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Hero Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-medium tracking-wide uppercase">
            <Compass className="w-3.5 h-3.5 text-gray-500" />
            <span>User Documentation</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
            How Brand Mockup Studio Works
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            Create photorealistic, coordinated marketing campaigns across print, digital, and outdoor media while keeping your product's silhouette, packaging materials, and branding completely consistent.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToStudio}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>Back to Mockup Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Consistency Feature Callout */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl p-8 sm:p-10 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              The "Visual Anchor" Pipeline
            </h2>
            <p className="text-xs text-gray-400">
              Why your product looks identical across all mediums
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-300">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">1. The Primary Shot</span>
            <p className="text-gray-400 leading-relaxed">
              When you generate your campaign, the studio renders your primary medium first (typically the Billboard). This establishes the definitive visual baseline: the exact shape, material finish, label typography, and color palette.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">2. Context Passing</span>
            <p className="text-gray-400 leading-relaxed">
              The visual data from this primary shot is automatically passed forward to every other medium. The model is instructed to preserve the identical manufactured product while adapting only the advertising environment.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">3. Cohesive Campaign</span>
            <p className="text-gray-400 leading-relaxed">
              Whether your product appears printed on grainy morning newsprint, inside an illuminated underground subway poster, or on a glossy magazine spread, the packaging and logo stay strictly synchronized.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Step-by-Step Workflow
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Everything you need to know from initial idea to final presentation
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                1
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Describe Your Product & Select Mediums
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Enter a clear description of your product in the text area. You can also click any of the preset pills (such as <em>Matte Obsidian Coffee Dripper</em> or <em>Brutalist Concrete Scent Diffuser</em>) for inspiration. Toggle the checkboxes for the mediums you want to include in your collection.
            </p>
            <div className="pl-10 pt-1">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-[11px] text-gray-600 space-y-1">
                <span className="font-semibold text-gray-800 block">💡 Pro Tip for Best Results:</span>
                <p>
                  Include specific details like materials (e.g., <em>matte black anodized aluminum, fluted amber glass, embossed gold foil</em>), form factors, and typography hints. The clearer your product's physical identity, the sharper the mockups will be.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                2
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Generate the Campaign
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Click the black <strong>"Generate Mockup Collection"</strong> button. The studio will render the primary reference mockup first and then smoothly generate the rest of your selected mediums. During generation, real-time status messages show which layout is currently in progress.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                3
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Add Additional Formats Later (Without Restarting)
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Already rendered three formats and now realize you also need a Subway Poster or Magazine Ad? Simply check the box for the additional medium. An "ungenerated card" placeholder will appear in your collection. Click <strong>"Generate this mockup"</strong> to render it using your existing product reference, without re-running any of your finished images.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                4
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Re-roll (Regenerate) an Individual Medium
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              If you want an alternate angle, lighting variation, or composition for a specific medium, click the circular <RefreshCw className="w-3.5 h-3.5 inline mx-1 text-gray-600" /> <strong>Refresh</strong> button on that card's header bar. Only that single medium will re-render, keeping your product style locked and the rest of your collection untouched.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                5
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Adjust Aspect Ratios Per Medium
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Need your Social Post formatted for Instagram Stories (9:16) instead of a square feed (1:1)? Click the <SlidersHorizontal className="w-3.5 h-3.5 inline mx-1 text-gray-600" /> <strong>Settings</strong> button or the dotted aspect ratio badge on the card. Choose from <strong>16:9, 4:3, 1:1, 3:4, or 9:16</strong>. The medium will immediately re-render in the new dimension without modifying any other cards.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                6
              </span>
              <h3 className="text-sm font-semibold text-gray-900">
                Review in Fullscreen & Bulk Export
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Click any image or the <Maximize2 className="w-3.5 h-3.5 inline mx-1 text-gray-600" /> expand icon to open a high-resolution lightbox preview. To download all your assets at once, click <strong>"Download All (#)"</strong> on the Mockup Collection bar. All rendered mockups will be neatly packaged into a single organized <code>.zip</code> file with numbered filenames.
            </p>
          </div>
        </div>
      </section>

      {/* Mediums Breakdown Table */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Available Commercial Mediums
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="py-2.5 font-medium">Medium</th>
                <th className="py-2.5 font-medium">Default Ratio</th>
                <th className="py-2.5 font-medium">Advertising Environment</th>
                <th className="py-2.5 font-medium">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 font-semibold text-gray-900">Billboard</td>
                <td className="py-3 font-mono text-gray-500">16:9</td>
                <td className="py-3">Massive outdoor highway display with skyline golden hour backdrop</td>
                <td className="py-3">Large-scale outdoor campaigns & pitch decks</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-gray-900">Newspaper</td>
                <td className="py-3 font-mono text-gray-500">3:4</td>
                <td className="py-3">Broadsheet print with authentic halftone texture and editorial copy</td>
                <td className="py-3">Print advertising & luxury press announcements</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-gray-900">Social Post</td>
                <td className="py-3 font-mono text-gray-500">1:1</td>
                <td className="py-3">Edge-to-edge square creative (no fake phone screens or hand overlays)</td>
                <td className="py-3">Digital marketing, Instagram feed, web display</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-gray-900">Subway Poster</td>
                <td className="py-3 font-mono text-gray-500">3:4</td>
                <td className="py-3">Illuminated metro station lightbox with ceramic tile reflections</td>
                <td className="py-3">Transit advertising & urban market rollouts</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-gray-900">Magazine Ad</td>
                <td className="py-3 font-mono text-gray-500">4:3</td>
                <td className="py-3">Glossy lifestyle editorial spread open on a marble desk</td>
                <td className="py-3">High-end retail, fashion, and lifestyle branding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Troubleshooting & Tips */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Troubleshooting & Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Quick solutions to common questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Why am I seeing an "Offline Preview" banner?</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              If the Gemini AI generation quota is temporarily exhausted or a billing-enabled API key has not been configured in Secrets, the app gracefully switches to handcrafted, high-fidelity SVG preview mockups. You can still test layouts, download mockups, and export ZIPs without disruption.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Will clicking "New project" erase my images?</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Yes, starting a new project clears memory to begin a fresh campaign. To protect your work, a safety confirmation dialog will appear warning you before any deletion occurs, and provides a convenient button to download all current mockups as a ZIP file first.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Why are there no people in any of the mockups?</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Brand Mockup Studio strictly enforces commercial inanimate photography directives (no people, faces, or hands). This ensures the viewer's focus remains 100% on the product and prevents the uncanny artifacts typical of generic AI stock imagery.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>How can I make the product appearance even more specific?</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Specify distinctive branding elements in your description: a brand name, color palette (e.g., <em>matte charcoal and copper</em>), container type (e.g., <em>heavyweight minimalist pump bottle with serif label</em>), and packaging finish. The primary shot will render these features, and the anchor pipeline will faithfully preserve them in every other medium.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Return CTA */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-gray-900">
          Ready to launch your commercial campaign?
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Head back to the studio to describe your product and render high-resolution commercial layouts across print and digital media.
        </p>
        <button
          type="button"
          onClick={onBackToStudio}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <span>Open Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
