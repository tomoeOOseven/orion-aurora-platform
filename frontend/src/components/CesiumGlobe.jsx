import React, { useCallback, useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Set your Cesium Ion access token here
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMDljNjg0Yi05ZjBjLTQ4NDItODJlYi1lYzVjMzNhM2IyYjgiLCJpZCI6NDA0MzgwLCJpYXQiOjE3NzM2NDgyMjl9.TDfVLdeKtOyxeIujvk2Eo-JZhkidVaDb8ZBQjuCagKU';

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

function rasterizeOvation(points) {
  if (!points || points.length === 0) return null;
  const offscreen = document.createElement('canvas');
  offscreen.width = RASTER_W;
  offscreen.height = RASTER_H;
  const ctx = offscreen.getContext('2d');
  if (!ctx) return null;
  const imageData = ctx.createImageData(RASTER_W, RASTER_H);
  const px = imageData.data;
  const grid = buildGrid(points);

  for (let py = 0; py < RASTER_H; py++) {
    const lat = 90 - (py / RASTER_H) * 180;
    const latIdx = lat + 90;
    for (let qx = 0; qx < RASTER_W; qx++) {
      const lon = (qx / RASTER_W) * 360 - 180;
      const lonIdx = lon + 180;
      const l0 = Math.floor(lonIdx);
      const l1 = l0 + 1;
      const a0 = Math.floor(latIdx);
      const a1 = a0 + 1;
      const tl = lonIdx - l0;
      const ta = latIdx - a0;
      const prob =
        (1 - tl) * (1 - ta) * gridSample(grid, l0, a0) +
        tl * (1 - ta) * gridSample(grid, l1, a0) +
        (1 - tl) * ta * gridSample(grid, l0, a1) +
        tl * ta * gridSample(grid, l1, a1);

      // Suppress interpolation haze near equator while preserving strong low-lat events.
      const absLat = Math.abs(lat);
      let minProb = 3;
      if (absLat < 25) minProb = 15;
      else if (absLat < 40) minProb = 8;
      if (prob < minProb) continue;

      const [r, g, b, aRaw] = lerpColor(Math.min(prob, 100));
      // Boost alpha so low/moderate aurora values remain visible over bright base imagery.
      const a = Math.min(255, Math.round(aRaw * 1.35));
      const idx = (py * RASTER_W + qx) * 4;
      px[idx] = r;
      px[idx + 1] = g;
      px[idx + 2] = b;
      px[idx + 3] = a;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return offscreen.toDataURL('image/png');
}

function buildTerminatorGeoJson(date = new Date()) {
  const d = date;
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
    const latRad = Math.abs(declRad) < 0.001
      ? (Math.cos(haRad) >= 0 ? 1 : -1) * Math.PI / 2
      : Math.atan(-Math.cos(haRad) / Math.tan(declRad));
    line.push([lonDeg, latRad * (180 / Math.PI)]);
  }

  return {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'LineString', coordinates: line }, properties: { kind: 'line' } },
    ],
  };
}

