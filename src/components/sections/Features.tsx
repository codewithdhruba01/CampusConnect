import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Users } from "lucide-react";
import { FeatureCard } from "@/components/shared/FeatureCard";

export function FeaturesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      <FeatureCard
        icon={<BookOpen className="h-6 w-6 text-purple-400" />}
        title="Create Classrooms"
        description="Set up dedicated spaces for different subjects, study groups, or clubs instantly."
      />
      <FeatureCard
        icon={<MessageSquare className="h-6 w-6 text-blue-400" />}
        title="Real-time Chat"
        description="Message instantly with your peers. No delays, just seamless communication."
      />
      <FeatureCard
        icon={<Users className="h-6 w-6 text-pink-400" />}
        title="Open Community"
        description="Join any public classroom and start collaborating with students worldwide."
      />
    </motion.div>
  );
}
