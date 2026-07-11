# Smart Sim DZ

A hybrid digital platform connecting foreign tourists to Algeria as a destination.

**Smart Sim DZ** is a two-sided marketplace (B2C and B2G) operating in travel tech and comm tech, based in Constantine. It combines a branded prepaid SIM card with a contextual translation engine, local services directory, and tourist safety module — all in one platform.

## 🚀 Live Prototype

This is the **web prototype** (TRL 4) — a fully interactive, browser-based demo with no backend dependencies.

### Features

- **Contextual Translator** — 3-layer phrase cards: literal → contextual → cultural note. Voice input/output. 40+ phrases across 6 situations.
- **Safety Module** — Location consent with purpose/retention/visibility disclosure. SOS press-and-hold with countdown. Full audit log.
- **Services Directory** — Hotels, restaurants, tours, transport. Mock booking flow.
- **Wallet** — Balance, transaction history, disabled payment methods (prototype).
- **4 Role Views** — Tourist, Partner, Admin, Authority. Persistent role switcher.
- **Trilingual** — English, French, Arabic with full RTL support.
- **PWA** — Service worker, offline toggle, push notification simulation.

### Design

- Premium Aurora UI with glassmorphism
- Emerald / Teal / Turquoise palette
- Plus Jakarta Sans typography
- Animated mesh gradient hero
- Frosted glass cards with hover lift
- Constantine-grounded visual identity

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| State | Zustand |
| Routing | React Router v7 |
| Icons | Lucide React |
| PWA | vite-plugin-pwa |
| Data | Mock service layer (swappable) |

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

```
src/
├── constants.ts         # MOCK flag, emergency placeholders
├── types/models.ts      # 12 domain data types
├── i18n/                # Trilingual (EN/FR/AR) + RTL provider
├── store/               # Zustand (appStore + safetyStore)
├── data/                # Seed data, 40+ contextual phrases
├── services/            # 5 mock services (swap MOCK flag for real APIs)
├── components/layout/   # RoleSwitcher, TouristNav, DemoControls
└── screens/
    ├── tourist/          # 10 screens (Landing → Home → Translator → Safety...)
    ├── authority/        # SOS-only console (no bulk surveillance)
    ├── partner/          # Offers + SIM activation
    └── admin/            # Back-office with KPI projections
```

## 🔐 Safety by Design

- `--sos` colour appears **nowhere** except the safety module
- Authority console shows **active SOS signals only** — no map of all tourists
- Location access outside active SOS requires a **documented authorisation reference**
- Every view action is written to the **tourist's personal audit trail**
- Consent dialog discloses **purpose, retention (72h), and visibility**

## 📊 TRL Status

**TRL 4** — Technology validated in lab environment. All core components integrated and demonstrated working together with mock data. Ready for backend integration and user testing to reach TRL 5.

## 📍 Based in Constantine

> The city of bridges, the gorge of Rhumel, and the warmth of Algerian hospitality.

---

**Smart Sim DZ** — Discover Algeria with confidence.
