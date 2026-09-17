import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 transition-all duration-300">
      <header
        className={`pointer-events-auto flex w-full flex-col justify-between transition-all duration-300 ${
          isScrolled
            ? "mt-4 max-w-3xl rounded-[2rem] border border-foreground/10 bg-background/80 px-6 py-3 shadow-2xl backdrop-blur-md"
            : "max-w-5xl border-b border-foreground/10 bg-transparent px-2 py-6"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <motion.div layout className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src="/logo.png" alt="Campus Connect Logo" className="h-8 w-8 object-contain" />
              <span className="font-bricolage text-base text-foreground sm:text-lg">
                Campus Connect
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div layout className="hidden items-center gap-4 md:flex">
            <ThemeToggle className="h-9 w-9 rounded-xl border border-transparent bg-transparent hover:border-foreground/20 hover:bg-accent hover:backdrop-blur-md" />
            <Link to="/login">
              <Button
                variant="ghost"
                className="h-9 rounded-xl border border-foreground/10 bg-transparent px-5 font-outfit text-sm font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:backdrop-blur-md"
              >
                Log in
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="h-9 rounded-xl bg-foreground px-5 font-outfit text-sm font-medium text-background shadow-none transition-colors hover:bg-foreground/90">
                Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <motion.div layout className="flex items-center gap-2 md:hidden">
            <ThemeToggle className="h-9 w-9 rounded-xl border border-transparent bg-transparent hover:border-foreground/20 hover:bg-accent hover:backdrop-blur-md" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 rounded-xl border border-transparent bg-transparent hover:border-foreground/20 hover:bg-accent hover:backdrop-blur-md"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-3 pb-2 pt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="h-11 w-full rounded-xl border border-foreground/10 bg-transparent font-outfit text-sm font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:backdrop-blur-md"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="h-11 w-full rounded-xl bg-foreground font-outfit text-sm font-medium text-background shadow-none transition-colors hover:bg-foreground/90">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
