import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { createSampleMockups, createSingleSampleMockup } from "./src/sampleMockups";

dotenv.config();

// ponytail: lazy initialization prevents dev-server boot crashes if key is injected after start
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Configure your API key in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Nano-Banana 2 model alias from Gemini API specification (Gemini 3.1 Flash Image)
const NANO_BANANA_MODEL = "gemini-3.1-flash-image";

const MEDIUM_CONFIGS: Record<
  string,
  {
    name: string;
    aspectRatio: "16:9" | "1:1" | "3:4" | "4:3";
    prompt: string;
  }
> = {
  billboard: {
    name: "Billboard",
    aspectRatio: "16:9",
    prompt:
      "A massive outdoor highway advertising billboard high above a modern metropolis at golden hour. The billboard prominently displays the product in crisp, photorealistic commercial advertising clarity against a clean sky.",
  },
  newspaper: {
    name: "Newspaper",
    aspectRatio: "3:4",
    prompt:
      "A printed morning broadsheet newspaper spread open flat on a clean minimalist wooden table. A dedicated full-column printed advertisement features the product with sharp printed ink texture, newsprint paper grain, and editorial typography.",
  },
  social_post: {
    name: "Social Post",
    aspectRatio: "1:1",
    prompt:
      "A high-end 1:1 square digital commercial product advertisement designed directly for a social media feed. The entire image is the social post creative itself: clean studio product photography with balanced composition, diffused commercial lighting, rich textures, and editorial brand presence. Do NOT depict a smartphone, phone screen, mobile device, desk setting with a phone, or social app interface chrome; the full 1:1 canvas is the published social creative asset.",
  },
  subway_poster: {
    name: "Subway Poster",
    aspectRatio: "3:4",
    prompt:
      "An illuminated underground metro station wall advertising lightbox poster. The backlit display showcases the product with vivid commercial reflections against clean ceramic tiled subway architecture.",
  },
  magazine: {
    name: "Magazine Ad",
    aspectRatio: "4:3",
    prompt:
      "A glossy luxury lifestyle magazine two-page print advertisement spread open on a marble desk. High-gloss paper sheen, razor-sharp commercial product layout, and minimalist editorial design.",
  },
};

const NO_PEOPLE_CONSTRAINT =
  "STRICT NEGATIVE DIRECTIVE: Absolutely NO people, NO humans, NO faces, NO hands, NO fingers, NO body parts, NO pedestrians, NO crowds, NO silhouettes anywhere in the scene. Zero human presence. Display only the inanimate medium and the product itself.";

