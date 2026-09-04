import type { ReactNode } from "react";
import { Volume2, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface VoiceNoteCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function VoiceNoteCard({ title, description, icon }: VoiceNoteCardProps) {
  // Waveform heights to create a varied, realistic look
  const waveformHeights = [4, 7, 4, 8, 5, 10, 7, 12, 16, 12, 7, 10, 5, 8, 4, 7, 4];

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

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            {icon}
          </div>
        </div>

        {/* Player Controls */}
        <div className="mt-auto flex items-center justify-between gap-3 rounded-full border border-border bg-background p-2 pl-4">
          <Volume2 className="h-5 w-5 text-muted-foreground" />

          {/* Waveform */}
          <div className="flex flex-1 items-center justify-center gap-[3px] overflow-hidden px-2">
            {waveformHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-foreground/50"
                style={{ height: `${height * 1.5}px` }}
                animate={{
                  height: [`${height * 1.5}px`, `${height * 2.2}px`, `${height * 1.5}px`],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105">
            <Pause className="h-5 w-5 fill-background text-background" />
          </button>
        </div>
      </div>
    </div>
  );
}
