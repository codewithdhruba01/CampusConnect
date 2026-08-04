import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        Welcome to Campus Connect
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
      >
        Your Campus Community,{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Reimagined.
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
      >
        Create classrooms, join discussions, and collaborate with peers in real-time. The ultimate platform for modern student communities.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <Link to="/dashboard">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto shadow-[0_0_40px_rgba(147,51,234,0.3)] transition-all hover:shadow-[0_0_60px_rgba(147,51,234,0.5)]">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/login">
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto border-white/10 hover:bg-white/5 bg-transparent text-white">
            Log In
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
