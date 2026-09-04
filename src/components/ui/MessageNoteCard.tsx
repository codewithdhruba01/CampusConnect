import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface MessageNoteCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function MessageNoteCard({ title, description, icon }: MessageNoteCardProps) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-8">
      {/* Background Stack Cards */}
      <div className="absolute inset-x-8 top-0 h-full rounded-[2rem] border border-border bg-card/40 opacity-50 shadow-xl" />
      <div className="absolute inset-x-4 top-4 h-full rounded-[2rem] border border-border bg-card/60 opacity-80 shadow-xl" />

      {/* Main Front Card */}
      <div className="relative flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="mb-2 font-bricolage text-xl font-semibold text-foreground">{title}</h3>
            <p className="font-outfit text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>

        {/* Chat Bubbles Mockup */}
        <div className="relative mt-auto flex h-[116px] flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background p-4">
          {/* Bubble Left */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-[85%] self-start rounded-2xl rounded-tl-sm bg-foreground/10 p-3 text-xs text-muted-foreground"
          >
            <div className="mb-2 h-1.5 w-full rounded-full bg-foreground/20"></div>
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/20"></div>
          </motion.div>

          {/* Bubble Right (Typing) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex h-9 w-[60%] items-center justify-center gap-1.5 self-end rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-xs"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-white/80"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
