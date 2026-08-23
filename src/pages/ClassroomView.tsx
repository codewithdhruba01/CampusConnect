import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Reorder } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Send,
  Users,
  Info,
  Hash,
  BookOpen,
  Paperclip,
  ImageIcon,
  Smile,
  X,
  FileText,
  BarChart2,
  UserCircle,
  Headphones,
  GripHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageItem } from "@/features/classrooms/components/MessageItem";
import { useClassrooms } from "@/hooks/useClassrooms";
import type { Message } from "@/types";

const mockUser = { id: "u-you", name: "You", email: "" };

export default function ClassroomView() {
  const { id } = useParams();
  const { classrooms } = useClassrooms();

  const currentClassroom = classrooms.find((c) => c.id === id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState<{
    type: "image" | "document" | "audio" | "contact" | "poll";
    url?: string;
    name?: string;
    size?: number;
    pollData?: { question: string; options: { text: string; votes: number }[] };
  } | null>(null);
  const [attachmentType, setAttachmentType] = useState<"image" | "document" | "audio" | "contact">(
    "image"
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const [showPollDialog, setShowPollDialog] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const generateId = () => Math.random().toString(36).substring(2, 9);
  const [pollOptions, setPollOptions] = useState([
    { id: generateId(), text: "" },
    { id: generateId(), text: "" },
  ]);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(true);
  const [pollEmojiTarget, setPollEmojiTarget] = useState<"question" | number | null>(null);

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
          size: file.size,
        });
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = "";
    setShowAttachmentMenu(false);
  };

  const triggerFileInput = (type: "image" | "document" | "audio" | "contact") => {
    setAttachmentType(type);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 10);
  };

  const getAcceptType = () => {
    switch (attachmentType) {
      case "image":
        return "image/*";
      case "audio":
        return "audio/*";
      case "document":
        return ".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv";
      case "contact":
        return ".vcf,.csv";
      default:
        return "*/*";
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
      user: mockUser,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setSelectedAttachment(null);
    setShowEmojiPicker(false);
    setShowAttachmentMenu(false);
  };

  const handleSendPoll = () => {
    if (
      !pollQuestion.trim() ||
      pollOptions.filter((o) => o.text.trim()).length < 2 ||
      !currentClassroom
    )
      return;

    const newMsg: Message = {
      id: Date.now().toString(),
      classroom_id: currentClassroom.id,
      user_id: mockUser.id,
      content: "",
      attachment: {
        type: "poll",
        pollData: {
          question: pollQuestion,
          options: pollOptions
            .filter((o) => o.text.trim())
            .map((o) => ({ text: o.text, votes: 0 })),
          allowMultipleAnswers,
        },
      },
      created_at: new Date().toISOString(),
      user: mockUser,
    };

    setMessages([...messages, newMsg]);
    setShowPollDialog(false);
    setPollQuestion("");
    setPollOptions([
      { id: generateId(), text: "" },
      { id: generateId(), text: "" },
    ]);
    setAllowMultipleAnswers(true);
  };

  const handleVote = (messageId: string, optionIndex: number) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId && msg.attachment?.type === "poll" && msg.attachment.pollData) {
          const newOptions = [...msg.attachment.pollData.options];
          newOptions[optionIndex].votes += 1;
          return {
            ...msg,
            attachment: {
              ...msg.attachment,
              pollData: {
                ...msg.attachment.pollData,
                options: newOptions,
              },
            },
          };
        }
        return msg;
      })
    );
  };

  const onEmojiClick = (emojiData: { emoji: string }) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const [showUsers, setShowUsers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (!currentClassroom) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-neutral-950/50 text-neutral-500">
        <BookOpen className="mb-4 h-12 w-12 opacity-50" />
        <h2 className="text-xl font-semibold text-white">Classroom not found</h2>
        <p>The classroom you're looking for doesn't exist.</p>
      </div>
    );
  }

  const color = currentClassroom.color || "bg-blue-500";

  return (
    <div className="flex h-full w-full">
      <div className="flex min-w-0 flex-1 flex-col bg-neutral-950/50">
        {/* Header */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-900/50 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ${color}/20`}
            >
              {currentClassroom.profile_pic ? (
                <img
                  src={currentClassroom.profile_pic}
                  alt={currentClassroom.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className={`text-${color.replace("bg-", "")} text-lg font-bold`}>
                  {currentClassroom.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-white">{currentClassroom.name}</h1>
                {currentClassroom.category && (
                  <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    <Hash className="h-3 w-3" />
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
        <div className="flex-1 space-y-6 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-neutral-500 opacity-70">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800/50">
                <Send className="h-6 w-6 text-neutral-600" />
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
        <div className="flex-shrink-0 border-t border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-md">
          <div className="relative mx-auto flex max-w-4xl flex-col gap-3">
            {/* Attachment Preview */}
            {selectedAttachment && (
              <div className="animate-in fade-in slide-in-from-bottom-2 relative flex items-center gap-3 self-start overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 pr-12 shadow-lg backdrop-blur-sm">
                <button
                  onClick={() => setSelectedAttachment(null)}
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black"
                >
                  <X className="h-4 w-4" />
                </button>

                {selectedAttachment.type === "image" && (
                  <img
                    src={selectedAttachment.url}
                    alt="Selected preview"
                    className="max-h-48 rounded-lg border border-white/10 object-contain"
                  />
                )}

                {selectedAttachment.type === "document" && (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-xs truncate text-sm font-medium text-white">
                        {selectedAttachment.name}
                      </p>
                      <p className="text-xs text-neutral-500">Document</p>
                    </div>
                  </>
                )}

                {selectedAttachment.type === "audio" && (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-xs truncate text-sm font-medium text-white">
                        {selectedAttachment.name}
                      </p>
                      <p className="text-xs text-neutral-500">Audio</p>
                    </div>
                  </>
                )}

                {selectedAttachment.type === "contact" && (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                      <UserCircle className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-xs truncate text-sm font-medium text-white">
                        {selectedAttachment.name}
                      </p>
                      <p className="text-xs text-neutral-500">Contact Card</p>
                    </div>
                  </>
                )}

                {selectedAttachment.type === "poll" && (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="max-w-xs truncate text-sm font-medium text-white">
                        {selectedAttachment.pollData?.question}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Poll ({selectedAttachment.pollData?.options.length} options)
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {showEmojiPicker && (
              <div className="animate-in fade-in zoom-in-95 absolute bottom-[70px] right-4 z-50">
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
              <div className="animate-in fade-in zoom-in-95 absolute bottom-[70px] left-2 z-50 flex w-48 flex-col gap-1 rounded-2xl border border-white/10 bg-[#1e1e24] p-2 shadow-2xl">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => triggerFileInput("document")}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  Document
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => {
                    setShowPollDialog(true);
                    setShowAttachmentMenu(false);
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  Poll
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => triggerFileInput("contact")}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  Contact
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => triggerFileInput("audio")}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                    <Headphones className="h-4 w-4" />
                  </div>
                  Audio
                </button>
              </div>
            )}

            <form
              onSubmit={handleSendMessage}
              className="relative z-40 flex items-center rounded-full border border-white/5 bg-neutral-800/80 px-2 py-1.5 shadow-sm"
            >
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
                className={`flex-shrink-0 rounded-full p-2 transition-colors hover:bg-white/5 ${showAttachmentMenu ? "bg-white/5 text-indigo-400" : "text-neutral-400 hover:text-indigo-400"}`}
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Your message"
                className="flex-1 border-0 bg-transparent px-2 text-[15px] text-white shadow-none placeholder:text-neutral-500 focus-visible:ring-0"
              />

              <div className="flex items-center gap-1 pr-1">
                <button
                  type="button"
                  onClick={() => triggerFileInput("image")}
                  className="flex-shrink-0 rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-indigo-400"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`flex-shrink-0 rounded-full p-2 transition-colors hover:bg-white/5 ${showEmojiPicker ? "text-indigo-400" : "text-neutral-400 hover:text-indigo-400"}`}
                >
                  <Smile className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim() && !selectedAttachment}
                  className="flex-shrink-0 rounded-full p-2 text-indigo-500 transition-colors hover:bg-white/5 hover:text-indigo-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-indigo-500"
                >
                  <Send className="ml-0.5 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Users Sidebar */}
      {showUsers && (
        <aside className="flex w-72 flex-shrink-0 flex-col border-l border-neutral-800 bg-neutral-900/30 backdrop-blur-md">
          <div className="flex h-16 flex-shrink-0 items-center border-b border-neutral-800 px-5 font-semibold text-white">
            Members ({currentClassroom.members_count})
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Members List */}
            {(currentClassroom.members && currentClassroom.members.length > 0
              ? currentClassroom.members
              : [mockUser]
            ).map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-400">
                  {u.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{u.name}</p>
                  <p className="text-xs text-neutral-500">
                    {u.id === mockUser.id ? "You" : "Student"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Info Dialog */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="border-neutral-800 bg-neutral-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Classroom Info</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400">Classroom ID (Invite Code)</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 select-all rounded-md border border-neutral-800 bg-black p-3 text-center font-mono text-lg tracking-widest text-indigo-400">
                  {currentClassroom.id}
                </code>
              </div>
            </div>
            <p className="text-center text-xs text-neutral-500">
              Share this unique code with others so they can join.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Poll Dialog */}
      <Dialog open={showPollDialog} onOpenChange={setShowPollDialog}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[90vh] flex-col overflow-hidden rounded-2xl border-0 bg-[#1f2326] p-0 text-white shadow-2xl ring-0 sm:h-auto sm:max-w-[400px]"
        >
          {/* Header */}
          <div className="flex flex-shrink-0 items-center gap-5 px-5 py-4">
            <button
              onClick={() => setShowPollDialog(false)}
              className="text-neutral-400 transition-colors hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-[17px] font-normal text-neutral-100">Create poll</h2>
          </div>

          <div className="flex-1 overflow-y-auto pb-24">
            {/* Question */}
            <div className="px-6 py-4">
              <label className="mb-4 block text-[16px] font-medium text-neutral-200">
                Question
              </label>
              <div className="relative">
                <input
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ask question"
                  className="w-full border-b border-neutral-700/80 bg-transparent pb-2 pr-8 text-[15px] text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#25D366]"
                />
                <Smile
                  className="absolute right-0 top-0 h-[18px] w-[18px] cursor-pointer text-neutral-400 transition-colors hover:text-white"
                  onClick={() => setPollEmojiTarget("question")}
                />
              </div>
            </div>

            {/* Options */}
            <div className="mt-2 px-6 py-2">
              <label className="mb-5 block text-[16px] font-medium text-neutral-200">Options</label>
              <Reorder.Group
                axis="y"
                values={pollOptions}
                onReorder={setPollOptions}
                className="space-y-5"
              >
                {pollOptions.map((opt, i) => (
                  <Reorder.Item
                    key={opt.id}
                    value={opt}
                    className="relative flex items-center gap-4 bg-[#1f2326]"
                  >
                    <div className="relative flex-1">
                      <input
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...pollOptions];
                          newOpts[i].text = e.target.value;
                          setPollOptions(newOpts);

                          if (
                            i === pollOptions.length - 1 &&
                            e.target.value.trim() !== "" &&
                            pollOptions.length < 12
                          ) {
                            setPollOptions([...newOpts, { id: generateId(), text: "" }]);
                          }
                        }}
                        placeholder="Add text"
                        className="w-full border-b border-neutral-700/80 bg-transparent pb-2 pr-8 text-[15px] text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#25D366]"
                      />
                      <Smile
                        className="absolute right-0 top-0 h-[18px] w-[18px] cursor-pointer text-neutral-400 transition-colors hover:text-white"
                        onClick={() => setPollEmojiTarget(i)}
                      />
                    </div>
                    <GripHorizontal className="mb-2 h-[18px] w-[18px] cursor-grab text-neutral-500 hover:text-neutral-300 active:cursor-grabbing" />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            {/* Multiple Answers Toggle */}
            <div className="mt-4 flex items-center justify-between border-t border-neutral-800/50 px-6 py-6">
              <span className="text-[15px] text-neutral-200">Allow multiple answers</span>
              <div
                className={`flex h-[22px] w-10 cursor-pointer items-center rounded-full px-[3px] transition-colors duration-300 ${allowMultipleAnswers ? "justify-end bg-[#25D366]" : "justify-start bg-neutral-600"}`}
                onClick={() => setAllowMultipleAnswers(!allowMultipleAnswers)}
              >
                <div className="h-[16px] w-[16px] rounded-full bg-[#111b21] shadow-sm" />
              </div>
            </div>
          </div>

          {/* Footer Area with Send Button */}
          <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-end border-t border-neutral-800/30 px-6 backdrop-blur-md">
            <button
              disabled={!pollQuestion.trim() || pollOptions.filter((o) => o.text.trim()).length < 2}
              onClick={handleSendPoll}
              className="absolute -top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg transition-all duration-300 hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="ml-1 h-5 w-5" />
            </button>
          </div>

          {/* Internal Emoji Picker Modal */}
          {pollEmojiTarget !== null && (
            <div className="absolute left-1/2 top-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-neutral-700/50 bg-[#111b21] shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-700 bg-[#202c33] px-3 py-2">
                <span className="text-sm font-medium text-neutral-300">Choose Emoji</span>
                <button
                  onClick={() => setPollEmojiTarget(null)}
                  className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  if (pollEmojiTarget === "question") {
                    setPollQuestion((prev) => prev + emojiData.emoji);
                  } else if (typeof pollEmojiTarget === "number") {
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
