import { MockupItem, AspectRatio } from "./types";

export function createSampleMockups(productDesc: string): MockupItem[] {
  const desc = productDesc || "Matte Obsidian Ceramic Coffee Dripper with Cork Collar";

  // SVG for Billboard (16:9)
  const billboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
    <defs>
      <linearGradient id="bg-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="60%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <linearGradient id="billboard-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#18181b" />
        <stop offset="100%" stop-color="#09090b" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Night City Backdrop -->
    <rect width="1600" height="900" fill="url(#bg-sky)" />
    <!-- Distant skyline silhouettes -->
    <path d="M 0 650 L 120 620 L 120 680 L 250 590 L 320 630 L 400 550 L 520 610 L 680 520 L 760 580 L 890 490 L 1000 560 L 1150 480 L 1280 540 L 1400 510 L 1600 590 L 1600 900 L 0 900 Z" fill="#090d16" opacity="0.8" />
    
    <!-- Heavy Steel Billboard Frame & Poles -->
    <rect x="740" y="660" width="120" height="240" fill="#1e293b" stroke="#334155" stroke-width="4" />
    <line x1="750" y1="670" x2="850" y2="780" stroke="#334155" stroke-width="3" />
    <line x1="850" y1="670" x2="750" y2="780" stroke="#334155" stroke-width="3" />
    
    <!-- Billboard Canvas Container (16:9 ratio) -->
    <rect x="180" y="110" width="1240" height="560" rx="6" fill="url(#billboard-grad)" stroke="#52525b" stroke-width="12" />
    <!-- Spotlight beams on top -->
    <path d="M 280 90 L 220 220 L 380 220 Z" fill="#ffffff" opacity="0.06" />
    <path d="M 800 90 L 700 240 L 900 240 Z" fill="#ffffff" opacity="0.06" />
    <path d="M 1320 90 L 1220 220 L 1380 220 Z" fill="#ffffff" opacity="0.06" />

    <!-- Billboard Graphic Content -->
    <g transform="translate(240, 160)">
      <!-- Brand Headline -->
      <text x="50" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="700" fill="#a1a1aa" letter-spacing="8">STUDIO SPECIFICATION</text>
      <text x="50" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="2">ARCHITECTURAL FORM</text>
      <text x="50" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#71717a" letter-spacing="3">DESIGNED FOR UNCOMPROMISED ACCURACY</text>
      
      <!-- Minimalist Product Outline / Silhouette on Billboard -->
      <g transform="translate(800, 40)">
        <!-- Product pedestal glow -->
        <ellipse cx="140" cy="340" rx="140" ry="24" fill="#3b82f6" opacity="0.25" filter="url(#glow)" />
        <!-- Sleek conical coffee dripper geometric vector -->
        <polygon points="40,90 240,90 180,240 100,240" fill="#27272a" stroke="#d4d4d8" stroke-width="3" />
        <ellipse cx="140" cy="90" rx="100" ry="22" fill="#18181b" stroke="#e4e4e7" stroke-width="2" />
        <!-- Cork accent collar -->
        <rect x="90" y="240" width="100" height="32" rx="4" fill="#c29b38" opacity="0.9" />
        <path d="M 140 272 L 140 330" stroke="#71717a" stroke-width="4" />
        <ellipse cx="140" cy="330" rx="55" ry="12" fill="#18181b" stroke="#71717a" stroke-width="2" />
      </g>
    </g>
    <!-- Billboard bottom catwalk -->
    <rect x="150" y="670" width="1300" height="24" fill="#27272a" stroke="#3f3f46" stroke-width="2" />
    <text x="200" y="686" font-family="monospace" font-size="12" fill="#71717a">HIGHWAY ADVERTISING DISPLAY • 16:9 RATIO</text>
  </svg>`;

  // SVG for Newspaper (3:4)
  const newspaperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="100%" height="100%">
    <defs>
      <pattern id="halftone" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.5" fill="#525252" />
      </pattern>
      <filter id="paper-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
        <feColorMatrix type="matrix" values="0.95 0 0 0 0.05  0 0.94 0 0 0.04  0 0 0.9 0 0.02  0 0 0 1 0" />
      </filter>
    </defs>
    <!-- Newspaper Aged Newsprint Ground -->
    <rect width="900" height="1200" fill="#f4efe6" />
    <!-- Paper crease shadow down fold -->
    <rect x="445" y="0" width="10" height="1200" fill="#000000" opacity="0.04" />

    <!-- Newspaper Masthead & Header -->
    <g transform="translate(60, 50)">
      <line x1="0" y1="0" x2="780" y2="0" stroke="#1c1917" stroke-width="2" />
      <text x="390" y="45" font-family="Georgia, serif" font-size="54" font-weight="900" text-anchor="middle" letter-spacing="4" fill="#1c1917">THE DAILY REGISTER</text>
      <text x="390" y="70" font-family="Georgia, serif" font-size="13" font-style="italic" text-anchor="middle" fill="#57534e">Vol. CXXIV No. 42 • Morning Edition • Industrial Design &amp; Culture</text>
      <line x1="0" y1="85" x2="780" y2="85" stroke="#1c1917" stroke-width="3" />
      <line x1="0" y1="90" x2="780" y2="90" stroke="#1c1917" stroke-width="1" />
      
      <!-- Feature Article Headline -->
      <text x="0" y="145" font-family="Georgia, serif" font-size="38" font-weight="800" fill="#1c1917" letter-spacing="0.5">THE ARCHITECTURE OF TASTE</text>
      <text x="0" y="175" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#44403c">Crafting Minimalist Domestic Objects with Mathematical Precision</text>
      
      <!-- Halftone Lithograph Product Feature Box -->
      <rect x="0" y="200" width="460" height="420" fill="#e7e0d3" stroke="#292524" stroke-width="1.5" />
      <!-- Product Silhouette in Halftone style -->
      <polygon points="120,260 340,260 270,430 190,430" fill="#292524" />
      <ellipse cx="230" cy="260" rx="110" ry="24" fill="#44403c" stroke="#1c1917" stroke-width="2" />
      <rect x="180" y="430" width="100" height="34" fill="#78350f" opacity="0.6" />
      <line x1="230" y1="464" x2="230" y2="540" stroke="#1c1917" stroke-width="4" />
      <ellipse cx="230" cy="540" rx="60" ry="14" fill="#292524" />
      <text x="10" y="605" font-family="Georgia, serif" font-size="11" font-style="italic" fill="#57534e">Fig. 1.1. Matte obsidian ceramic finish under studio diffused lighting.</text>

      <!-- Multi-column body text -->
      <g transform="translate(490, 210)">
        <text x="0" y="20" font-family="Georgia, serif" font-size="12" fill="#292524" font-weight="700">SPECIAL CORRESPONDENT</text>
        <line x1="0" y1="30" x2="290" y2="30" stroke="#a8a29e" stroke-width="1" />
        <!-- Simulated newspaper body columns -->
        <text x="0" y="55" font-family="Georgia, serif" font-size="11" fill="#44403c" line-height="1.5">When contemporary design meets ceramic science, every millimeter informs the extraction curve.</text>
        <rect x="0" y="80" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="92" width="270" height="4" fill="#d6d3d1" />
        <rect x="0" y="104" width="285" height="4" fill="#d6d3d1" />
        <rect x="0" y="116" width="250" height="4" fill="#d6d3d1" />
        <rect x="0" y="138" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="150" width="275" height="4" fill="#d6d3d1" />
        <rect x="0" y="162" width="260" height="4" fill="#d6d3d1" />
        <rect x="0" y="174" width="285" height="4" fill="#d6d3d1" />
        <rect x="0" y="196" width="270" height="4" fill="#d6d3d1" />
        <rect x="0" y="208" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="220" width="265" height="4" fill="#d6d3d1" />
        <rect x="0" y="232" width="240" height="4" fill="#d6d3d1" />
        <rect x="0" y="254" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="266" width="270" height="4" fill="#d6d3d1" />
        <rect x="0" y="278" width="285" height="4" fill="#d6d3d1" />
        <rect x="0" y="290" width="255" height="4" fill="#d6d3d1" />
        <rect x="0" y="312" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="324" width="265" height="4" fill="#d6d3d1" />
        <rect x="0" y="336" width="275" height="4" fill="#d6d3d1" />
        <rect x="0" y="348" width="250" height="4" fill="#d6d3d1" />
        <rect x="0" y="370" width="280" height="4" fill="#d6d3d1" />
        <rect x="0" y="382" width="270" height="4" fill="#d6d3d1" />
      </g>

      <!-- Bottom Newspaper Column Grid -->
      <line x1="0" y1="650" x2="780" y2="650" stroke="#1c1917" stroke-width="1.5" />
      <g transform="translate(0, 680)">
        <text x="0" y="20" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#1c1917">MATERIAL INTEGRITY</text>
        <rect x="0" y="35" width="240" height="4" fill="#a8a29e" />
        <rect x="0" y="47" width="235" height="4" fill="#d6d3d1" />
        <rect x="0" y="59" width="245" height="4" fill="#d6d3d1" />
        <rect x="0" y="71" width="220" height="4" fill="#d6d3d1" />
        <rect x="0" y="83" width="240" height="4" fill="#d6d3d1" />
        <rect x="0" y="95" width="230" height="4" fill="#d6d3d1" />

        <g transform="translate(270, 0)">
          <text x="0" y="20" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#1c1917">THERMAL RETENTION</text>
          <rect x="0" y="35" width="240" height="4" fill="#a8a29e" />
          <rect x="0" y="47" width="235" height="4" fill="#d6d3d1" />
          <rect x="0" y="59" width="245" height="4" fill="#d6d3d1" />
          <rect x="0" y="71" width="220" height="4" fill="#d6d3d1" />
          <rect x="0" y="83" width="240" height="4" fill="#d6d3d1" />
          <rect x="0" y="95" width="230" height="4" fill="#d6d3d1" />
        </g>

        <g transform="translate(540, 0)">
          <text x="0" y="20" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#1c1917">COLLECTOR NOTE</text>
          <rect x="0" y="35" width="230" height="4" fill="#a8a29e" />
          <rect x="0" y="47" width="225" height="4" fill="#d6d3d1" />
          <rect x="0" y="59" width="235" height="4" fill="#d6d3d1" />
          <rect x="0" y="71" width="210" height="4" fill="#d6d3d1" />
          <rect x="0" y="83" width="230" height="4" fill="#d6d3d1" />
          <rect x="0" y="95" width="220" height="4" fill="#d6d3d1" />
        </g>
      </g>
    </g>
  </svg>`;

  // SVG for Social Post (1:1)
  const socialSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
    <defs>
      <radialGradient id="studio-light" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#fdfbf7" />
        <stop offset="60%" stop-color="#f4eee2" />
        <stop offset="100%" stop-color="#e8dfce" />
      </radialGradient>
      <filter id="soft-shadow" x="-20%" y="-20%" width="150%" height="150%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="28" />
        <feOffset dx="15" dy="45" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.25" />
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <!-- Seamless Warm Studio Backdrop -->
    <rect width="1080" height="1080" fill="url(#studio-light)" />
    
    <!-- Minimalist Architectural Shadow Floor Plane -->
    <path d="M 0 880 L 1080 820 L 1080 1080 L 0 1080 Z" fill="#ded2bf" opacity="0.4" />
    
    <!-- Hero Product Shot in Studio Light with Contact Shadow -->
    <g transform="translate(540, 520)" filter="url(#soft-shadow)">
      <!-- Ground shadow -->
      <ellipse cx="0" cy="220" rx="220" ry="36" fill="#71604a" opacity="0.3" />
      
      <!-- Obsidian Ceramic Dripper Cone -->
      <polygon points="-160,-120 160,-120 90,90 -90,90" fill="#18181b" />
      <!-- Rim interior with coffee bloom texture -->
      <ellipse cx="0" cy="-120" rx="160" ry="34" fill="#09090b" stroke="#27272a" stroke-width="4" />
      <!-- Natural Cork Collar -->
      <rect x="-95" y="90" width="190" height="42" rx="6" fill="#b48348" />
      <!-- Fine brass structural ribs -->
      <line x1="0" y1="132" x2="0" y2="210" stroke="#71717a" stroke-width="6" />
      <ellipse cx="0" cy="210" rx="70" ry="16" fill="#18181b" stroke="#52525b" stroke-width="3" />
    </g>

    <!-- Refined Social Post Typography Overlay -->
    <g transform="translate(90, 110)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="6" fill="#8c7e6a">ARCHIVE COLLECTION</text>
      <text x="0" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" letter-spacing="1" fill="#292524">NO. 08 OBSIDIAN</text>
    </g>

    <g transform="translate(90, 990)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="3" fill="#a89a85">HAND-FINISHED IN SMALL BATCHES</text>
    </g>

    <g transform="translate(990, 990)" text-anchor="end">
      <text x="0" y="0" font-family="monospace" font-size="12" fill="#a89a85">1:1 INSTAGRAM SPEC</text>
    </g>
  </svg>`;

  // SVG for Subway Poster (3:4)
  const subwaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="100%" height="100%">
    <defs>
      <linearGradient id="tile-wall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e2022" />
        <stop offset="100%" stop-color="#121315" />
      </linearGradient>
      <linearGradient id="lightbox-glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a2d32" />
        <stop offset="100%" stop-color="#181a1d" />
      </linearGradient>
      <filter id="metro-glow">
        <feGaussianBlur stdDeviation="16" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Dark Metro Ceramic Tile Wall -->
    <rect width="900" height="1200" fill="url(#tile-wall)" />
    <!-- Subway Tile Grid Lines -->
    <pattern id="subway-tiles" width="120" height="60" patternUnits="userSpaceOnUse">
      <rect width="120" height="60" fill="none" stroke="#2c2f35" stroke-width="1.5" />
    </pattern>
    <rect width="900" height="1200" fill="url(#subway-tiles)" opacity="0.4" />
    
    <!-- Lightbox Frame Outline -->
    <rect x="90" y="100" width="720" height="980" rx="8" fill="#0d0e10" stroke="#4a4f58" stroke-width="14" />
    <!-- Backlit Poster Surface (3:4) -->
    <rect x="110" y="120" width="680" height="940" fill="url(#lightbox-glow)" />

    <!-- Subway Poster Graphic Content -->
    <g transform="translate(150, 180)">
      <text x="0" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="8" fill="#e2e8f0">METROPOLITAN COMMUTE</text>
      <text x="0" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="2" fill="#ffffff">TIMELESS CRAFT</text>
      <line x1="0" y1="120" x2="600" y2="120" stroke="#4a5568" stroke-width="2" />
      
      <!-- Center illuminated product rendering -->
      <g transform="translate(300, 420)">
        <ellipse cx="0" cy="180" rx="160" ry="30" fill="#38bdf8" opacity="0.2" filter="url(#metro-glow)" />
        <polygon points="-120,-100 120,-100 70,80 -70,80" fill="#1e293b" stroke="#cbd5e1" stroke-width="3" />
        <ellipse cx="0" cy="-100" rx="120" ry="26" fill="#0f172a" stroke="#f8fafc" stroke-width="2" />
        <rect x="-70" y="80" width="140" height="34" rx="4" fill="#d97706" />
        <line x1="0" y1="114" x2="0" y2="170" stroke="#94a3b8" stroke-width="4" />
        <ellipse cx="0" cy="170" rx="55" ry="14" fill="#0f172a" stroke="#94a3b8" stroke-width="2" />
      </g>

      <text x="300" y="760" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" text-anchor="middle" fill="#cbd5e1" letter-spacing="4">PRECISION IN EVERY DETAIL</text>
      <text x="300" y="795" font-family="monospace" font-size="12" text-anchor="middle" fill="#64748b">SUBWAY LIGHTBOX DISPLAY • 3:4 RATIO</text>
    </g>
  </svg>`;

  // SVG for Magazine Ad (4:3)
  const magazineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%">
    <defs>
      <linearGradient id="gloss-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
        <stop offset="48%" stop-color="#ffffff" stop-opacity="0.02" />
        <stop offset="50%" stop-color="#000000" stop-opacity="0.15" />
        <stop offset="52%" stop-color="#ffffff" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.06" />
      </linearGradient>
    </defs>
    <!-- Magazine Spread Background -->
    <rect width="1200" height="900" fill="#fcfbf9" />
    <!-- Spine gutter shadow -->
    <rect x="592" y="0" width="16" height="900" fill="#000000" opacity="0.12" />

    <!-- Left Page Editorial -->
    <g transform="translate(100, 100)">
      <text x="0" y="40" font-family="Georgia, serif" font-size="14" font-weight="700" letter-spacing="6" fill="#78716c">CURATED OBJECTS • ISSUE 48</text>
      <text x="0" y="110" font-family="Georgia, serif" font-size="46" font-weight="900" fill="#1c1917" letter-spacing="1">OBSIDIAN</text>
      <text x="0" y="145" font-family="Georgia, serif" font-size="18" font-style="italic" fill="#57534e">An homage to pure material restraint.</text>
      <line x1="0" y1="175" x2="400" y2="175" stroke="#d6d3d1" stroke-width="1.5" />
      
      <!-- Editorial paragraphs -->
      <g transform="translate(0, 210)">
        <rect x="0" y="0" width="380" height="6" fill="#e7e5e4" />
        <rect x="0" y="18" width="370" height="6" fill="#e7e5e4" />
        <rect x="0" y="36" width="385" height="6" fill="#e7e5e4" />
        <rect x="0" y="54" width="340" height="6" fill="#e7e5e4" />
        <rect x="0" y="84" width="380" height="6" fill="#e7e5e4" />
        <rect x="0" y="102" width="365" height="6" fill="#e7e5e4" />
        <rect x="0" y="120" width="350" height="6" fill="#e7e5e4" />
      </g>

      <text x="0" y="680" font-family="Georgia, serif" font-size="12" font-style="italic" fill="#a8a29e">Page 84 — Architectural Living</text>
    </g>

    <!-- Right Page Hero Spread -->
    <g transform="translate(680, 100)">
      <rect x="0" y="0" width="440" height="660" rx="4" fill="#18181b" />
      <!-- Product on glossy pedestal -->
      <g transform="translate(220, 320)">
        <polygon points="-100,-70 100,-70 60,70 -60,70" fill="#27272a" stroke="#e4e4e7" stroke-width="2" />
        <ellipse cx="0" cy="-70" rx="100" ry="22" fill="#09090b" stroke="#f4f4f5" stroke-width="2" />
        <rect x="-60" y="70" width="120" height="28" rx="3" fill="#b45309" />
        <line x1="0" y1="98" x2="0" y2="140" stroke="#71717a" stroke-width="4" />
        <ellipse cx="0" cy="140" rx="45" ry="10" fill="#09090b" stroke="#71717a" stroke-width="1.5" />
      </g>
      <text x="220" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="4" text-anchor="middle" fill="#a1a1aa">MATTE OBSIDIAN</text>
      <text x="220" y="610" font-family="monospace" font-size="10" text-anchor="middle" fill="#71717a">MAGAZINE SPREAD • 4:3 RATIO</text>
    </g>

    <!-- Paper Gloss Sheen Overlay -->
    <rect width="1200" height="900" fill="url(#gloss-sheen)" pointer-events="none" />
  </svg>`;

  const toDataUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return [
    {
      id: `billboard-${Date.now()}-sample`,
      mediumId: "billboard",
      mediumName: "Highway Billboard",
      aspectRatio: "16:9",
      imageUrl: toDataUrl(billboardSvg),
      productDescription: desc,
      isReference: true,
      createdAt: Date.now(),
    },
    {
      id: `newspaper-${Date.now()}-sample`,
      mediumId: "newspaper",
      mediumName: "Newspaper Print",
      aspectRatio: "3:4",
      imageUrl: toDataUrl(newspaperSvg),
      productDescription: desc,
      isReference: false,
      createdAt: Date.now(),
    },
    {
      id: `social_post-${Date.now()}-sample`,
      mediumId: "social_post",
      mediumName: "Social Media Post",
      aspectRatio: "1:1",
      imageUrl: toDataUrl(socialSvg),
      productDescription: desc,
      isReference: false,
      createdAt: Date.now(),
    },
    {
      id: `subway_poster-${Date.now()}-sample`,
      mediumId: "subway_poster",
      mediumName: "Subway Poster",
      aspectRatio: "3:4",
      imageUrl: toDataUrl(subwaySvg),
      productDescription: desc,
      isReference: false,
      createdAt: Date.now(),
    },
    {
      id: `magazine-${Date.now()}-sample`,
      mediumId: "magazine",
      mediumName: "Magazine Ad",
      aspectRatio: "4:3",
      imageUrl: toDataUrl(magazineSvg),
      productDescription: desc,
      isReference: false,
      createdAt: Date.now(),
    },
  ];
}

export function createSingleSampleMockup(
  productDesc: string,
  mediumId: string,
  overrideAspectRatio?: AspectRatio
): MockupItem {
  const all = createSampleMockups(productDesc);
  const found = all.find((m) => m.mediumId === mediumId);
  const baseItem = found || {
    ...all[0],
    mediumId: mediumId as any,
    mediumName: mediumId,
  };

  return {
    ...baseItem,
    id: `${mediumId}-${Date.now()}`,
    aspectRatio: overrideAspectRatio || baseItem.aspectRatio,
  };
}
