import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Hash } from "lucide-react";
import type { Classroom, Message } from "@/types";
import { supabase } from "@/lib/supabase";

interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  const color = classroom.color || "bg-blue-500";
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchLatestMessage = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("classroom_id", classroom.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setLatestMessage(data[0] as Message);
      }
    };

    fetchLatestMessage();

    const channel = supabase
      .channel(`card-${classroom.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `classroom_id=eq.${classroom.id}`,
        },
        (payload) => {
          setLatestMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [classroom.id]);

  return (
    <Link to={`/classroom/${classroom.id}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ${color}/20 text-white`}
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
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-neutral-300">
            {classroom.members_count} members
          </span>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
          {classroom.name}
        </h3>
        {classroom.category && (
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-indigo-400">
            <Hash className="h-3.5 w-3.5" />
            {classroom.category}
          </div>
        )}
        {latestMessage ? (
          <div className="mt-2 flex-1 text-sm text-neutral-400">
            <span className="font-medium text-neutral-300">
              {latestMessage.user?.name?.split(' ')[0] || "Someone"}:{" "}
            </span>
            <span className="line-clamp-1 break-all">
              {latestMessage.content || (latestMessage.attachment ? `Shared a ${latestMessage.attachment.type}` : "Sent a message")}
            </span>
          </div>
        ) : (
          <p className="flex-1 text-sm text-neutral-400">
            {classroom.description ||
              "Join the discussion and collaborate with other members in real-time."}
          </p>
        )}
      </div>
    </Link>
  );
}
