import { motion } from "framer-motion";
import { CheckCheck, FileText, Headphones, UserCircle, BarChart2 } from "lucide-react";
import type { Message } from "@/types";

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
  onVote?: (messageId: string, optionIndex: number) => void;
}

export function MessageItem({ message, isOwnMessage, onVote }: MessageItemProps) {
  // Format the time
  const date = new Date(message.created_at);
  const time = isNaN(date.getTime())
    ? "8:35 AM"
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Dummy avatar generation based on name
  const avatarUrl =
    message.user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(message.user?.name || "User")}&background=random`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`flex max-w-[85%] items-end gap-2 sm:max-w-[75%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Avatar */}
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-neutral-700/50 bg-neutral-800 shadow-sm">
          <img src={avatarUrl} alt={message.user?.name} className="h-full w-full object-cover" />
        </div>

        {/* Message Bubble */}
        <div className="relative flex flex-col">
          <div
            className={`relative px-4 pb-2 pt-2.5 text-[15px] leading-relaxed shadow-sm ${
              isOwnMessage
                ? "rounded-[20px] rounded-br-sm bg-[#ec4899] text-white"
                : "rounded-[20px] rounded-bl-sm bg-neutral-800 text-neutral-100"
            }`}
          >
            {/* Name */}
            <div
              className={`mb-0.5 text-[13px] font-medium ${
                isOwnMessage ? "text-pink-100" : "text-neutral-400"
              }`}
            >
              {message.user?.name}
            </div>

            {/* Generic Attachment */}
            {message.attachment && (
              <div className="mb-2 mt-1">
                {message.attachment.type === "image" && (
                  <div className="overflow-hidden rounded-lg border border-black/10">
                    <img
                      src={message.attachment.url}
                      alt="Attached"
                      className="max-h-60 w-auto rounded-lg object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {message.attachment.type === "document" && (
                  <div
                    className={`flex items-center gap-3 rounded-xl border p-3 ${isOwnMessage ? "border-pink-400/30 bg-pink-600/30 text-white" : "border-neutral-700 bg-neutral-900 text-neutral-200"}`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${isOwnMessage ? "bg-pink-500/50" : "bg-neutral-800"}`}
                    >
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-[180px] truncate text-sm font-medium sm:max-w-xs">
                        {message.attachment.name}
                      </p>
                      <p className="text-xs opacity-70">Document</p>
                    </div>
                  </div>
                )}

                {message.attachment.type === "audio" && (
                  <div
                    className={`flex flex-col gap-2 rounded-xl border p-3 ${isOwnMessage ? "border-pink-400/30 bg-pink-600/30 text-white" : "border-neutral-700 bg-neutral-900 text-neutral-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${isOwnMessage ? "bg-pink-500" : "bg-purple-500"}`}
                      >
                        <Headphones className="h-4 w-4 text-white" />
                      </div>
                      <p className="max-w-[150px] truncate text-sm font-medium">
                        {message.attachment.name}
                      </p>
                    </div>
                    <audio
                      controls
                      className="h-8 max-w-[220px] rounded"
                      src={message.attachment.url}
                    />
                  </div>
                )}

                {message.attachment.type === "contact" && (
                  <div
                    className={`flex items-center gap-3 rounded-xl border p-3 ${isOwnMessage ? "border-pink-400/30 bg-pink-600/30 text-white" : "border-neutral-700 bg-neutral-900 text-neutral-200"}`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${isOwnMessage ? "bg-pink-500/50" : "bg-orange-500/20 text-orange-400"}`}
                    >
                      <UserCircle className="h-6 w-6" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-[180px] truncate text-sm font-medium sm:max-w-xs">
                        {message.attachment.name}
                      </p>
                      <p className="text-xs opacity-70">Contact Card</p>
                    </div>
                  </div>
                )}

                {message.attachment.type === "poll" && message.attachment.pollData && (
                  <div
                    className={`flex min-w-[200px] flex-col gap-3 rounded-xl border p-4 sm:min-w-[250px] ${isOwnMessage ? "border-pink-400/30 bg-pink-600/30" : "border-neutral-700 bg-neutral-900"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${isOwnMessage ? "bg-pink-500" : "bg-green-500/20 text-green-400"}`}
                      >
                        <BarChart2 className="h-4 w-4" />
                      </div>
                      <p className="text-[15px] font-medium leading-snug">
                        {message.attachment.pollData.question}
                      </p>
                    </div>
                    <div className="mt-1 flex w-full flex-col gap-2">
                      {message.attachment.pollData.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => onVote && onVote(message.id, i)}
                          className={`flex w-full items-center justify-between rounded-lg border p-2.5 text-left text-sm transition-colors ${isOwnMessage ? "border-pink-400/30 hover:bg-pink-500/20" : "border-neutral-700 hover:bg-neutral-800"}`}
                        >
                          <span className="truncate pr-2">{opt.text}</span>
                          <span className="flex-shrink-0 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-medium opacity-70">
                            {opt.votes} votes
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            {message.content && (
              <div className="mb-1 text-[14px] sm:text-[15px]">{message.content}</div>
            )}

            {/* Time and Status */}
            <div
              className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${isOwnMessage ? "text-pink-200" : "text-neutral-500"}`}
            >
              <span>{time}</span>
              {isOwnMessage && <CheckCheck className="h-3.5 w-3.5" />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
