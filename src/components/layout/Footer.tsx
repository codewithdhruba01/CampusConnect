import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-20 bg-neutral-900 text-neutral-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
        
        {/* Left Side */}
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-purple-600">
              <BookOpen className="h-4 w-4 text-white" />
            </span>
            <span className="font-semibold text-white text-lg tracking-tight">Campus Connect</span>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-400">
            Your ultimate student community platform. No hidden fees, no tracking. One platform to create classrooms, chat in real-time, and collaborate with peers seamlessly.
          </p>
          
          <p className="text-sm text-neutral-500 mt-1">
            built by <a href="#" className="text-blue-500 hover:underline hover:text-blue-400 transition-colors">@codewithdhruba</a>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-start md:items-end gap-4 mt-2 md:mt-0">
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              <span>𝕏</span> @codewithdhruba
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Self-host
            </a>
          </div>
          
          <div className="text-sm text-neutral-500 md:mt-6">
            &copy; {new Date().getFullYear()} Campus Connect
          </div>
        </div>

      </div>
    </footer>
  );
}
