import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageItem } from "@/features/classrooms/components/MessageItem";
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
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      classroom_id: id || "unknown",
      user_id: mockUser.id,
      content: newMessage,
      created_at: new Date().toISOString(),
      user: mockUser
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950/50">
      {/* Header */}
      <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 font-bold">CS</span>
          </div>
          <div>
            <h1 className="font-semibold text-white">Computer Science 101</h1>
            <p className="text-xs text-neutral-400">124 members online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
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
            placeholder="Message Computer Science 101..." 
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
  );
}
