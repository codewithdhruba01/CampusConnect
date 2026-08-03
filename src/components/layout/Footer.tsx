import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          <span className="font-semibold text-white">Campus Connect</span>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Campus Connect. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
