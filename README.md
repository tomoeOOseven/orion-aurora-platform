# ✦ Orion Aurora Platform

> Hyper-local aurora forecasting & astrophotographer intelligence platform  
> Built for **Orion Astrathon** — 48-hour hackathon submission

---

## Live Demo

```
Frontend (Vercel): [Visit Orion Aurora Platform](https://orion-aurora-platform.vercel.app/)
Backend (Render):  Deployed on Render (Node.js/Express API)
```

---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Backend

```bash
cd backend
npm install
npm run dev        # starts on :3001 with nodemon
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # starts on :5173
```

Open http://localhost:5173 — the frontend proxies `/api/*` to the backend automatically.

### 3. Production build

```bash
# Frontend (outputs to frontend/dist)
cd frontend && npm run build

# Backend — set environment variables
PORT=3001 FRONTEND_URL=https://your-domain.com node server.js
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Data Sources (External)               │
│  NOAA SWPC · Open-Meteo · USNO/SunCalc · OSRM Routing  │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP polling (60s / 30min / 3hr)
┌───────────────────────▼─────────────────────────────────┐
│              Node.js / Express Backend (:3001)           │
│                                                         │
│  noaaPoller.js       — DSCOVR→ACE failover, schema v2  │
│  visibilityEngine.js — 0–100 composite score per lat/lon │
│  substormDetector.js — Bz rate monitoring, SSE push     │
│  routes/spaceweather — GET /api/spaceweather, /ovation  │
│  routes/visibility   — GET /api/visibility?lat=&lon=    │
│  routes/routing      — GET /api/routing/best-spot       │
│  GET /api/stream     — Server-Sent Events               │
└───────────────────────┬─────────────────────────────────┘
                        │ REST + SSE
┌───────────────────────▼─────────────────────────────────┐
│           React + Vite Frontend (:5173) — PWA           │
│                                                         │
│  AuroraMap           — Leaflet + OVATION canvas overlay │
│  SolarWindPanel      — Live Bz gauge, Kp badge          │
│  VisibilityScore     — Animated ring + component bars   │
│  PhotographyAdvisor  — ISO/f-stop/shutter by Kp         │
│  SubstormWarning     — SSE-driven alert banners         │
│  RoutingPanel        — GPS route to best dark-sky spot  │
└─────────────────────────────────────────────────────────┘
```

---

## Deliverables Checklist

| # | Deliverable | Status | Notes |
|---|-------------|--------|-------|
| D1 | Live Data Pipeline | ✅ | DSCOVR→ACE failover, schema v2, data-gap flagging |
| D2 | Interactive Aurora Map | ✅ | Canvas OVATION overlay, terminator, dark tiles |
| D3 | Visibility Score Engine | ✅ | Weighted 0–100: aurora 40% + cloud 35% + darkness 25% |
| D4 | Alert System | ✅ | SSE push + substorm detector + NOAA alerts |
| D5 | Working Demo + Codebase | ✅ | This repo |
| S1 | GPS Routing | ✅ | OSRM routing to best aurora + dark-sky point |
| S2 | Substorm Early Warning | ✅ | Bz rate ≤ –2 nT/min for 3 readings → WATCH alert |
| S4 | Photography Settings | ✅ | ISO/aperture/shutter by Kp + lunar adjustment |
| S5 | Offline PWA | ✅ | Service worker caches map tiles + last API response |

---

## Visibility Score Algorithm

```
Score (0–100) = aurora_component × 0.40
              + cloud_component  × 0.35
              + darkness_component × 0.25
```

### Component details

**Aurora component (40%)**  
Interpolated from NOAA OVATION 360×181 grid using inverse-distance weighting
over all grid points within 2° of the target location.

**Cloud component (35%)**  
`cloud_score = 100 − total_cloud_cover_pct`  
Fetched from Open-Meteo free API (no key required).

**Darkness component (25%)**  
Composite of three sub-signals:
- Solar zenith angle (50%): astronomical night (>108°) = 100 pts, twilight linearly interpolated
- Bortle class (40%): user-configurable, maps to 0–100 pts via `(9 − bortle) / 8`
- Lunar penalty (10%): full moon subtracts up to 40 points

### Weighting rationale
- Aurora probability is the primary signal — no matter how dark and clear the sky, there must be an aurora to see.
- Clouds are binary killers for visual observation, hence 35%.
- Darkness multiplies photographic quality but doesn't gate visibility entirely (very faint aurora can be captured photographically even under moderate skies).

---

## Substorm Early Warning

Three independent trigger conditions, any of which fires an SSE alert:

| Condition | Level | Description |
|-----------|-------|-------------|
| Bz < –7 nT | WARNING | Threshold crossing — substorm conditions active |
| dBz/dt < –2 nT/min for 3+ readings | WATCH | Rapid southward turning — substorm likely within 10 min |
| Speed > 500 km/s AND Bz < –5 nT | SEVERE | High-speed compound event |

A 15-minute cooldown prevents alert fatigue.

---

## Photography Settings Model

| Kp | Aperture | ISO | Shutter |
|----|----------|-----|---------|
| 0–2 | f/1.4 | 3200 | 15–25s |
| 3–4 | f/2.0 | 1600 | 10–15s |
| 5–6 | f/2.0 | 1600 | 6–10s |
| 7–8 | f/2.8 | 800  | 3–6s |
| 9   | f/2.8 | 400  | 2–4s |

ISO is automatically increased by 1 stop when lunar illumination > 70%.

---

## API Reference

### `GET /api/spaceweather`
Returns current solar wind data (Bz, speed, density), Kp index, active alerts,
data-source attribution (DSCOVR/ACE), and staleness flags.

### `GET /api/spaceweather/ovation`
Returns full 360×181 OVATION probability grid as `{ forecastTime, points: [{lon, lat, aurora}] }`.

### `GET /api/visibility?lat={lat}&lon={lon}&bortle={1-9}`
Computes and returns visibility score for any lat/lon.

### `POST /api/visibility/batch`
Body: `{ locations: [{lat, lon, bortle?}] }` (max 50). Returns scores for all.

### `GET /api/routing/best-spot?lat={lat}&lon={lon}&radius={km}`
Finds the highest-visibility point within radius km and returns an OSRM driving route.

### `GET /api/stream`
Server-Sent Events stream. Events:
- `solar_wind_update` — emitted every 60s with latest Bz, speed, Kp
- `substorm_alert` — emitted when an alert condition is detected

---

## Data Sources

| Source | Data | Cadence |
|--------|------|---------|
| NOAA SWPC DSCOVR | IMF Bz, solar wind speed/density | 1 min |
| NOAA SWPC ACE | Fallback solar wind | 1 min |
| NOAA OVATION | Aurora probability grid 360×181 | ~30 min |
| NOAA Kp | Planetary K-index | 3 hr |
| Open-Meteo | Cloud cover, seeing | On-demand |
| USNO/SunCalc | Lunar illumination, solar zenith | Computed |
| OSRM | GPS routing | On-demand |

---

## PWA / Offline Mode

The app is installable as a Progressive Web App. On first load:
- Map tiles from CartoDB are cached (500 tiles, 24hr expiry)
- Last API responses are cached with stale-while-revalidate strategy

An offline banner appears when network is unavailable. The map and last known
space weather data remain accessible from cache.

---

## Team & Acknowledgements

Built at **Orion Astrathon** — 48-hour space weather hackathon.  
Data provided by NOAA Space Weather Prediction Center (public domain).  
Routing by OSRM (open source, © OpenStreetMap contributors).  
Map tiles by CartoDB.

---

*"The best aurora you'll ever miss is the one you didn't get an alert for."*
