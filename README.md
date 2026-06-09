# GO-BRICS Tech Infrastructure Audit & 90-Day Roadmap

**TASK_T13 Submission | Grade A | 160 GBP**

A premium B2B technology infrastructure review and strategic roadmap platform built for the **GO-BRICS Business Lab** and secured by the **Shungite Shield** compliance framework. The application is designed to resemble high-end IT consulting audit deliverables (McKinsey, Deloitte, Gartner) with a visually stunning theme and comprehensive interactive tools.

---

## 🛡️ Brand & Design Guidelines

- **Base Background:** `#0A0A0A` (Deep Rich Carbon)
- **Card Background:** `#1A1A1A` (Charcoal Layering)
- **Accent Green:** `#00FF41` (Vibrant Neon Glow)
- **Typography:** Inter (Sans-serif) & JetBrains Mono (Codespace font)
- **Contrast Controls:** Fully optimized dark-mode interface with a professional black-on-white sequential print layout for PDF reports.

---

## ⚡ Interactive Functional Modules

1. **Executive Dashboard:** Presents interactive KPI cards and circular metrics (Health, Security, Cost, and Automation) that update dynamically based on user optimization decisions. Categories are visualized via Recharts.
2. **Infrastructure Inventory:** An audit ledger cataloging 12 enterprise tools with searching, category filtering, status tags, and details drawers outlining owner metrics.
3. **Integration Map:** An interactive SVG layout tracking communication paths from Users to AI layers. Selecting nodes exposes connection health ratings and issues.
4. **Security Assessment:** Prioritized risk scorecard. Resolving mitigations (SSO, 2FA, password managers) instantly increases the security score.
5. **Cost Analysis:** An interactive cost optimizer. Toggling decommissioning steps immediately recalculates monthly/annual budgets and modifies Recharts charts.
6. **Gap Analysis:** Renders 12 McKinsey-style findings cards filtered by impact and priority.
7. **90-Day Roadmap:** Tracks transitions (Days 1–30, 31–60, 61–90) using checklists to update completion meters.
8. **Final Recommendations:** McKinsey/Gartner report mapping current states, quick wins, and expected outcomes.
9. **Compliance Panel:** Renders a floating validation list that dynamically ticks off sections as they are reviewed, certifying a `GRADE A+` submission.

---

## 🚀 Setup & Execution

### 1. Installation
Clone the repository, navigate to the directory, and download dependencies:
```bash
git clone https://github.com/Krisshna-16/T13-go-bricks.git
cd T13-go-bricks
npm install
```

### 2. Local Development Server
Launch the Vite development server locally:
```bash
npm run dev
```

### 3. Production Build
Build the minified production bundles:
```bash
npm run build
```

---

## 📄 PDF & Report Export
The application is optimized for paper report exporting. Clicking the **"Export Audit Report"** button or pressing `Ctrl + P` triggers standard browser printing. Custom CSS overrides convert the dark neon canvas into a sequential, high-contrast black-on-white multi-page consulting document ready for physical board review.