async function generateMediumImage(
  productDescription: string,
  mediumId: string,
  referenceImage?: { data: string; mimeType: string },
  overrideAspectRatio?: "16:9" | "1:1" | "3:4" | "4:3" | "9:16"
): Promise<{ base64Data: string; mimeType: string; imageUrl: string }> {
  const ai = getGenAI();
  const config = MEDIUM_CONFIGS[mediumId] || MEDIUM_CONFIGS["billboard"];
  const finalAspectRatio = overrideAspectRatio || config.aspectRatio;

  const mediumSpecificDirective =
    mediumId === "social_post"
      ? "CRITICAL FORMAT CONSTRAINT: This image must be the actual 1:1 square social media graphic asset itself. Do NOT frame it inside a smartphone, phone screen, hand, mobile device, or social app UI chrome. The commercial product advertisement itself must occupy the entire 1:1 square frame edge-to-edge."
      : "";

  const parts: Array<{ inlineData?: { data: string; mimeType: string }; text?: string }> = [];

  if (referenceImage && referenceImage.data) {
    // ponytail: pass original product image to maintain exact visual brand consistency across shots
    parts.push({
      inlineData: {
        data: referenceImage.data,
        mimeType: referenceImage.mimeType || "image/png",
      },
    });
    parts.push({
      text: `Context: You are creating a commercial advertisement for the EXACT same product shown in this reference image.
Target Medium: ${config.prompt} (Display format aspect ratio: ${finalAspectRatio})
Product: "${productDescription}".
Requirement: You MUST keep the product design strictly consistent with the reference image (identical shape, label branding, typography, color palette, logo, and packaging material).
${NO_PEOPLE_CONSTRAINT}
${mediumSpecificDirective}`,
    });
  } else {
    // Base primary shot
    parts.push({
      text: `Commercial advertisement photograph of the following product: "${productDescription}".
Target Medium: ${config.prompt} (Display format aspect ratio: ${finalAspectRatio})
High-end commercial advertising photography, photorealistic textures, studio quality lighting.
${NO_PEOPLE_CONSTRAINT}
${mediumSpecificDirective}`,
    });
  }

  const response = await ai.models.generateContent({
    model: NANO_BANANA_MODEL,
    contents: { parts },
    config: {
      imageConfig: {
        aspectRatio: finalAspectRatio,
      },
    },
  });

  let base64Data = "";
  let mimeType = "image/png";

  const candidates = response.candidates || [];
  if (candidates.length > 0 && candidates[0].content?.parts) {
    for (const part of candidates[0].content.parts) {
      if (part.inlineData?.data) {
        base64Data = part.inlineData.data;
        if (part.inlineData.mimeType) {
          mimeType = part.inlineData.mimeType;
        }
        break;
      }
    }
  }

  if (!base64Data) {
    const errorText = candidates[0]?.content?.parts?.find((p) => p.text)?.text || "No image returned by model";
    throw new Error(`Nano-Banana generation failed: ${errorText}`);
  }

  return {
    base64Data,
    mimeType,
    imageUrl: `data:${mimeType};base64,${base64Data}`,
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", model: NANO_BANANA_MODEL });
  });

  // Single shot generation (supports optional referenceImage and custom aspectRatio)
  app.post("/api/generate-single", async (req, res) => {
    let productDescription = "";
    let targetMedium = "billboard";

    try {
      const { productDescription: pDesc, mediumId, referenceImage, aspectRatio } = req.body;
      if (!pDesc || typeof pDesc !== "string") {
        res.status(400).json({ error: "Product description is required." });
        return;
      }
      productDescription = pDesc;
      targetMedium = mediumId || "billboard";
      const config = MEDIUM_CONFIGS[targetMedium] || MEDIUM_CONFIGS["billboard"];

      const targetAspectRatio: "16:9" | "1:1" | "3:4" | "4:3" | "9:16" =
        aspectRatio && ["16:9", "1:1", "3:4", "4:3", "9:16"].includes(aspectRatio)
          ? aspectRatio
          : config.aspectRatio;

      const result = await generateMediumImage(productDescription, targetMedium, referenceImage, targetAspectRatio);
      res.json({
        item: {
          id: `${targetMedium}-${Date.now()}`,
          mediumId: targetMedium,
          mediumName: config.name,
          aspectRatio: targetAspectRatio,
          imageUrl: result.imageUrl,
          base64Data: result.base64Data,
          mimeType: result.mimeType,
          productDescription,
          isReference: !referenceImage,
          createdAt: Date.now(),
        },
      });
    } catch (err: any) {
      const errStr = String(err?.message || "") + " " + JSON.stringify(err || "");
      const isQuotaOrCredits =
        err?.status === 429 ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("Quota exceeded") ||
        errStr.includes("depleted");

      if (isQuotaOrCredits) {
        console.log("Single generation API limit reached, using preview mockup fallback.");
        const fallbackItem = createSingleSampleMockup(productDescription, targetMedium, req.body.aspectRatio);
        const warning = "API quota limit reached. An offline preview mockup is displayed. Configure a billing-enabled Gemini API key in Settings > Secrets for live generation.";
        res.json({
          item: fallbackItem,
          isPreview: true,
          warning,
        });
        return;
      }

      console.log("Single generation error:", err?.message || err);
      res.status(500).json({ error: err?.message || "Failed to generate mockup." });
    }
  });

  // Batch generation: Generates billboard first, uses as visual reference for newspaper and social post
  app.post("/api/generate-all", async (req, res) => {
    let mediumsToGenerate: string[] = ["billboard", "newspaper", "social_post"];
    let prodDesc = "";

    try {
      const { productDescription, mediumIds } = req.body;
      if (!productDescription || typeof productDescription !== "string") {
        res.status(400).json({ error: "Product description is required." });
        return;
      }
      prodDesc = productDescription;

      mediumsToGenerate =
        Array.isArray(mediumIds) && mediumIds.length > 0
          ? mediumIds
          : ["billboard", "newspaper", "social_post"];

      // 1. Generate primary medium (first one) as the anchor product reference
      const primaryMedium = mediumsToGenerate[0];
      const primaryConfig = MEDIUM_CONFIGS[primaryMedium] || MEDIUM_CONFIGS["billboard"];
      const primaryResult = await generateMediumImage(productDescription, primaryMedium);

      const items = [
        {
          id: `${primaryMedium}-${Date.now()}`,
          mediumId: primaryMedium,
          mediumName: primaryConfig.name,
          aspectRatio: primaryConfig.aspectRatio,
          imageUrl: primaryResult.imageUrl,
          base64Data: primaryResult.base64Data,
          mimeType: primaryResult.mimeType,
          productDescription,
          isReference: true,
          createdAt: Date.now(),
        },
      ];

      const refData = {
        data: primaryResult.base64Data,
        mimeType: primaryResult.mimeType,
      };

      // 2. Generate remaining mediums passing primary image as reference for product consistency
      const remainingMediums = mediumsToGenerate.slice(1);
      const remainingResults = await Promise.allSettled(
        remainingMediums.map(async (mId) => {
          const cfg = MEDIUM_CONFIGS[mId] || MEDIUM_CONFIGS["billboard"];
          const resImg = await generateMediumImage(productDescription, mId, refData);
          return {
            id: `${mId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            mediumId: mId,
            mediumName: cfg.name,
            aspectRatio: cfg.aspectRatio,
            imageUrl: resImg.imageUrl,
            base64Data: resImg.base64Data,
            mimeType: resImg.mimeType,
            productDescription,
            isReference: false,
            createdAt: Date.now(),
          };
        })
      );

      for (const result of remainingResults) {
        if (result.status === "fulfilled") {
          items.push(result.value);
        } else {
          console.log("Secondary shot generation notice:", result.reason?.message || result.reason);
        }
      }

      res.json({ items });
    } catch (err: any) {
      const errStr = String(err?.message || "") + " " + JSON.stringify(err || "");
      const isQuotaOrCredits =
        err?.status === 429 ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("Quota exceeded") ||
        errStr.includes("depleted");

      if (isQuotaOrCredits) {
        console.log("Batch generation API limit reached, using preview mockup fallback.");
        const fallbackItems = createSampleMockups(prodDesc || "Matte Black Ceramic Coffee Dripper").filter((item) =>
          mediumsToGenerate.includes(item.mediumId)
        );
        const warning = "API quota limit reached. Offline preview mockups are displayed. Configure a billing-enabled Gemini API key in Settings > Secrets for live generation.";

        res.json({
          items: fallbackItems.length > 0 ? fallbackItems : createSampleMockups(prodDesc || "Matte Black Ceramic Coffee Dripper"),
          isPreview: true,
          warning,
        });
        return;
      }

      console.log("Batch generation error:", err?.message || err);
      res.status(500).json({ error: err?.message || "Failed to generate mockups." });
    }
  });

  // Generate missing mediums referencing an existing anchor image
  app.post("/api/generate-missing", async (req, res) => {
    let missingMediums: string[] = [];
    let prodDesc = "";

    try {
      const { productDescription, mediumIds, referenceImage } = req.body;
      if (!productDescription || typeof productDescription !== "string") {
        res.status(400).json({ error: "Product description is required." });
        return;
      }
      prodDesc = productDescription;
      missingMediums = Array.isArray(mediumIds) ? mediumIds : [];

      if (missingMediums.length === 0) {
        res.json({ items: [] });
        return;
      }

      const items: any[] = [];
      const refData = referenceImage && referenceImage.data ? referenceImage : undefined;

      const results = await Promise.allSettled(
        missingMediums.map(async (mId) => {
          const cfg = MEDIUM_CONFIGS[mId] || MEDIUM_CONFIGS["billboard"];
          const resImg = await generateMediumImage(productDescription, mId, refData);
          return {
            id: `${mId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            mediumId: mId,
            mediumName: cfg.name,
            aspectRatio: cfg.aspectRatio,
            imageUrl: resImg.imageUrl,
            base64Data: resImg.base64Data,
            mimeType: resImg.mimeType,
            productDescription,
            isReference: false,
            createdAt: Date.now(),
          };
        })
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          items.push(result.value);
        } else {
          console.log("Missing medium generation notice:", result.reason?.message || result.reason);
        }
      }

      res.json({ items });
    } catch (err: any) {
      const errStr = String(err?.message || "") + " " + JSON.stringify(err || "");
      const isQuotaOrCredits =
        err?.status === 429 ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("Quota exceeded") ||
        errStr.includes("depleted");

      if (isQuotaOrCredits) {
        console.log("Missing mediums generation API limit reached, using preview mockup fallback.");
        const fallbackItems = createSampleMockups(prodDesc || "Matte Black Ceramic Coffee Dripper").filter((item) =>
          missingMediums.includes(item.mediumId)
        );
        const warning = "API quota limit reached. Offline preview mockups are displayed. Configure a billing-enabled Gemini API key in Settings > Secrets for live generation.";

        res.json({
          items: fallbackItems,
          isPreview: true,
          warning,
        });
        return;
      }

      console.log("Missing generation error:", err?.message || err);
      res.status(500).json({ error: err?.message || "Failed to generate missing mockups." });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Brand Mock-Up server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
