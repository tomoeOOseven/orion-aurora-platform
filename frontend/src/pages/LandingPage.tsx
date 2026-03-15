import { motion } from 'framer-motion';
import { BarChart3, Bell, Globe, Map, Sun, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import LightPillar from '../components/LightPillar';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';
import SiteFooter from '../components/SiteFooter';

const features = [
  {
    icon: Map,
    title: 'Live Aurora Maps',
    description:
      'Interactive real-time maps showing aurora visibility across the globe with minute-by-minute updates.',
  },
  {
    icon: Sun,
    title: 'Solar Wind Monitoring',
    description:
      'Track solar wind speed, density, Bz component, and magnetic field orientation from satellite streams.',
  },
  {
    icon: Bell,
    title: 'Personalized Alerts',
    description: 'Get notified when aurora activity is predicted for your exact location and viewing conditions.',
  },
  {
    icon: BarChart3,
    title: 'Kp Index Forecasts',
    description: 'Advanced Kp index predictions powered by machine learning for 1-hour to 3-day forecasts.',
  },
  {
    icon: Globe,
    title: 'Ovation Model',
    description: 'NOAA Ovation aurora model integration showing the auroral oval in real time.',
  },
  {
    icon: Zap,
    title: 'CME Tracking',
    description: 'Coronal mass ejection detection and Earth-arrival time predictions for major geomagnetic storms.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
        <LightPillar topColor="#7eff29" bottomColor="#9ea1ff" pillarCount={5} pillarOpacity={0.18} />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm uppercase tracking-[0.3em] text-primary"
          >
            SWAAF
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          >
            <span className="text-gradient-aurora">Space Weather</span>
            <br />
            and Aurora Forecasting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-muted sm:text-lg"
          >
            Real-time mapping and predictive technology for aurora chasers and space weather enthusiasts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex w-full max-w-md flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row"
          >
            <Link
              to="/map"
              className="glow-green rounded-full bg-primary px-8 py-3 text-center font-medium text-black transition hover:brightness-110"
            >
              Explore Live Map
            </Link>
            <Link
              to="/about"
              className="border-glow rounded-full px-8 py-3 text-center font-medium text-foreground transition hover:bg-white/5"
            >
              About SWAAF
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-1">
            <motion.span
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.7 }}
            />
          </div>
        </div>
      </section>

      <section id="live-data" className="bg-gradient-aurora px-4 py-24 sm:px-6">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary">WHAT WE DO</p>
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
            Live aurora maps, solar wind data, and personalized alerts for your location.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            SWAAF combines satellite data, machine learning forecasts, and ground-based magnetometer readings to
            deliver the most accurate aurora predictions available right to your device.
          </p>
        </ScrollReveal>
      </section>

      <section id="alerts" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Powerful <span className="text-gradient-aurora">Features</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.1} className="bg-aurora-card rounded-xl p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:shadow-aurora">
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

      <section className="starfield relative overflow-hidden px-4 py-24 sm:px-6">
        <ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary">THE SCIENCE OF LIGHT</p>
          <h2 className="font-heading text-3xl font-bold sm:text-5xl">
            Every aurora begins 93 million miles away on the surface of the Sun.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Solar flares and coronal mass ejections hurl streams of magnetized plasma toward Earth. When these
            particles reach our magnetosphere, they ignite the sky. Predicting when and where this happens is our
            mission.
          </p>
        </ScrollReveal>
      </section>

      <section id="community" className="relative min-h-[70vh] overflow-hidden">
        <img
          src="https://source.unsplash.com/1600x900/?aurora,borealis"
          alt="Aurora over mountains"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-20 text-center sm:px-6">
          <ScrollReveal className="w-full">
            <h2 className="font-heading text-3xl font-bold sm:text-5xl">
              The <span className="text-gradient-aurora">Beauty</span> of the Aurora
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
              From Arctic coastlines to high-altitude valleys, the aurora reminds us that Earth is linked to a living,
              dynamic star. Each geomagnetic storm paints the upper atmosphere with impossible gradients of green,
              violet, and electric blue.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
              SWAAF exists to make those moments more accessible with scientific precision, predictive confidence, and
              a beautiful interface built for explorers of the night sky.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-24 text-center sm:px-6">
        <ScrollReveal className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to Chase the Light?</h2>
          <p className="mt-4 text-muted">Start exploring real-time aurora data today.</p>
          <Link
            to="/map"
            className="glow-green mt-8 inline-flex rounded-full bg-primary px-10 py-3 font-medium text-black transition hover:brightness-110"
          >
            Open Live Map →
          </Link>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </div>
  );
}
