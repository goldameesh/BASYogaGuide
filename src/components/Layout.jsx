import { Outlet, Link, useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/faqs", label: "FAQs" },
  { to: "/disclaimers", label: "Disclaimers" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C12 2 8 6 8 10C8 12 9 14 12 16C15 14 16 12 16 10C16 6 12 2 12 2Z" />
                <path d="M12 16V22" />
                <path d="M8 20H16" />
              </svg>
            </div>
            <span className="font-heading text-lg font-semibold tracking-tight">Yoga Asana Guide</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <NotificationBell />

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <nav className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} <a href="https://bhramaastraadvisory.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Bhramaastra Advisory Services</a> — For educational purposes only
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Researched by BAS Intelligence Team and Built with 💛 by Amish
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/faqs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
              <Link to="/disclaimers" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Disclaimers</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}