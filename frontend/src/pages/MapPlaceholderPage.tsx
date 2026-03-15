import { Link } from 'react-router-dom';

export default function MapPlaceholderPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground sm:px-6">
      <div className="bg-aurora-card w-full max-w-xl rounded-2xl p-8 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Map</p>
        <h1 className="font-heading mt-4 text-3xl font-bold sm:text-4xl">Map interface coming soon</h1>
        <p className="mt-5 text-muted">
          We are finalizing real-time overlays for auroral oval dynamics, cloud transparency, and route-aware forecast
          confidence.
        </p>
        <Link to="/" className="border-glow mt-8 inline-flex rounded-full px-6 py-3 text-sm font-medium hover:bg-white/5">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
