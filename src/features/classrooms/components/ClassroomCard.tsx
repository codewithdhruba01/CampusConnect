import { Link } from "react-router-dom";
import { BookOpen, Hash } from "lucide-react";
import type { Classroom } from "@/types";

interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  const color = classroom.color || "bg-blue-500";

  return (
    <Link to={`/classroom/${classroom.id}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 backdrop-blur-sm transition-colors hover:bg-muted">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ${color}/20 text-foreground`}
          >
            {classroom.profile_pic ? (
              <img
                src={classroom.profile_pic}
                alt={classroom.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <BookOpen className={`h-6 w-6 text-${color.replace("bg-", "")}`} />
            )}
          </div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {classroom.members_count} members
          </span>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {classroom.name}
        </h3>
        {classroom.category && (
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-indigo-400">
            <Hash className="h-3.5 w-3.5" />
            {classroom.category}
          </div>
        )}
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {classroom.description ||
            "Join the discussion and collaborate with other members in real-time."}
        </p>
      </div>
    </Link>
  );
}
