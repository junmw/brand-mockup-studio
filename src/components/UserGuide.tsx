import React from "react";
import {
  Sparkles,
  Layers,
  RefreshCw,
  SlidersHorizontal,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
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
            <span>User Guide</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
            How Brand Mockup Studio Works
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            Brand Mockup Studio creates product advertising mockups across
            print, digital, and outdoor formats. The first mockup in a
            collection becomes the visual reference for later generations,
            which helps keep product details more consistent between images.
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
              How the Reference Image Works
            </h2>

            <p className="text-xs text-gray-400">
              Using the first mockup as context for the rest of the collection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-300">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">
              1. Create the First Mockup
            </span>

            <p className="text-gray-400 leading-relaxed">
              The first medium you select is generated without a reference
              image. That result becomes the visual reference for the rest of
              the collection.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">
              2. Reuse It as Context
            </span>

            <p className="text-gray-400 leading-relaxed">
              When the remaining formats are generated, the first image is
              sent back to the model along with your product description and
              instructions for the new format.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="font-semibold text-white block text-sm">
              3. Reduce Visual Drift
            </span>

            <p className="text-gray-400 leading-relaxed">
              The reference gives the model more context for details such as
              shape, packaging, color, typography, and materials. Results can
              still vary between generations, but the reference helps keep the
              collection more consistent.
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
            From the first product description to a finished collection
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
                Describe Your Product and Choose Formats
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Enter a description of the product you want to visualize. Then
              select one or more formats from the medium buttons. Brand Mockup
              Studio currently supports Billboard, Newspaper, Social Post,
              Subway Poster, and Magazine Ad.
            </p>

            <div className="pl-10 pt-1">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-[11px] text-gray-600 space-y-1">
                <span className="font-semibold text-gray-800 block">
                  Tip for better results
                </span>

                <p>
                  Include the details that matter most to the product's
                  appearance, such as materials, colors, packaging, shape, or
                  typography. For example, instead of{" "}
                  <em>black coffee dripper</em>, you might use{" "}
                  <em>
                    matte black ceramic coffee dripper with a cork base and
                    minimal white branding
                  </em>
                  .
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
                Create Your Mockups
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Select <strong>Create Mockups</strong> to start generating the
              collection. The first selected medium is created first and
              becomes the visual reference for the remaining formats. The
              status message will update while the collection is being
              generated.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                3
              </span>

              <h3 className="text-sm font-semibold text-gray-900">
                Add Another Format Later
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              You do not need to regenerate the whole collection if you
              decide you need another format. Select an additional medium and
              an empty card will appear for it. Choose{" "}
              <strong>Create [Medium]</strong> to generate the new mockup using
              the existing reference image.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                4
              </span>

              <h3 className="text-sm font-semibold text-gray-900">
                Regenerate One Mockup
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              If you want to try a different composition or variation, select
              the circular{" "}
              <RefreshCw className="w-3.5 h-3.5 inline mx-1 text-gray-600" />{" "}
              <strong>Refresh</strong> button on that mockup. Only that format
              is regenerated. The rest of the collection remains unchanged.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                5
              </span>

              <h3 className="text-sm font-semibold text-gray-900">
                Change an Aspect Ratio
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Select the{" "}
              <SlidersHorizontal className="w-3.5 h-3.5 inline mx-1 text-gray-600" />{" "}
              <strong>Settings</strong> button or the aspect-ratio label on a
              mockup to choose a different size. Available ratios are{" "}
              <strong>16:9, 4:3, 1:1, 3:4, and 9:16</strong>. Changing the
              ratio regenerates that mockup without rebuilding the rest of
              the collection.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-800 text-xs font-bold shrink-0">
                6
              </span>

              <h3 className="text-sm font-semibold text-gray-900">
                Preview and Download Your Work
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pl-10">
              Select an image or the{" "}
              <Maximize2 className="w-3.5 h-3.5 inline mx-1 text-gray-600" />{" "}
              expand icon to open a larger preview. You can download an
              individual mockup from its card or select{" "}
              <strong>Download All</strong> to package the current collection
              into a ZIP file.
            </p>
          </div>
        </div>
      </section>

      {/* Mediums Breakdown Table */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Available Formats
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400">
                <th className="py-2.5 font-medium">Medium</th>
                <th className="py-2.5 font-medium">Default Ratio</th>
                <th className="py-2.5 font-medium">Output</th>
                <th className="py-2.5 font-medium">Useful For</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td className="py-3 font-semibold text-gray-900">
                  Billboard
                </td>
                <td className="py-3 font-mono text-gray-500">16:9</td>
                <td className="py-3">Outdoor billboard presentation</td>
                <td className="py-3">
                  Outdoor campaigns and presentation concepts
                </td>
              </tr>

              <tr>
                <td className="py-3 font-semibold text-gray-900">
                  Newspaper
                </td>
                <td className="py-3 font-mono text-gray-500">3:4</td>
                <td className="py-3">Printed newspaper advertisement</td>
                <td className="py-3">
                  Print advertising and editorial concepts
                </td>
              </tr>

              <tr>
                <td className="py-3 font-semibold text-gray-900">
                  Social Post
                </td>
                <td className="py-3 font-mono text-gray-500">1:1</td>
                <td className="py-3">Square digital advertising creative</td>
                <td className="py-3">
                  Social media and digital campaign concepts
                </td>
              </tr>

              <tr>
                <td className="py-3 font-semibold text-gray-900">
                  Subway Poster
                </td>
                <td className="py-3 font-mono text-gray-500">3:4</td>
                <td className="py-3">Transit poster presentation</td>
                <td className="py-3">
                  Transit and urban advertising concepts
                </td>
              </tr>

              <tr>
                <td className="py-3 font-semibold text-gray-900">
                  Magazine Ad
                </td>
                <td className="py-3 font-mono text-gray-500">4:3</td>
                <td className="py-3">Magazine advertising spread</td>
                <td className="py-3">
                  Editorial, retail, and lifestyle concepts
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Troubleshooting & Tips */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Troubleshooting and Common Questions
          </h2>

          <p className="text-xs text-gray-500 mt-0.5">
            A few things to know while using the Studio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Why am I seeing an "Offline Preview" message?</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              If the Gemini image-generation quota is unavailable, Brand
              Mockup Studio can substitute local SVG preview images so you can
              continue testing the interface and export workflow. Live image generation requires a configured Gemini API key and available quota..
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Will starting a new project remove my images?</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Yes. Starting a new project clears the current mockups, product
              description, and selected formats. A confirmation window appears
              first and gives you the option to download the current
              collection as a ZIP before resetting.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Why are there no people in the mockups?</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              The generation prompts ask the model to avoid people, faces, and
              hands so the product remains the focus of the image. As with
              other generative AI instructions, results may occasionally
              vary.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>How can I make the product appearance more specific?</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Add the details that matter most to the product's identity,
              such as its shape, materials, colors, packaging, brand name, or
              typography. Those details are used when creating the first
              mockup, which then serves as the visual reference for the rest
              of the collection.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Return CTA */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-gray-900">
          Ready to create a collection?
        </h3>

        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Return to the Studio to describe your product, select your formats,
          and create your first mockups.
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