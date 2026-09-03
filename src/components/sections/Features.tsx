import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Users } from "lucide-react";
import { VoiceNoteCard } from "@/components/ui/VoiceNoteCard";
import { DashboardNoteCard } from "@/components/ui/DashboardNoteCard";
import { MessageNoteCard } from "@/components/ui/MessageNoteCard";

export function FeaturesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="mt-32 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8"
    >
      <DashboardNoteCard
        icon={<BookOpen className="h-6 w-6" />}
        title="Create Classrooms"
        description="Set up dedicated spaces for different subjects, study groups, or clubs instantly."
      />
      <MessageNoteCard
        icon={<MessageSquare className="h-6 w-6" />}
        title="Real-time Chat"
        description="Message instantly with your peers. No delays, just seamless communication."
      />
      <VoiceNoteCard
        icon={<Users className="h-6 w-6" />}
        title="Open Community"
        description="Join any public classroom and start collaborating with students worldwide."
      />
    </motion.div>
  );
}
