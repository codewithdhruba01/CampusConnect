import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        className={`pointer-events-auto flex w-full items-center justify-between transition-all duration-300 ${isScrolled
          ? "mt-4 max-w-3xl rounded-full border border-white/10 bg-neutral-950/80 px-6 py-3 shadow-2xl backdrop-blur-md"
          : "max-w-5xl border-b border-white/10 bg-transparent px-2 py-6"
          }`}
      >
        <motion.div layout className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <img src="/logo.png" alt="Campus Connect Logo" className="h-8 w-8 object-contain" />
            <span className="text-base text-white font-bricolage">Campus Connect</span>
          </Link>
        </motion.div>

        <motion.div layout className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium font-outfit text-neutral-400 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link to="/dashboard">
            <Button className="h-9 rounded-xl bg-white px-5 text-sm font-medium font-outfit text-black shadow-none transition-colors hover:bg-neutral-200">
              Dashboard
            </Button>
          </Link>
        </motion.div>
      </header>
    </div>
  );
}
