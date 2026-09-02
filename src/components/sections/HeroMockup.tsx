import { motion } from "framer-motion";
import { Users, Paperclip, Smile, Send, PanelLeftClose } from "lucide-react";

export function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 shadow-2xl backdrop-blur-xl"
    >
      {/* Window Header */}
      <div className="flex items-center border-b border-white/5 bg-black/40 px-4 py-3">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-white/5 text-xs text-neutral-400">
          campusconnect.in
        </div>
      </div>

      <div className="flex h-[550px] text-left">
        {/* Sidebar */}
        <div className="hidden w-1/3 max-w-[240px] flex-col border-r border-white/5 bg-[#171717] p-4 sm:flex">
          <div className="mb-8 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <circle cx="12" cy="12" r="2.5" fill="#A855F7" />
                <circle cx="12" cy="5" r="2.5" fill="#A855F7" />
                <circle cx="12" cy="19" r="2.5" fill="#A855F7" />
                <circle cx="6" cy="8.5" r="2.5" fill="#A855F7" />
                <circle cx="18" cy="8.5" r="2.5" fill="#A855F7" />
                <circle cx="6" cy="15.5" r="2.5" fill="#A855F7" />
                <circle cx="18" cy="15.5" r="2.5" fill="#A855F7" />
              </svg>
              <span className="font-bold text-base tracking-tight">Campus Connect</span>
            </div>
            <PanelLeftClose className="h-5 w-5 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          <div className="space-y-6 text-sm text-neutral-400">
            <div className="space-y-1">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                MAIN MENU
              </p>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-white">
                <Users className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                YOUR CLASSROOMS
              </p>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-neutral-300">
                <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                <span># Community</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-neutral-300">
                <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
                <span># Study Group</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-neutral-300">
                <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
                <span># Project ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col bg-neutral-900/30">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Community</h3>
                <p className="text-xs text-neutral-400">32 members online</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-neutral-400">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-6 overflow-hidden p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                JD
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white/5 p-3 text-sm text-neutral-300 shadow-sm">
                Hey everyone! Has anyone started working on the OS assignment?
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/50 text-xs font-bold text-white ring-2 ring-purple-500/30 ring-offset-2 ring-offset-neutral-900">
                Me
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-purple-600 p-3 text-sm text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Yeah, I just finished the first part. Let me know if you need help!
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">
                AS
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white/5 p-3 text-sm text-neutral-300 shadow-sm">
                That would be awesome. Let's hop on a call later tonight?
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/50 text-xs font-bold text-white ring-2 ring-purple-500/30 ring-offset-2 ring-offset-neutral-900">
                Me
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-purple-600 p-3 text-sm text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                Sure, 8 PM works for me. Here's the link to the study material: <span className="cursor-pointer text-purple-200 underline hover:text-white">docs.campusconnect.app/os</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                RK
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white/5 p-3 text-sm text-neutral-300 shadow-sm">
                Thanks! See you both at 8. 🚀
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                <Paperclip className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                <Smile className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Message #general..."
                className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-neutral-500"
                disabled
              />
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-transform hover:scale-105">
                <Send className="ml-0.5 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
