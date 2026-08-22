import { motion } from "framer-motion";
import { CheckCheck, FileText, Headphones, UserCircle } from "lucide-react";
import type { Message } from "@/types";

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  // Format the time
  const date = new Date(message.created_at);
  const time = isNaN(date.getTime()) 
    ? "8:35 AM" 
    : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Dummy avatar generation based on name
  const avatarUrl = message.user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.user?.name || "User")}&background=random`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      <div className={`flex items-end max-w-[85%] sm:max-w-[75%] gap-2 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800 shadow-sm border border-neutral-700/50">
          <img src={avatarUrl} alt={message.user?.name} className="w-full h-full object-cover" />
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col relative">
          <div className={`px-4 pt-2.5 pb-2 text-[15px] leading-relaxed relative shadow-sm ${
            isOwnMessage 
              ? "bg-[#ec4899] text-white rounded-[20px] rounded-br-sm" 
              : "bg-neutral-800 text-neutral-100 rounded-[20px] rounded-bl-sm" 
          }`}>
            
            {/* Name */}
            <div className={`text-[13px] font-medium mb-0.5 ${
              isOwnMessage ? "text-pink-100" : "text-neutral-400"
            }`}>
              {message.user?.name}
            </div>


            
            {/* Generic Attachment */}
            {message.attachment && (
              <div className="mb-2 mt-1">
                {message.attachment.type === 'image' && (
                  <div className="rounded-lg overflow-hidden border border-black/10">
                    <img 
                      src={message.attachment.url} 
                      alt="Attached" 
                      className="max-h-60 w-auto rounded-lg object-contain" 
                      loading="lazy"
                    />
                  </div>
                )}
                
                {message.attachment.type === 'document' && (
                  <div className={`flex items-center gap-3 p-3 rounded-xl border ${isOwnMessage ? 'bg-pink-600/30 border-pink-400/30 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-200'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isOwnMessage ? 'bg-pink-500/50' : 'bg-neutral-800'}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">{message.attachment.name}</p>
                      <p className="text-xs opacity-70">Document</p>
                    </div>
                  </div>
                )}
                
                {message.attachment.type === 'audio' && (
                  <div className={`flex flex-col gap-2 p-3 rounded-xl border ${isOwnMessage ? 'bg-pink-600/30 border-pink-400/30 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isOwnMessage ? 'bg-pink-500' : 'bg-purple-500'}`}>
                        <Headphones className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-medium truncate max-w-[150px]">{message.attachment.name}</p>
                    </div>
                    <audio controls className="h-8 max-w-[220px] rounded" src={message.attachment.url} />
                  </div>
                )}
                
                {message.attachment.type === 'contact' && (
                  <div className={`flex items-center gap-3 p-3 rounded-xl border ${isOwnMessage ? 'bg-pink-600/30 border-pink-400/30 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-200'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isOwnMessage ? 'bg-pink-500/50' : 'bg-orange-500/20 text-orange-400'}`}>
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">{message.attachment.name}</p>
                      <p className="text-xs opacity-70">Contact Card</p>
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
            <div className={`flex items-center gap-1 text-[11px] justify-end mt-1 ${isOwnMessage ? "text-pink-200" : "text-neutral-500"}`}>
              <span>{time}</span>
              {isOwnMessage && (
                <CheckCheck className="w-3.5 h-3.5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
