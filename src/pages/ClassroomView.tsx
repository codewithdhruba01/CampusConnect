import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, Users, Info, Hash, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageItem } from "@/features/classrooms/components/MessageItem";
import { useClassrooms } from "@/hooks/useClassrooms";
import type { Message } from "@/types";

const mockUser = { id: "u-you", name: "You", email: "" };
const mockAlice = { id: "u-alice", name: "Alice", email: "" };
const mockBob = { id: "u-bob", name: "Bob", email: "" };
const mockCharlie = { id: "u-charlie", name: "Charlie", email: "" };

const mockMessages: Message[] = [
  { id: "1", classroom_id: "c-1", user_id: mockAlice.id, content: "Hey everyone! Has anyone started on the assignment?", created_at: new Date(Date.now() - 3600000).toISOString(), user: mockAlice },
  { id: "2", classroom_id: "c-1", user_id: mockBob.id, content: "Yeah, I'm about halfway through. The second part is tricky.", created_at: new Date(Date.now() - 3000000).toISOString(), user: mockBob },
  { id: "3", classroom_id: "c-1", user_id: mockCharlie.id, content: "I can share my notes from yesterday's lecture if it helps.", created_at: new Date(Date.now() - 1500000).toISOString(), user: mockCharlie },
];

export default function ClassroomView() {
  const { id } = useParams();
  const { classrooms } = useClassrooms();
  
  const currentClassroom = classrooms.find(c => c.id === id);

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentClassroom) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      classroom_id: currentClassroom.id,
      user_id: mockUser.id,
      content: newMessage,
      created_at: new Date().toISOString(),
      user: mockUser
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const [showUsers, setShowUsers] = useState(false);

  if (!currentClassroom) {
    return (
      <div className="flex flex-col h-full bg-neutral-950/50 items-center justify-center text-neutral-500">
        <BookOpen className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold text-white">Classroom not found</h2>
        <p>The classroom you're looking for doesn't exist.</p>
      </div>
    );
  }

  const color = currentClassroom.color || "bg-blue-500";

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col flex-1 min-w-0 bg-neutral-950/50">
        {/* Header */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center ${color}/20`}>
              {currentClassroom.profile_pic ? (
                <img src={currentClassroom.profile_pic} alt={currentClassroom.name} className="w-full h-full object-cover" />
              ) : (
                <span className={`text-${color.replace('bg-', '')} font-bold text-lg`}>
                  {currentClassroom.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-white">{currentClassroom.name}</h1>
                {currentClassroom.category && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {currentClassroom.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">{currentClassroom.members_count} members</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={showUsers ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setShowUsers(!showUsers)}
              className={showUsers ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <MessageItem 
              key={msg.id} 
              message={msg} 
              isOwnMessage={msg.user_id === mockUser.id} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-neutral-900/50 border-t border-neutral-800 backdrop-blur-md flex-shrink-0">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${currentClassroom.name}...`} 
              className="w-full bg-white/5 border-white/10 text-white h-12 pl-4 pr-12 rounded-full focus-visible:ring-purple-500"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!newMessage.trim()}
              className="absolute right-1 w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Users Sidebar */}
      {showUsers && (
        <aside className="w-72 border-l border-neutral-800 bg-neutral-900/30 flex flex-col flex-shrink-0 backdrop-blur-md">
          <div className="h-16 border-b border-neutral-800 flex items-center px-5 font-semibold text-white flex-shrink-0">
            Members ({currentClassroom.members_count})
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Using mock users for now */}
            {[mockUser, mockAlice, mockBob, mockCharlie].map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                  {u.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{u.name}</p>
                  <p className="text-xs text-neutral-500">{u.id === mockUser.id ? "You" : "Student"}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
