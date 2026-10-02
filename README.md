# Brand Mockup Studio

> Create photorealistic, multi-channel commercial campaigns across print, digital, and outdoor media — while keeping your product's design, label, and materials strictly consistent.

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-3.1_Flash_Image-orange.svg)](https://ai.google.dev/)

---

## Why this exists

If you've ever put together a brand pitch, agency deck, or launch deck for a physical product, you know the drill:

1. You scour the web for five different Photoshop mockup templates.
2. You wrestle with smart objects, conflicting perspective grids, and mismatched lighting setups.
3. By the end of the day, your product looks like a completely different item on the billboard than it does in the magazine ad.

**Brand Mockup Studio** solves this. You describe your product once (or pick one of the curated starter concepts), and it generates a cohesive commercial rollout across billboards, morning broadsheets, subway lightboxes, magazine spreads, and square social media posts.

Best of all, it locks your product's silhouette, packaging finish, branding, and colorway across every single format.

---

## Highlights

### 🎯 True Cross-Medium Brand Consistency
The hardest part about generative imagery in marketing is character/product consistency. Brand Mockup Studio uses an **Anchor Reference Pipeline**:
- The primary medium (e.g. the Highway Billboard) is generated first to establish the product's visual identity — shape, material, label layout, and colorway.
- That visual signature is automatically passed into subsequent generations as a visual anchor. Your obsidian dripper or cold brew can looks like the exact same manufactured item whether it's printed on grainy newsprint or illuminated behind subway glass.

### 🚫 Strict Commercial Discipline (No People, No Distractions)
Stock mockups often suffer from awkward hands or uncanny AI humans holding things. Every prompt in Brand Mockup Studio enforces strict negative directives: strictly inanimate commercial advertising environments with zero human distractions. The spotlight stays entirely on your product.

### 📐 In-Card Aspect Ratio Switching
Want your billboard in 16:9, but need the magazine ad in 4:3 and the social post in 1:1 or 9:16? 
You can switch aspect ratios directly inside any card's settings drawer (`16:9`, `4:3`, `1:1`, `3:4`, `9:16`). Toggling the ratio re-renders **only that specific card**, keeping the rest of your mockups untouched.

### 📦 1-Click Bulk ZIP Export
Export your entire collection in a single click. Every generated image is packaged into a clean `.zip` archive with organized sequential filenames (e.g., `01-billboard.png`, `02-newspaper.png`), ready to drop into Figma, Keynote, or your pitch deck.

### 🛡️ Accidental Reset Protection
The "New project" action includes a confirmation safeguard. It lets you know how many rendered mockups will be cleared and offers a quick "Download ZIP first" shortcut so you never lose good work by mistake.

### ⚡ Offline Sample Mockup Engine
Running low on API quota or working offline? The studio automatically falls back to lightweight, handcrafted SVG preview mockups complete with realistic broadsheet halftone textures, subway reflections, and billboard night skylines.

---

## Supported Advertising Mediums

| Medium | Native Ratio | Description |
| :--- | :---: | :--- |
| **Highway Billboard** | `16:9` | Massive outdoor roadside display high above a modern metropolis at golden hour. |
| **Morning Broadsheet** | `3:4` | Authentic newsprint texture, full-column editorial print layout, ink grain, and paper folds. |
| **Social Media Creative** | `1:1` | Clean, edge-to-edge square digital commercial creative ready for feeds (no phone bezels or fake screen frames). |
| **Subway Lightbox** | `3:4` | Backlit underground metro wall display with ambient platform reflections and ceramic tile architecture. |
| **Magazine Ad** | `4:3` | Glossy luxury lifestyle publication two-page editorial spread on a marble desk. |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/brand-mockup-studio.git
   cd brand-mockup-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## Available Scripts

- `npm run dev` — Starts the Express backend and Vite development server on port 3000.
- `npm run build` — Builds the Vite client application and bundles `server.ts` into `dist/server.cjs` via esbuild.
- `npm run start` — Runs the compiled production server.
- `npm run lint` — Runs TypeScript type-checking without emitting files.

---

## How It Works (Architecture)

```
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│  - Medium Selector & Interactive Aspect Ratio Toggles  │
│  - Mockup Collection Grid & In-Card Settings Drawers   │
│  - Lightbox Zoom Modal & JSZip Bulk Downloader         │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP JSON API
┌───────────────────────────▼────────────────────────────┐
│                    Express Backend                     │
│  - /api/generate-all     (Batch with Anchor Passing)   │
│  - /api/generate-single  (Targeted Rerolls & Ratios)   │
│  - /api/generate-missing (On-demand additions)         │
└───────────────────────────┬────────────────────────────┘
                            │ @google/genai SDK
┌───────────────────────────▼────────────────────────────┐
│          Google Gemini (gemini-3.1-flash-image)        │
│  - High-fidelity commercial product visualization     │
│  - Multimodal anchor reference conditioning            │
│  - Aspect ratio-guided image generation                │
└────────────────────────────────────────────────────────┘
```

1. **Initial Anchor Request**: When you click **"Generate Mockup Collection"**, the backend generates the first medium.
2. **Visual Continuity Passing**: The returned image bytes from the primary shot are passed into the subsequent API calls as multimodal reference context alongside strict brand preservation directives.
3. **Targeted Updates**: When rerolling an individual card or toggling its aspect ratio, only that card communicates with `/api/generate-single`, reusing the existing product anchor to keep the campaign uniform.

---

## Tech Stack

- **UI & Framework**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Packaging & Archiving**: [JSZip](https://stuk.github.io/jszip/)
- **Server**: [Express](https://expressjs.com/) with Vite middleware
- **AI Model**: Google Gemini (`gemini-3.1-flash-image`) via `@google/genai`

---

## Contributing

Contributions, feedback, and ideas for new mediums (bus shelters, packaging boxes, store windows) are very welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingMedium`)
3. Commit your Changes (`git commit -m 'Add AmazingMedium preset'`)
4. Push to the Branch (`git push origin feature/AmazingMedium`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. Feel free to adapt and build on top of this for your own commercial or personal projects.
