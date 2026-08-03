import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import type { Classroom } from "@/types";

interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  const color = classroom.color || "bg-blue-500";
  
  return (
    <Link to={`/classroom/${classroom.id}`} className="block group h-full">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}/20 text-white`}>
            <BookOpen className={`h-6 w-6 text-${color.replace('bg-', '')}`} />
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-neutral-300">
            {classroom.members_count} members
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {classroom.name}
        </h3>
        <p className="text-sm text-neutral-400 flex-1">
          {classroom.description || "Join the discussion and collaborate with other members in real-time."}
        </p>
      </div>
    </Link>
  );
}
