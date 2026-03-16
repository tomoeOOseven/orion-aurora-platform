import React from 'react';
import ReactDOM from 'react-dom/client';
import SiteApp from './SiteApp';
import './index.css';

// Point Cesium's runtime asset loader to copied static assets.
(window as any).CESIUM_BASE_URL = '/cesium/Cesium';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SiteApp />
  </React.StrictMode>
);
