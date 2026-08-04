import { motion } from "framer-motion";

import type { Message } from "@/types";

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col w-full ${isOwnMessage ? "items-end" : "items-start"} mb-1`}
    >
      <div className="relative group max-w-[75%]">
        <div className={`px-5 py-2.5 text-[15px] leading-relaxed ${
          isOwnMessage 
            ? "bg-[#2563eb] text-white rounded-[24px] rounded-br-[6px]" 
            : "bg-[#27272a] text-[#f4f4f5] rounded-[24px] rounded-bl-[6px]"
        }`}>
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}
