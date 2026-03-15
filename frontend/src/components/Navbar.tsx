import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Live Data', href: '#live-data' },
  { label: 'Alerts', href: '#alerts' },
  { label: 'Community', href: '#community' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg text-primary">✦</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs">AURORA PLATFORM</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((item) =>
            item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} className="text-sm text-foreground/85 transition hover:text-primary">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="text-sm text-foreground/85 transition hover:text-primary">
                {item.label}
              </Link>
            )
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex rounded-lg border border-white/10 p-2 text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-white/5 bg-background/95 px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((item) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-foreground/90 transition hover:bg-white/5 hover:text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-foreground/90 transition hover:bg-white/5 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