export default function CesiumGlobe({
  overlays = [],
  routeGeometry = null,
  position = null,
  destination = null,
  ovationForecastTime = null,
  onMapClick,
  onRightClick,
  onViewerReady,
}) {
  const containerRef = useRef();
  const viewerRef = useRef();
  const clickHandlerRef = useRef();
  const ovationLayerRef = useRef(null);
  const terminatorSourceRef = useRef(null);
  const terminatorTimerRef = useRef(null);
  const routeSourceRef = useRef(null);
  const positionEntityRef = useRef(null);
  const destinationEntityRef = useRef(null);
  const ovationTimeLabel = ovationForecastTime
    ? `OVATION ${new Date(ovationForecastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC`
    : 'OVATION loading...';

  const getLonLatFromScreen = useCallback((screenPosition) => {
    const viewer = viewerRef.current;
    if (!viewer || !screenPosition) return null;
    const ray = viewer.camera.getPickRay(screenPosition);
    if (!ray) return null;
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!cartesian) return null;
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    return {
      lat: Cesium.Math.toDegrees(cartographic.latitude),
      lon: Cesium.Math.toDegrees(cartographic.longitude),
    };
  }, []);

  const redrawTerminator = useCallback(async () => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.dataSources) return;

    try {
      if (terminatorSourceRef.current) {
        viewer.dataSources.remove(terminatorSourceRef.current, true);
        terminatorSourceRef.current = null;
      }

      const ds = await Cesium.GeoJsonDataSource.load(buildTerminatorGeoJson(new Date()));
      
      // Re-check viewer is still valid after async load
      if (viewerRef.current !== viewer || !viewer.dataSources) return;
      
      ds.entities.values.forEach((entity) => {
        const kind = entity.properties?.kind?.getValue(Cesium.JulianDate.now());
        if (kind === 'night' && entity.polygon) {
          entity.polygon.material = Cesium.Color.fromCssColorString('#000c2e').withAlpha(0.28);
          entity.polygon.outline = false;
        }
        if (kind === 'line' && entity.polyline) {
          entity.polyline.material = Cesium.Color.fromCssColorString('#ffd54f').withAlpha(0.65);
          entity.polyline.width = 1.5;
          entity.polyline.clampToGround = true;
        }
      });
      terminatorSourceRef.current = ds;
      viewer.dataSources.add(ds);
    } catch (err) {
      console.warn('[redrawTerminator]', err);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (viewerRef.current) return;
    // Cesium expects a global CESIUM_BASE_URL for static assets
    window.CESIUM_BASE_URL = '/cesium';
    viewerRef.current = new Cesium.Viewer(containerRef.current, {
      timeline: false,
      animation: false,
      baseLayerPicker: true,
      geocoder: true,
      homeButton: true,
      sceneModePicker: true,
      navigationHelpButton: true,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: true,
    });

    const viewer = viewerRef.current;
    // Enable physically-based daylight/night shading from the sun direction.
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.dynamicAtmosphereLighting = true;
    viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
    viewer.scene.globe.showGroundAtmosphere = true;
    viewer.scene.skyAtmosphere.show = true;
    viewer.clock.shouldAnimate = true;
    
    clickHandlerRef.current = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    clickHandlerRef.current.setInputAction((movement) => {
      const coords = getLonLatFromScreen(movement.position);
      if (!coords) return;
      onMapClick?.(coords);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(coords.lon, coords.lat, 1200000),
        duration: 1.2,
      });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    clickHandlerRef.current.setInputAction((movement) => {
      const coords = getLonLatFromScreen(movement.position);
      if (!coords) return;
      onRightClick?.(coords);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // Notify parent that viewer is ready
    setTimeout(() => onViewerReady?.(viewer), 0);
    
    // Draw terminator and set refresh interval after assured initialization
    setTimeout(() => {
      // Guard in case viewer was destroyed before this executes
      if (viewerRef.current === viewer) {
        redrawTerminator();
        terminatorTimerRef.current = window.setInterval(() => {
          // Guard each interval call too
          if (viewerRef.current === viewer) {
            redrawTerminator();
          }
        }, 5 * 60 * 1000);
      }
    }, 100);

    return () => {
      if (terminatorTimerRef.current) {
        clearInterval(terminatorTimerRef.current);
        terminatorTimerRef.current = null;
      }
      if (clickHandlerRef.current) {
        clickHandlerRef.current.destroy();
        clickHandlerRef.current = null;
      }
      if (viewerRef.current) {
        onViewerReady?.(null);
        try {
          viewerRef.current.destroy();
        } catch {}
        viewerRef.current = null;
      }
    };
  }, [getLonLatFromScreen, onMapClick, onRightClick, onViewerReady, redrawTerminator]);

  // OVATION overlay as SingleTile imagery projected over the globe.
  useEffect(() => {
    if (!viewerRef.current || !viewerRef.current.imageryLayers) return;
    const viewer = viewerRef.current;
    const ovation = overlays?.[0];
    if (!ovation?.points?.length) return;

    const url = rasterizeOvation(ovation.points);
    if (!url) return;

    try {
      if (ovationLayerRef.current) {
        viewer.imageryLayers.remove(ovationLayerRef.current, true);
        ovationLayerRef.current = null;
      }

      const provider = new Cesium.SingleTileImageryProvider({
        url,
        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        tileWidth: 1440,
        tileHeight: 720,
      });
      ovationLayerRef.current = viewer.imageryLayers.addImageryProvider(provider);
      viewer.imageryLayers.raiseToTop(ovationLayerRef.current);
      ovationLayerRef.current.show = true;
      ovationLayerRef.current.alpha = 0.9;
      ovationLayerRef.current.brightness = 1.2;
      ovationLayerRef.current.contrast = 1.25;
    } catch (err) {
      console.warn('[OVATION overlay]', err);
    }
  }, [overlays?.[0]?.forecastTime, overlays?.[0]?.points?.length]);

  // Position marker entity.
  useEffect(() => {
    if (!viewerRef.current || !viewerRef.current.entities || !position) return;
    const viewer = viewerRef.current;
    if (positionEntityRef.current) viewer.entities.remove(positionEntityRef.current);

    try {
      positionEntityRef.current = viewer.entities.add({
        id: 'current-position',
        position: Cesium.Cartesian3.fromDegrees(position.lon, position.lat),
        point: {
          pixelSize: 12,
          color: Cesium.Color.fromCssColorString('#00e676').withAlpha(0.95),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: `You\n${position.lat.toFixed(3)}°, ${position.lon.toFixed(3)}°`,
          font: '11px monospace',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.fromCssColorString('#dfffea'),
          outlineColor: Cesium.Color.fromCssColorString('#0f3a1f'),
          outlineWidth: 2,
          showBackground: true,
          backgroundColor: Cesium.Color.fromCssColorString('rgba(8, 28, 14, 0.72)'),
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(10, -8),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    } catch (err) {
      console.warn('[Position entity]', err);
    }
  }, [position]);

  // Destination marker entity.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.entities) return;

    if (destinationEntityRef.current) {
      viewer.entities.remove(destinationEntityRef.current);
      destinationEntityRef.current = null;
    }

    if (!destination) return;

    try {
      destinationEntityRef.current = viewer.entities.add({
        id: 'route-destination',
        position: Cesium.Cartesian3.fromDegrees(destination.lon, destination.lat),
        point: {
          pixelSize: 12,
          color: Cesium.Color.fromCssColorString('#00bcd4').withAlpha(0.95),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: `Best Spot\n${destination.lat.toFixed(3)}°, ${destination.lon.toFixed(3)}°`,
          font: '11px monospace',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.fromCssColorString('#dff9ff'),
          outlineColor: Cesium.Color.fromCssColorString('#06222c'),
          outlineWidth: 2,
          showBackground: true,
          backgroundColor: Cesium.Color.fromCssColorString('rgba(5, 24, 32, 0.75)'),
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(10, -8),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    } catch (err) {
      console.warn('[Destination entity]', err);
    }
  }, [destination]);

  // Route as GeoJSON clamped to terrain.
  useEffect(() => {
    const applyRoute = async () => {
      const viewer = viewerRef.current;
      if (!viewer || !viewer.dataSources) return;
      if (!routeGeometry) return;

      try {
        if (routeSourceRef.current) {
          viewer.dataSources.remove(routeSourceRef.current, true);
          routeSourceRef.current = null;
        }

        const ds = await Cesium.GeoJsonDataSource.load(routeGeometry, {
          clampToGround: true,
        });
        
        // Re-check viewer is still valid after async load
        if (viewerRef.current !== viewer || !viewer.dataSources) return;
        
        ds.entities.values.forEach((entity) => {
          if (entity.polyline) {
            entity.polyline.width = 3;
            entity.polyline.clampToGround = true;
            entity.polyline.material = Cesium.Color.fromCssColorString('#00bcd4').withAlpha(0.88);
          }
        });
        routeSourceRef.current = ds;
        viewer.dataSources.add(ds);
      } catch (err) {
        console.warn('[Route overlay]', err);
      }
    };

    applyRoute();
  }, [routeGeometry]);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />

      <div style={{
        position: 'absolute',
        top: 10,
        left: 50,
        zIndex: 500,
        pointerEvents: 'none',
        background: 'rgba(5,8,16,0.82)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 5,
        padding: '3px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text-secondary)',
        letterSpacing: '0.06em',
      }}>
        {ovationTimeLabel}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 52,
        right: 16,
        zIndex: 500,
        pointerEvents: 'none',
        background: 'rgba(5,8,16,0.85)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        padding: '8px 12px',
        minWidth: 148,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 6, letterSpacing: '0.12em' }}>
          AURORA PROBABILITY
        </div>
        <div style={{
          height: 8,
          borderRadius: 4,
          background: 'linear-gradient(to right, rgba(0,235,80,0.2), rgba(0,210,160,0.65), rgba(30,160,230,0.85), rgba(180,40,255,0.95))',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>Low</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>High</span>
        </div>
      </div>
    </div>
  );
}
