import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
            <BookOpen className="h-5 w-5 text-white" />
          </span>
          <span className="text-white">Campus Connect</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/dashboard">
            <Button className="bg-white text-black hover:bg-neutral-200 rounded-full px-5 h-9 font-medium shadow-none">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
