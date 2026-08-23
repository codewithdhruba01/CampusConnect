import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900- relative z-20 border-t border-white/5 py-16 text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row md:gap-6">
        {/* Left Side */}
        <div className="flex max-w-lg flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-purple-600">
              <BookOpen className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">Campus Connect</span>
          </div>

          <p className="text-sm leading-relaxed text-neutral-400">
            Your ultimate student community platform. No hidden fees, no tracking. One platform to
            create classrooms, chat in real-time, and collaborate with peers seamlessly.
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            built by{" "}
            <a
              href="#"
              className="text-blue-500 transition-colors hover:text-blue-400 hover:underline"
            >
              @codewithdhruba
            </a>
          </p>
        </div>

        {/* Right Side */}
        <div className="mt-2 flex flex-col items-start gap-4 md:mt-0 md:items-end">
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-white">
              <span>𝕏</span> @codewithdhruba
            </a>
            <a href="#" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-white">
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
