import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <img src="/logo.png" alt="Campus Connect Logo" className="h-8 w-8 object-contain" />
          <span className="text-white">Campus Connect</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link to="/dashboard">
            <Button className="h-9 rounded-full bg-white px-5 font-medium text-black shadow-none hover:bg-neutral-200">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
