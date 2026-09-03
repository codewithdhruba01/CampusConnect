import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/ui/HeroMockup";

export function HeroSection() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium font-poppins text-purple-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
        </span>
        Welcome to Campus Connect
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-3xl font-extrabold font-bricolage tracking-tight text-transparent md:text-7xl"
      >
        Your Campus Community,{" "}
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Reimagined.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-2xl text-[#909092] leading-relaxed text-sm font-hanken md:text-lg font-regular"
      >
        Create classrooms, join discussions, and collaborate with peers in real-time. The ultimate
        platform for modern student communities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
      >
        <Link to="/dashboard">
          <Button
            size="lg"
            className="h-12 w-full rounded-xl bg-white px-8 text-base font-medium font-outfit text-black hover:bg-neutral-200 sm:w-auto"
          >
            Get started
          </Button>
        </Link>
        <Link to="/login">
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-8 text-base font-medium font-outfit text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30 sm:w-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            Log in
          </Button>
        </Link>
      </motion.div>

      <HeroMockup />
    </div>
  );
}
