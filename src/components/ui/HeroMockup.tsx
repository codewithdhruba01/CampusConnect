import { useState } from "react";
import { motion } from "framer-motion";
import {
  Paperclip,
  Smile,
  Send,
  PanelLeftClose,
  LayoutDashboard,
  Search,
  MoreVertical,
  LogIn,
  Plus,
} from "lucide-react";

type Tab = "dashboard" | "community" | "study-group" | "project-ideas";

export function HeroMockup() {
  const [activeTab, setActiveTab] = useState<Tab>("community");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-xl border-4 border-border bg-card/80 shadow-2xl backdrop-blur-xl"
    >
      {/* Window Header */}
      <div className="flex items-center border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-foreground/5 text-xs text-muted-foreground">
          campusconnect.app
        </div>
      </div>

      <div className="flex h-[600px] text-left">
        {/* Sidebar */}
        <div className="hidden w-1/3 max-w-[240px] flex-col border-r border-border bg-muted/30 p-4 sm:flex">
          <div className="mb-8 flex items-center justify-between text-foreground">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="2.5" fill="#A855F7" />
                <circle cx="12" cy="5" r="2.5" fill="#A855F7" />
                <circle cx="12" cy="19" r="2.5" fill="#A855F7" />
                <circle cx="6" cy="8.5" r="2.5" fill="#A855F7" />
                <circle cx="18" cy="8.5" r="2.5" fill="#A855F7" />
                <circle cx="6" cy="15.5" r="2.5" fill="#A855F7" />
                <circle cx="18" cy="15.5" r="2.5" fill="#A855F7" />
              </svg>
              <span className="text-base font-bold tracking-tight">Campus Connect</span>
            </div>
            <PanelLeftClose className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
          </div>

          <div className="space-y-6 text-sm text-muted-foreground">
            <div className="space-y-1">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                MAIN MENU
              </p>
              <div
                onClick={() => setActiveTab("dashboard")}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${activeTab === "dashboard" ? "bg-foreground/10 text-foreground" : "hover:bg-foreground/5 hover:text-foreground"}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                YOUR CLASSROOMS
              </p>
              <div
                onClick={() => setActiveTab("community")}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${activeTab === "community" ? "bg-foreground/10 text-foreground" : "hover:bg-foreground/5 hover:text-foreground"}`}
              >
                <img
                  src="/community/image1.png"
                  alt="Community"
                  className="h-4 w-4 rounded-sm object-cover"
                />
                <span># Community</span>
              </div>
              <div
                onClick={() => setActiveTab("study-group")}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${activeTab === "study-group" ? "bg-foreground/10 text-foreground" : "hover:bg-foreground/5 hover:text-foreground"}`}
              >
                <img
                  src="/community/image3.png"
                  alt="Study Group"
                  className="h-4 w-4 rounded-sm object-cover"
                />
                <span># Study Group</span>
              </div>
              <div
                onClick={() => setActiveTab("project-ideas")}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${activeTab === "project-ideas" ? "bg-foreground/10 text-foreground" : "hover:bg-foreground/5 hover:text-foreground"}`}
              >
                <img
                  src="/community/image2.png"
                  alt="Project Ideas"
                  className="h-4 w-4 rounded-sm object-cover"
                />
                <span># Project ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activeTab !== "dashboard" ? (
          <div className="flex flex-1 flex-col bg-background/50">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                {activeTab === "community" && (
                  <>
                    <img
                      src="/community/image1.png"
                      alt="Community"
                      className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">Community</h3>
                      <p className="text-xs text-muted-foreground">32 members online</p>
                    </div>
                  </>
                )}
                {activeTab === "study-group" && (
                  <>
                    <img
                      src="/community/image3.png"
                      alt="Study Group"
                      className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <h3 className="font-medium text-white">Study Group</h3>
                      <p className="text-xs text-neutral-400">12 members online</p>
                    </div>
                  </>
                )}
                {activeTab === "project-ideas" && (
                  <>
                    <img
                      src="/community/image2.png"
                      alt="Project Ideas"
                      className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <h3 className="font-medium text-white">Project Ideas</h3>
                      <p className="text-xs text-neutral-400">8 members online</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 hover:text-foreground">
                  <Search className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 flex-1 space-y-6 overflow-y-auto p-6">
              {activeTab === "community" && (
                <>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user1.png"
                      alt="JD"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      Hey everyone! Has anyone started working on the OS assignment?
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-start gap-3">
                    <img
                      src="/user/user4.png"
                      alt="Me"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-purple-500/50 ring-offset-2 ring-offset-neutral-900"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-primary p-3 text-sm text-primary-foreground shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                      Yeah, I just finished the first part. Let me know if you need help!
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user3.png"
                      alt="AS"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      That would be awesome. Let's hop on a call later tonight?
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-start gap-3">
                    <img
                      src="/user/user4.png"
                      alt="Me"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-purple-500/50 ring-offset-2 ring-offset-neutral-900"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-primary p-3 text-sm text-primary-foreground shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                      Sure, 8 PM works for me. Here's the link to the study material:{" "}
                      <span className="cursor-pointer text-purple-200 underline hover:text-white">
                        docs.campusconnect.app/os
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user2.png"
                      alt="RK"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      Thanks! See you both at 8. 🚀
                    </div>
                  </div>
                </>
              )}

              {activeTab === "study-group" && (
                <>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user1.png"
                      alt="SK"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      Did anyone understand the Database Normalization lecture today? I'm completely
                      lost on 3NF.
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-start gap-3">
                    <img
                      src="/user/user2.png"
                      alt="Me"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-purple-500/50 ring-offset-2 ring-offset-neutral-900"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-primary p-3 text-sm text-primary-foreground shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                      I think so! 3NF is basically removing transitive dependencies. So non-key
                      attributes shouldn't depend on other non-key attributes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user3.png"
                      alt="JD"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      Exactly. I have some handwritten notes with examples, I'll scan and send them
                      here.
                    </div>
                  </div>
                </>
              )}

              {activeTab === "project-ideas" && (
                <>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user2.png"
                      alt="RK"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      How about an AI-powered resume analyzer for our final year project?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src="/user/user3.png"
                      alt="AS"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-muted p-3 text-sm text-foreground shadow-sm">
                      That sounds cool, but it might be hard to train a good model from scratch in
                      just 2 months.
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-start gap-3">
                    <img
                      src="/user/user4.png"
                      alt="Me"
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-purple-500/50 ring-offset-2 ring-offset-neutral-900"
                    />
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-primary p-3 text-sm text-primary-foreground shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                      What if we use an existing API like Gemini and focus heavily on building a
                      great dashboard UI/UX instead of the model training part?
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 p-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
                  <Smile className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder={`Message #${activeTab === "community" ? "Community" : activeTab === "study-group" ? "Study Group" : "Project Ideas"}...`}
                  className="flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  disabled
                />
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-transform hover:scale-105">
                  <Send className="ml-0.5 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/10 flex-1 overflow-y-auto bg-background/50 p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5">
                  <LogIn className="h-3.5 w-3.5" />
                  Join Room
                </button>
                <button className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5">
                  <Plus className="h-3.5 w-3.5" />
                  Create Room
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-400">
                Your Classrooms
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {/* Community Card */}
                <div
                  onClick={() => setActiveTab("community")}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border bg-card p-5 transition-all hover:bg-muted hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <img
                      src="/community/image1.png"
                      alt="Community"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      32 Members
                    </span>
                  </div>
                  <h4 className="mb-1 text-lg font-semibold text-foreground transition-colors">
                    Community
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    General discussions, announcements
                  </p>
                </div>

                {/* Study Group Card */}
                <div
                  onClick={() => setActiveTab("study-group")}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border bg-card p-5 transition-all hover:bg-muted hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <img
                      src="/community/image3.png"
                      alt="Study Group"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      12 Members
                    </span>
                  </div>
                  <h4 className="mb-1 text-lg font-semibold text-foreground transition-colors">
                    Study Group
                  </h4>
                  <p className="text-sm text-muted-foreground">CS Last Min Study Group</p>
                </div>

                {/* Project Ideas Card */}
                <div
                  onClick={() => setActiveTab("project-ideas")}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border bg-card p-5 transition-all hover:bg-muted hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <img
                      src="/community/image2.png"
                      alt="Project Ideas"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      8 Members
                    </span>
                  </div>
                  <h4 className="mb-1 text-lg font-semibold text-foreground transition-colors">
                    Project Ideas
                  </h4>
                  <p className="text-sm text-muted-foreground">Brainstorming and collaboration</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-lg border-2 border-border bg-card p-4">
                  <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">JD</span> posted in{" "}
                    <span className="font-medium text-muted-foreground"># Community</span>
                  </p>
                  <span className="ml-auto text-xs text-muted-foreground">2h ago</span>
                </div>
                <div className="flex items-center gap-4 rounded-lg border-2 border-border bg-card p-4">
                  <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">AS</span> shared a file in{" "}
                    <span className="font-medium text-muted-foreground"># Study Group</span>
                  </p>
                  <span className="ml-auto text-xs text-muted-foreground">5h ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
