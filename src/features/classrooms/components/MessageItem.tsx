import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "@/types";

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  const userName = message.user?.name || "Unknown User";
  const userInitial = userName.charAt(0);
  const timeString = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isOwnMessage ? "flex-row-reverse" : ""}`}
    >
      <Avatar className="h-8 w-8 mt-1 border border-neutral-800">
        <AvatarFallback className="bg-neutral-800 text-neutral-300 text-xs uppercase">
          {userInitial}
        </AvatarFallback>
      </Avatar>
      <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} max-w-[70%]`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-medium text-neutral-300">
            {isOwnMessage ? "You" : userName}
          </span>
          <span className="text-xs text-neutral-500">{timeString}</span>
        </div>
        <div className={`px-4 py-2 rounded-2xl text-sm ${
          isOwnMessage 
            ? "bg-purple-600 text-white rounded-tr-sm" 
            : "bg-white/10 text-neutral-100 rounded-tl-sm"
        }`}>
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}
