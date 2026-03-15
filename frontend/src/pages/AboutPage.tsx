import { Brain, Database, Radio, Satellite } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SiteFooter from '../components/SiteFooter';

const sources = [
  {
    icon: Satellite,
    title: 'ACE & DSCOVR Satellites',
    description: 'Real-time solar wind from NASA/NOAA L1 Lagrange point satellites',
  },
  {
    icon: Database,
    title: 'NOAA SWPC',
    description: 'Kp forecasts, storm warnings, and Ovation aurora model',
  },
  {
    icon: Brain,
    title: 'Machine Learning Models',
    description: 'Neural networks trained on decades of solar wind + geomagnetic data',
  },
  {
    icon: Radio,
    title: 'Ground Magnetometers',
    description: 'Global network providing real-time geomagnetic surface measurements',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="starfield relative overflow-hidden px-4 py-20 sm:px-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <Link to="/" className="inline-flex items-center text-sm text-muted transition hover:text-primary">
              ← Back to Home
            </Link>

            <ScrollReveal className="mt-12 max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary">ABOUT</p>
              <h1 className="text-gradient-aurora font-heading text-5xl font-bold tracking-tight sm:text-6xl">SWAAF</h1>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                SWAAF is a space weather intelligence platform focused on one mission: helping people understand,
                predict, and experience aurora events with scientific confidence.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-gradient-aurora px-4 py-20 sm:px-6">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Our Mission</h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              We believe aurora forecasting should be accessible to everyone, from first-time stargazers to
              astrophotographers planning expedition-level shoots.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              By combining real-time telemetry with predictive models, SWAAF turns complex heliophysics into clear,
              actionable decisions: when to go, where to look, and how long conditions are likely to hold.
            </p>
          </ScrollReveal>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">Data Sources</h2>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {sources.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 0.1} className="bg-aurora-card rounded-xl p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-aurora px-4 py-20 sm:px-6">
          <ScrollReveal className="mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Our Technology</h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              SWAAF ingests over 500,000 data points per hour across solar wind plasma streams, IMF polarity, Kp
              metrics, and magnetometer perturbations from global stations.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Our ensemble model blends short-horizon neural forecasts with physics-based propagation windows to build a
              72-hour outlook that stays grounded in known heliospheric behavior.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              We continuously track Bz trend persistence, Ovation oval movement, and local cloud cover integration to
              deliver forecasts that are both scientifically defensible and practical in the field.
            </p>
          </ScrollReveal>
        </section>

        <section className="px-4 py-20 text-center sm:px-6">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to Chase the Light?</h2>
            <Link
              to="/map"
              className="glow-green mt-8 inline-flex rounded-full bg-primary px-10 py-3 font-medium text-black transition hover:brightness-110"
            >
              Open Live Map
            </Link>
          </ScrollReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
