# Brand Mockup Studio

Brand Mockup Studio generates a set of product advertising mockups from a single product description. It can render the same product across billboards, newspapers, social posts, subway displays, and magazine spreads while using the first generated image as a visual reference for the rest of the set.

The project started from a simple problem: generating one product image is easy, but generating several campaign assets without the product changing between images is much harder. Brand Mockup Studio uses a reference-image workflow to keep the product's shape, label, colors, and materials closer to the original generation as it moves between formats.

<img width="1099" height="641" alt="Screenshot 2026-10-02 005245" src="https://github.com/user-attachments/assets/b8e99fe0-e358-41c3-a82a-0e5aadf63791" />

## Features

- Generate mockups for five advertising formats:
  - Billboard
  - Newspaper
  - Social post
  - Subway poster
  - Magazine ad
- Use the first generated image as a visual reference for later generations
- Generate only the formats you select
- Add missing formats without rebuilding the entire collection
- Reroll individual mockups
- Change an individual mockup's aspect ratio
- Preview images in a larger lightbox
- Download the full collection as a ZIP
- Fall back to local SVG preview mockups when the Gemini API quota is unavailable
- Confirm before clearing an existing project

## How it works

The generation flow is built around an anchor image.

When a collection is created, the first selected format is generated without a reference image. That result becomes the visual anchor for the rest of the collection.

The backend then passes the anchor image to subsequent Gemini requests along with the product description and instructions for the requested advertising format. This gives the model visual context for details such as packaging, typography, color, and material.

```text
Product description
        │
        ▼
Generate first selected medium
        │
        ▼
Use result as anchor image
        │
        ├──► Billboard
        ├──► Newspaper
        ├──► Social post
        ├──► Subway poster
        └──► Magazine ad
```

Individual mockups can also be regenerated without rebuilding the entire set. When possible, those requests reuse the existing anchor image.

## Supported formats

| Format | Default aspect ratio |
| --- | --- |
| Billboard | `16:9` |
| Newspaper | `3:4` |
| Social post | `1:1` |
| Subway poster | `3:4` |
| Magazine ad | `4:3` |

Individual cards can also be regenerated in `16:9`, `4:3`, `1:1`, `3:4`, or `9:16`.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Express
- Google Gemini via `@google/genai`
- JSZip
- Lucide React
- Motion

## Architecture

The application uses a React frontend and an Express server.

```text
React frontend
     │
     │ HTTP / JSON
     ▼
Express API
     │
     │ @google/genai
     ▼
Google Gemini image generation
```

The backend exposes three main generation routes:

- `POST /api/generate-all` — creates a new collection and uses the first image as the reference for the remaining formats
- `POST /api/generate-single` — regenerates one mockup or changes its aspect ratio
- `POST /api/generate-missing` — adds formats to an existing collection while reusing its anchor image

If Gemini returns a quota-related error, the server returns locally generated SVG preview mockups instead. This keeps the interface usable even when live image generation is unavailable.

## Getting started

### Requirements

- Node.js 18+
- Google Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/junmw/brand-mockup-studio.git
cd brand-mockup-studio
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your Gemini API key:

```env
GEMINI_API_KEY="your-gemini-api-key"
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Starts the Express server with Vite running as development middleware.

```bash
npm run build
```

Builds the Vite frontend and bundles the Express server for production.

```bash
npm run start
```

Runs the production server.

```bash
npm run lint
```

Runs the TypeScript compiler without emitting files.

## Project structure

```text
brand-mockup-studio/
├── public/
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   ├── sampleMockups.ts
│   └── types.ts
├── .env.example
├── server.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## What I focused on

The main technical problem I wanted to explore was consistency across AI-generated images.

Generating each advertising format independently would give the model no visual knowledge of what it generated previously. Instead, the application generates one image first and sends that image back with later requests as multimodal context.

I also kept generation granular. Adding another format, changing an aspect ratio, or rerolling one result does not require rebuilding the whole collection.

The offline preview system handles another practical problem: image-generation APIs have quotas and can fail. When the server detects a quota-related response, it can return lightweight SVG mockups so the rest of the application can still be tested.

## Current limitations

- Visual consistency still depends on the image model and cannot be guaranteed pixel-for-pixel.
- Generated images are held in application state rather than saved as persistent projects.
- The available advertising formats are currently defined in code.
- Live image generation requires a Gemini API key and available API quota.

## Possible next steps

- Persist projects and generated assets
- Allow users to upload an existing product image as the initial reference
- Add custom advertising formats
- Store generation history
- Add automated tests for API and UI flows
- Move long-running generation work to a background job system for larger collections
