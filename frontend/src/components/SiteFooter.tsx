import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted">© 2026 SWAAF. Space Weather and Aurora Forecasting.</p>
        <div className="flex items-center gap-5 text-sm text-foreground/90">
          <Link to="/about" className="transition hover:text-primary">
            About
          </Link>
          <a href="#" className="transition hover:text-primary">
            Privacy
          </a>
          <a href="#" className="transition hover:text-primary">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
