import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Reorder } from "framer-motion";
import { useParams } from "react-router-dom";
import { Send, Users, Info, Hash, BookOpen, Paperclip, ImageIcon, Smile, X, FileText, BarChart2, UserCircle, Headphones, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageItem } from "@/features/classrooms/components/MessageItem";
import { useClassrooms } from "@/hooks/useClassrooms";
import type { Message } from "@/types";

const mockUser = { id: "u-you", name: "You", email: "" };

export default function ClassroomView() {
  const { id } = useParams();
  const { classrooms } = useClassrooms();
  
  const currentClassroom = classrooms.find(c => c.id === id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState<{ type: 'image' | 'document' | 'audio' | 'contact' | 'poll'; url?: string; name?: string; size?: number; pollData?: { question: string; options: { text: string; votes: number }[] } } | null>(null);
  const [attachmentType, setAttachmentType] = useState<'image' | 'document' | 'audio' | 'contact'>('image');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const [showPollDialog, setShowPollDialog] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const generateId = () => Math.random().toString(36).substring(2, 9);
  const [pollOptions, setPollOptions] = useState([{ id: generateId(), text: "" }, { id: generateId(), text: "" }]);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(true);
  const [pollEmojiTarget, setPollEmojiTarget] = useState<'question' | number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAttachment({
          type: attachmentType,
          url: reader.result as string,
          name: file.name,
          size: file.size
        });
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
    setShowAttachmentMenu(false);
  };

  const triggerFileInput = (type: 'image' | 'document' | 'audio' | 'contact') => {
    setAttachmentType(type);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 10);
  };

  const getAcceptType = () => {
    switch (attachmentType) {
      case 'image': return 'image/*';
      case 'audio': return 'audio/*';
      case 'document': return '.pdf,.doc,.docx,.txt,.xls,.xlsx,.csv';
      case 'contact': return '.vcf,.csv';
      default: return '*/*';
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedAttachment) || !currentClassroom) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      classroom_id: currentClassroom.id,
      user_id: mockUser.id,
      content: newMessage,
      attachment: selectedAttachment || undefined,
      created_at: new Date().toISOString(),
      user: mockUser
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setSelectedAttachment(null);
    setShowEmojiPicker(false);
    setShowAttachmentMenu(false);
  };

  const handleSendPoll = () => {
    if (!pollQuestion.trim() || pollOptions.filter(o => o.text.trim()).length < 2 || !currentClassroom) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      classroom_id: currentClassroom.id,
      user_id: mockUser.id,
      content: "",
      attachment: {
        type: 'poll',
        pollData: {
          question: pollQuestion,
          options: pollOptions.filter(o => o.text.trim()).map(o => ({ text: o.text, votes: 0 })),
          allowMultipleAnswers
        }
      },
      created_at: new Date().toISOString(),
      user: mockUser
    };
    
    setMessages([...messages, newMsg]);
    setShowPollDialog(false);
    setPollQuestion("");
    setPollOptions([{ id: generateId(), text: "" }, { id: generateId(), text: "" }]);
    setAllowMultipleAnswers(true);
  };

  const handleVote = (messageId: string, optionIndex: number) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.attachment?.type === 'poll' && msg.attachment.pollData) {
        const newOptions = [...msg.attachment.pollData.options];
        newOptions[optionIndex].votes += 1;
        return {
          ...msg,
          attachment: {
            ...msg.attachment,
            pollData: {
              ...msg.attachment.pollData,
              options: newOptions
            }
          }
        };
      }
      return msg;
    }));
  };

  const onEmojiClick = (emojiData: { emoji: string }) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  const [showUsers, setShowUsers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowInfo(true)}
              className="text-neutral-400 hover:text-white"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-3 opacity-70">
              <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center">
                <Send className="w-6 h-6 text-neutral-600" />
              </div>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageItem 
                key={msg.id} 
                message={msg} 
                isOwnMessage={msg.user_id === mockUser.id} 
                onVote={handleVote}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-neutral-900/50 border-t border-neutral-800 backdrop-blur-md flex-shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col gap-3 relative">
            
            {/* Attachment Preview */}
            {selectedAttachment && (
              <div className="relative self-start rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/80 p-3 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 pr-12">
                <button 
                  onClick={() => setSelectedAttachment(null)}
                  className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {selectedAttachment.type === 'image' && (
                  <img src={selectedAttachment.url} alt="Selected preview" className="max-h-48 rounded-lg object-contain border border-white/10" />
                )}
                
                {selectedAttachment.type === 'document' && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate max-w-xs">{selectedAttachment.name}</p>
                      <p className="text-xs text-neutral-500">Document</p>
                    </div>
                  </>
                )}
                
                {selectedAttachment.type === 'audio' && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate max-w-xs">{selectedAttachment.name}</p>
                      <p className="text-xs text-neutral-500">Audio</p>
                    </div>
                  </>
                )}
                
                {selectedAttachment.type === 'contact' && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                      <UserCircle className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate max-w-xs">{selectedAttachment.name}</p>
                      <p className="text-xs text-neutral-500">Contact Card</p>
                    </div>
                  </>
                )}
                
                {selectedAttachment.type === 'poll' && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                      <BarChart2 className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate max-w-xs">{selectedAttachment.pollData?.question}</p>
                      <p className="text-xs text-neutral-500">Poll ({selectedAttachment.pollData?.options.length} options)</p>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {showEmojiPicker && (
              <div className="absolute bottom-[70px] right-4 z-50 animate-in fade-in zoom-in-95">
                <EmojiPicker 
                  onEmojiClick={onEmojiClick} 
                  theme={"dark" as any} 
                  width={320}
                  height={400}
                />
              </div>
            )}

            {/* Attachment Menu */}
            {showAttachmentMenu && (
              <div className="absolute bottom-[70px] left-2 z-50 bg-[#1e1e24] border border-white/10 rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 flex flex-col gap-1 w-48">
                <button type="button" className="flex items-center gap-3 w-full p-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left" onClick={() => triggerFileInput('document')}>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  Document
                </button>
                <button type="button" className="flex items-center gap-3 w-full p-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left" onClick={() => { setShowPollDialog(true); setShowAttachmentMenu(false); }}>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  Poll
                </button>
                <button type="button" className="flex items-center gap-3 w-full p-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left" onClick={() => triggerFileInput('contact')}>
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <UserCircle className="w-4 h-4" />
                  </div>
                  Contact
                </button>
                <button type="button" className="flex items-center gap-3 w-full p-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left" onClick={() => triggerFileInput('audio')}>
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Headphones className="w-4 h-4" />
                  </div>
                  Audio
                </button>
              </div>
            )}
            
            <form onSubmit={handleSendMessage} className="flex items-center bg-neutral-800/80 rounded-full px-2 py-1.5 shadow-sm border border-white/5 relative z-40">
              <input 
                type="file" 
                ref={fileInputRef} 
                accept={getAcceptType()} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              
              <button 
                type="button" 
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className={`p-2 transition-colors rounded-full hover:bg-white/5 flex-shrink-0 ${showAttachmentMenu ? "text-indigo-400 bg-white/5" : "text-neutral-400 hover:text-indigo-400"}`}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Your message" 
                className="flex-1 bg-transparent border-0 text-white placeholder:text-neutral-500 focus-visible:ring-0 shadow-none px-2 text-[15px]"
              />
              
              <div className="flex items-center gap-1 pr-1">
                <button 
                  type="button" 
                  onClick={() => triggerFileInput('image')}
                  className="p-2 text-neutral-400 hover:text-indigo-400 transition-colors rounded-full hover:bg-white/5 flex-shrink-0"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-2 transition-colors rounded-full hover:bg-white/5 flex-shrink-0 ${showEmojiPicker ? "text-indigo-400" : "text-neutral-400 hover:text-indigo-400"}`}
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button 
                  type="submit" 
                  disabled={!newMessage.trim() && !selectedAttachment}
                  className="p-2 text-indigo-500 hover:text-indigo-400 transition-colors rounded-full hover:bg-white/5 flex-shrink-0 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-indigo-500"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Users Sidebar */}
      {showUsers && (
        <aside className="w-72 border-l border-neutral-800 bg-neutral-900/30 flex flex-col flex-shrink-0 backdrop-blur-md">
          <div className="h-16 border-b border-neutral-800 flex items-center px-5 font-semibold text-white flex-shrink-0">
            Members ({currentClassroom.members_count})
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Current User */}
            {[mockUser].map((u) => (
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

      {/* Info Dialog */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Classroom Info</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400">Classroom ID (Invite Code)</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black p-3 rounded-md border border-neutral-800 text-lg font-mono text-center tracking-widest text-indigo-400 select-all">
                  {currentClassroom.id}
                </code>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center">Share this unique code with others so they can join.</p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Poll Dialog */}
      <Dialog open={showPollDialog} onOpenChange={setShowPollDialog}>
        <DialogContent className="bg-[#1f2326] border-0 text-white sm:max-w-[400px] p-0 overflow-hidden shadow-2xl rounded-2xl h-[90vh] sm:h-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-5 px-5 py-4 flex-shrink-0">
            <button onClick={() => setShowPollDialog(false)} className="text-neutral-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-[17px] font-normal text-neutral-100">Create poll</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pb-24">
            {/* Question */}
            <div className="px-6 py-4">
              <label className="text-[16px] font-medium text-neutral-200 block mb-4">Question</label>
              <div className="relative">
                <input 
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ask question"
                  className="w-full bg-transparent border-b border-neutral-700/80 focus:border-[#25D366] pb-2 text-[15px] text-white placeholder:text-neutral-500 outline-none transition-colors pr-8"
                />
                <Smile 
                  className="w-[18px] h-[18px] absolute right-0 top-0 text-neutral-400 cursor-pointer hover:text-white transition-colors" 
                  onClick={() => setPollEmojiTarget('question')}
                />
              </div>
            </div>

            {/* Options */}
            <div className="px-6 py-2 mt-2">
              <label className="text-[16px] font-medium text-neutral-200 block mb-5">Options</label>
              <Reorder.Group axis="y" values={pollOptions} onReorder={setPollOptions} className="space-y-5">
                {pollOptions.map((opt, i) => (
                  <Reorder.Item key={opt.id} value={opt} className="relative flex items-center gap-4 bg-[#1f2326]">
                    <div className="relative flex-1">
                      <input 
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...pollOptions];
                          newOpts[i].text = e.target.value;
                          setPollOptions(newOpts);
                          
                          if (i === pollOptions.length - 1 && e.target.value.trim() !== "" && pollOptions.length < 12) {
                            setPollOptions([...newOpts, { id: generateId(), text: "" }]);
                          }
                        }}
                        placeholder="Add text"
                        className="w-full bg-transparent border-b border-neutral-700/80 focus:border-[#25D366] pb-2 text-[15px] text-white placeholder:text-neutral-500 outline-none transition-colors pr-8"
                      />
                      <Smile 
                        className="w-[18px] h-[18px] absolute right-0 top-0 text-neutral-400 cursor-pointer hover:text-white transition-colors" 
                        onClick={() => setPollEmojiTarget(i)}
                      />
                    </div>
                    <GripHorizontal className="w-[18px] h-[18px] text-neutral-500 cursor-grab active:cursor-grabbing mb-2 hover:text-neutral-300" />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            {/* Multiple Answers Toggle */}
            <div className="px-6 py-6 mt-4 flex items-center justify-between border-t border-neutral-800/50">
              <span className="text-[15px] text-neutral-200">Allow multiple answers</span>
              <div 
                className={`w-10 h-[22px] rounded-full flex items-center px-[3px] cursor-pointer transition-colors duration-300 ${allowMultipleAnswers ? 'bg-[#25D366] justify-end' : 'bg-neutral-600 justify-start'}`}
                onClick={() => setAllowMultipleAnswers(!allowMultipleAnswers)}
              >
                <div className="w-[16px] h-[16px] bg-[#111b21] rounded-full shadow-sm" />
              </div>
            </div>
          </div>
          
          {/* Footer Area with Send Button */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#2a2f32]/80 backdrop-blur-md border-t border-neutral-800/30 flex items-center justify-end px-6">
            <button 
              disabled={!pollQuestion.trim() || pollOptions.filter(o => o.text.trim()).length < 2}
              onClick={handleSendPoll}
              className="absolute -top-6 right-6 w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 z-10"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
          
          {/* Internal Emoji Picker Modal */}
          {pollEmojiTarget !== null && (
            <div className="absolute z-50 bg-[#111b21] border border-neutral-700/50 shadow-2xl rounded-xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]">
              <div className="flex items-center justify-between px-3 py-2 bg-[#202c33] border-b border-neutral-700">
                <span className="text-sm font-medium text-neutral-300">Choose Emoji</span>
                <button onClick={() => setPollEmojiTarget(null)} className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <EmojiPicker 
                onEmojiClick={(emojiData) => {
                  if (pollEmojiTarget === 'question') {
                    setPollQuestion(prev => prev + emojiData.emoji);
                  } else if (typeof pollEmojiTarget === 'number') {
                    const newOpts = [...pollOptions];
                    newOpts[pollEmojiTarget].text += emojiData.emoji;
                    setPollOptions(newOpts);
                  }
                  setPollEmojiTarget(null);
                }} 
                theme={"dark" as any} 
                width={300}
                height={350}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
