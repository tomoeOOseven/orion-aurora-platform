import { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import SunCalc from 'suncalc';

const RASTER_W = 1440;
const RASTER_H = 720;

const COLOR_STOPS = [
  [0,   [  0, 200,  50,   0]],
  [10,  [  0, 210,  60,  25]],
  [30,  [  0, 235,  80, 100]],
  [50,  [  0, 210, 160, 160]],
  [70,  [ 30, 160, 230, 200]],
  [85,  [100,  80, 240, 220]],
  [100, [180,  40, 255, 245]],
];

function lerpColor(p) {
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [p0, c0] = COLOR_STOPS[i];
    const [p1, c1] = COLOR_STOPS[i + 1];
    if (p >= p0 && p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return [
        Math.round(c0[0] + t * (c1[0] - c0[0])),
        Math.round(c0[1] + t * (c1[1] - c0[1])),
        Math.round(c0[2] + t * (c1[2] - c0[2])),
        Math.round(c0[3] + t * (c1[3] - c0[3])),
      ];
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1][1];
}

function buildGrid(points) {
  const grid = new Float32Array(360 * 181);
  for (const { lon, lat, aurora } of points) {
    const li = ((Math.round(lon + 180)) % 360 + 360) % 360;
    const ai = Math.max(0, Math.min(180, Math.round(lat + 90)));
    grid[li * 181 + ai] = aurora;
  }
  return grid;
}

function gridSample(grid, lonIdx, latIdx) {
  const li = ((Math.floor(lonIdx) % 360) + 360) % 360;
  const ai = Math.max(0, Math.min(180, Math.floor(latIdx)));
  return grid[li * 181 + ai] || 0;
}

export function rasterizeOvation(points) {
  if (!points || points.length === 0) return null;
  const offscreen = document.createElement('canvas');
  offscreen.width  = RASTER_W;
  offscreen.height = RASTER_H;
  const ctx = offscreen.getContext('2d');
  const imageData = ctx.createImageData(RASTER_W, RASTER_H);
  const px = imageData.data;
  const grid = buildGrid(points);

  for (let py = 0; py < RASTER_H; py++) {
    const lat    = 90 - (py / RASTER_H) * 180;
    const latIdx = lat + 90;
    for (let qx = 0; qx < RASTER_W; qx++) {
      const lon    = (qx / RASTER_W) * 360 - 180;
      const lonIdx = lon + 180;
      const l0 = Math.floor(lonIdx), l1 = l0 + 1;
      const a0 = Math.floor(latIdx), a1 = a0 + 1;
      const tl = lonIdx - l0;
      const ta = latIdx - a0;
      const prob =
        (1 - tl) * (1 - ta) * gridSample(grid, l0, a0) +
        tl       * (1 - ta) * gridSample(grid, l1, a0) +
        (1 - tl) * ta       * gridSample(grid, l0, a1) +
        tl       * ta       * gridSample(grid, l1, a1);
      if (prob < 3) continue;
      const [r, g, b, a] = lerpColor(Math.min(prob, 100));
      const idx = (py * RASTER_W + qx) * 4;
      px[idx]     = r;
      px[idx + 1] = g;
      px[idx + 2] = b;
      px[idx + 3] = a;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return offscreen.toDataURL('image/png');
}

function buildTerminator(date) {
  const d = date || new Date();
  const doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  const declDeg = -23.45 * Math.cos((360 / 365) * (doy + 10) * (Math.PI / 180));
  const declRad = declDeg * (Math.PI / 180);
  const B = (360 / 365) * (doy - 81) * (Math.PI / 180);
  const eqTime = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const utcH = d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600;

  const line = [];
  for (let lonDeg = -180; lonDeg <= 180; lonDeg++) {
    const solarTime = utcH + lonDeg / 15 + eqTime / 60;
    const haRad = (solarTime - 12) * 15 * (Math.PI / 180);
    let latRad;
    if (Math.abs(declRad) < 0.001) {
      latRad = (Math.cos(haRad) >= 0 ? 1 : -1) * Math.PI / 2;
    } else {
      latRad = Math.atan(-Math.cos(haRad) / Math.tan(declRad));
    }
    line.push([lonDeg, latRad * (180 / Math.PI)]);
  }

  const northAlt = SunCalc.getPosition(d, 90, 0).altitude;
  const pole = northAlt < 0 ? 90 : -90;
  const night = [...line, [180, pole], [-180, pole], [-180, line[0][1]]];
  return { line, night };
}

const WORLD_BOUNDS = [[-90, -180], [90, 180]];

export default function AuroraMap({ ovation, position, onMapClick, onRightClick, routeGeometry, mapRef: mapRefProp }) {
  const mapRef     = useRef(null);
  const mapInst    = useRef(null);
  const overlayRef = useRef(null);
  const termLayers = useRef([]);
  const routeLayer = useRef(null);
  const posMarker  = useRef(null);
  const termTimer  = useRef(null);

  const [showTerminator, setShowTerminator] = useState(true);
  const [ovationTime, setOvationTime]       = useState(null);

  // Init map
  useEffect(() => {
    if (mapInst.current) return;
    const map = L.map(mapRef.current, {
      center: [70, 10], zoom: 3, minZoom: 2, maxZoom: 10, zoomControl: true, worldCopyJump: false, maxBounds: [[-85, -180], [85, 180]], maxBoundsViscosity: 1.0,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OSM © CARTO', subdomains: 'abcd', maxZoom: 12, noWrap: true,
    }).addTo(map);
    map.on('click', e => onMapClick?.({ lat: e.latlng.lat, lon: e.latlng.lng }));
    map.on('contextmenu', e => { e.originalEvent.preventDefault(); onRightClick?.({ lat: e.latlng.lat, lon: e.latlng.lng }); });
    mapInst.current = map;
    if (mapRefProp) mapRefProp.current = map;
  }, [onMapClick]);

  // OVATION imageOverlay — rasterize then swap URL (no flicker)
  useEffect(() => {
    if (!mapInst.current || !ovation?.points?.length) return;
    const map = mapInst.current;
    const points = ovation.points;
    const tid = setTimeout(() => {
      const url = rasterizeOvation(points);
      if (!url) return;
      if (overlayRef.current) {
        overlayRef.current.setUrl(url);
      } else {
        overlayRef.current = L.imageOverlay(url, WORLD_BOUNDS, {
          opacity: 0.72, interactive: false, zIndex: 400,
        }).addTo(map);
      }
      setOvationTime(ovation.forecastTime ? new Date(ovation.forecastTime) : new Date());
    }, 0);
    return () => clearTimeout(tid);
  }, [ovation]);

  // Terminator — GeoJSON layer, redraws every 5 min
  const redrawTerminator = useCallback(() => {
    if (!mapInst.current) return;
    const map = mapInst.current;
    termLayers.current.forEach(l => l.remove());
    termLayers.current = [];
    if (!showTerminator) return;
    const { line, night } = buildTerminator(new Date());
    const nightLayer = L.geoJSON(
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [night] } },
      { style: { fillColor: '#000c2e', fillOpacity: 0.28, stroke: false } }
    ).addTo(map);
    const lineLayer = L.geoJSON(
      { type: 'Feature', geometry: { type: 'LineString', coordinates: line } },
      { style: { color: '#ffd54f', weight: 1.5, opacity: 0.65, dashArray: '5 4' } }
    ).addTo(map);
    termLayers.current = [nightLayer, lineLayer];
  }, [showTerminator]);

  useEffect(() => {
    redrawTerminator();
    termTimer.current = setInterval(redrawTerminator, 5 * 60 * 1000);
    return () => {
      clearInterval(termTimer.current);
      termLayers.current.forEach(l => l.remove());
    };
  }, [redrawTerminator]);

  // Position marker
  useEffect(() => {
    if (!mapInst.current || !position) return;
    const map = mapInst.current;
    posMarker.current?.remove();
    posMarker.current = L.marker([position.lat, position.lon], {
      icon: L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#00e676;
          border:2px solid #fff;box-shadow:0 0 0 4px rgba(0,230,118,0.2),0 0 14px #00e676;"></div>`,
        className: '', iconSize: [14, 14], iconAnchor: [7, 7],
      }),
      zIndexOffset: 1000,
    })
      .addTo(map)
      .bindPopup(`<span style="font-family:monospace;font-size:11px;color:#00e676">
        ${position.lat.toFixed(3)}°, ${position.lon.toFixed(3)}°
      </span>`);
    map.flyTo([position.lat, position.lon], Math.max(map.getZoom(), 4), { duration: 1.2 });
  }, [position]);

  // Route overlay
  useEffect(() => {
    if (!mapInst.current) return;
    routeLayer.current?.remove();
    routeLayer.current = null;
    if (!routeGeometry) return;
    routeLayer.current = L.geoJSON(routeGeometry, {
      style: { color: '#00bcd4', weight: 3, opacity: 0.85, dashArray: '8 5' },
    }).addTo(mapInst.current);
  }, [routeGeometry]);

  const timeStr = ovationTime
    ? `OVATION ${ovationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC`
    : 'OVATION loading…';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <div style={{
        position: 'absolute', top: 10, left: 50, zIndex: 500, pointerEvents: 'none',
        background: 'rgba(5,8,16,0.82)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 5, padding: '3px 10px',
        fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)',
        letterSpacing: '0.06em',
      }}>
        {timeStr}
      </div>

      <div style={{
        position: 'absolute', bottom: 52, right: 16, zIndex: 500,
        background: 'rgba(5,8,16,0.85)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6, padding: '8px 12px', minWidth: 148,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 6, letterSpacing: '0.12em' }}>
          AURORA PROBABILITY
        </div>
        <div style={{
          height: 8, borderRadius: 4,
          background: 'linear-gradient(to right, rgba(0,235,80,0.2), rgba(0,210,160,0.65), rgba(30,160,230,0.85), rgba(180,40,255,0.95))',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>Low</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>High</span>
        </div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, borderTop: '1.5px dashed #ffd54f', opacity: 0.65 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>Terminator</span>
        </div>
      </div>

      <button
        className={`map-overlay-btn ${showTerminator ? 'active' : ''}`}
        style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 500 }}
        onClick={() => setShowTerminator(v => !v)}
      >
        ☽ Terminator
      </button>
    </div>
  );
}