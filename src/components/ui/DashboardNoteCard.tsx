import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardNoteCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function DashboardNoteCard({ title, description, icon }: DashboardNoteCardProps) {
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

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            {icon}
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-auto flex h-[116px] w-full overflow-hidden rounded-xl border border-border bg-background">
          {/* Sidebar */}
          <div className="flex w-1/4 flex-col gap-3 border-r border-border bg-foreground/5 p-3">
            <div className="h-2 w-full rounded-full bg-foreground/20"></div>
            <div className="h-2 w-3/4 rounded-full bg-foreground/10"></div>
            <div className="h-2 w-5/6 rounded-full bg-foreground/10"></div>
          </div>
          {/* Main Area */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="h-2.5 w-1/3 rounded-full bg-purple-500/50"></div>
            <div className="mt-1 flex grid flex-1 grid-cols-2 gap-2">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-lg border border-border bg-foreground/5"
              ></motion.div>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                className="rounded-lg border border-border bg-foreground/5"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
