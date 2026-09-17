import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Database,
  Globe2,
  Layers3,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StackCategory = "Frontend" | "Backend" | "Database" | "DevOps";

type StackOption = {
  name: string;
  category: StackCategory;
  description: string;
  color: string;
};

type RoadmapDetail = {
  topics: string[];
  practice: string;
  outcome: string;
};

const categories: { name: StackCategory; icon: typeof Code2 }[] = [
  { name: "Frontend", icon: Code2 },
  { name: "Backend", icon: Layers3 },
  { name: "Database", icon: Database },
  { name: "DevOps", icon: Globe2 },
];

const stackOptions: StackOption[] = [
  {
    name: "React",
    category: "Frontend",
    description: "Build interactive web interfaces",
    color: "bg-sky-500",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "Full-stack React framework",
    color: "bg-slate-900",
  },
  {
    name: "Vue",
    category: "Frontend",
    description: "Progressive JavaScript framework",
    color: "bg-emerald-500",
  },
  {
    name: "Angular",
    category: "Frontend",
    description: "Enterprise-ready web apps",
    color: "bg-red-500",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for servers",
    color: "bg-green-600",
  },
  {
    name: "Python",
    category: "Backend",
    description: "Versatile language for backend and AI",
    color: "bg-yellow-500",
  },
  {
    name: "Go",
    category: "Backend",
    description: "Fast, simple, reliable services",
    color: "bg-cyan-500",
  },
  {
    name: "Java",
    category: "Backend",
    description: "Robust apps at any scale",
    color: "bg-orange-500",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Powerful open-source SQL database",
    color: "bg-blue-600",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Flexible document database",
    color: "bg-lime-600",
  },
  {
    name: "Supabase",
    category: "Database",
    description: "Open-source Firebase alternative",
    color: "bg-emerald-600",
  },
  {
    name: "Redis",
    category: "Database",
    description: "In-memory data store and cache",
    color: "bg-red-600",
  },
  {
    name: "Docker",
    category: "DevOps",
    description: "Consistent app containers",
    color: "bg-blue-500",
  },
  {
    name: "AWS",
    category: "DevOps",
    description: "Cloud infrastructure and services",
    color: "bg-orange-400",
  },
  {
    name: "GitHub Actions",
    category: "DevOps",
    description: "Automate your development workflow",
    color: "bg-slate-700",
  },
  {
    name: "Vercel",
    category: "DevOps",
    description: "Deploy frontend apps instantly",
    color: "bg-black",
  },
];

export default function Roadmap() {
  const [activeCategory, setActiveCategory] = useState<StackCategory>("Frontend");
  const [selectedStacks, setSelectedStacks] = useState<string[]>([
    "React",
    "Node.js",
    "PostgreSQL",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const visibleOptions = useMemo(
    () =>
      stackOptions.filter(
        (option) =>
          option.category === activeCategory &&
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [activeCategory, searchTerm]
  );

  const selectedOptions = stackOptions.filter((option) => selectedStacks.includes(option.name));

  const toggleStack = (stackName: string) => {
    setSelectedStacks((current) =>
      current.includes(stackName)
        ? current.filter((name) => name !== stackName)
        : [...current, stackName]
    );
    setIsGenerated(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-full p-5 sm:p-8 lg:p-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Your learning path
            </div>
            <h1 className="font-bricolage text-3xl font-bold tracking-tight sm:text-4xl">
              Build your tech roadmap
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Choose the technologies you want to learn. We&apos;ll arrange them into a focused
              path.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Selected stack</p>
              <p className="font-semibold">{selectedStacks.length} technologies</p>
            </div>
          </div>
        </motion.div>

        {isGenerated ? (
          <RoadmapResult selectedOptions={selectedOptions} onEdit={() => setIsGenerated(false)} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)]">
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold">Select your stack</h2>
                  <p className="text-sm text-muted-foreground">
                    Pick one or more technologies to include.
                  </p>
                </div>
                <div className="relative w-full sm:w-52">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search stack..."
                    className="h-9 pl-9"
                  />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {categories.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setActiveCategory(name);
                      setSearchTerm("");
                    }}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors ${
                      activeCategory === name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {visibleOptions.map((option) => {
                  const isSelected = selectedStacks.includes(option.name);
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => toggleStack(option.name)}
                      aria-pressed={isSelected}
                      className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-muted/60"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${option.color}`}
                      >
                        {option.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{option.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
              {visibleOptions.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No technologies match your search.
                </p>
              )}
            </section>

            <aside className="flex flex-col rounded-2xl border border-border bg-foreground p-5 text-background shadow-sm sm:p-6">
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-background/60">Your custom roadmap</p>
                <h2 className="font-bricolage text-2xl font-bold">
                  {isGenerated ? "Path ready" : "Make it yours"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-background/65">
                  {isGenerated
                    ? "Your learning path is based on the technologies you selected."
                    : "Select technologies from the left to create a learning path that fits your goals."}
                </p>
              </div>

              <div className="mb-6 flex-1 space-y-2">
                {selectedOptions.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-background/20 px-4 py-8 text-center text-sm text-background/50">
                    Your selected technologies will appear here.
                  </div>
                ) : (
                  selectedOptions.map((option, index) => (
                    <motion.div
                      layout
                      key={option.name}
                      className="flex items-center gap-3 rounded-xl bg-background/10 px-3 py-2.5"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 text-xs font-semibold text-background/70">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm font-medium">{option.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleStack(option.name)}
                        aria-label={`Remove ${option.name}`}
                        className="text-background/45 transition-colors hover:text-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <Button
                onClick={() => setIsGenerated(true)}
                disabled={selectedStacks.length === 0}
                className="h-11 w-full bg-background text-foreground hover:bg-background/90 disabled:bg-background/30 disabled:text-background/50"
              >
                Generate roadmap
                <ArrowRight className="h-4 w-4" />
              </Button>
            </aside>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RoadmapResult({
  selectedOptions,
  onEdit,
}: {
  selectedOptions: StackOption[];
  onEdit: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:px-7">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Personalized roadmap
          </div>
          <h2 className="font-bricolage text-2xl font-bold tracking-tight">
            Your {selectedOptions.map((option) => option.name).join(" + ")} path
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Follow the topics from top to bottom. The order is a recommendation, not a restriction.
          </p>
        </div>
        <Button variant="outline" onClick={onEdit} className="gap-2 self-start sm:self-auto">
          <ArrowLeft className="h-4 w-4" />
          Edit stack
        </Button>
      </div>

      <div className="border-b border-border bg-muted/30 px-5 py-3 sm:px-7">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" /> Personal recommendation
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" /> Alternative option
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-muted-foreground/50" /> Learn anytime
          </span>
        </div>
      </div>

      <div className="grid gap-px border-b border-border bg-border sm:grid-cols-3">
        <div className="bg-card px-5 py-4 sm:px-7">
          <p className="text-xs text-muted-foreground">Learning stages</p>
          <p className="mt-1 text-lg font-semibold">{selectedOptions.length} technologies</p>
        </div>
        <div className="bg-card px-5 py-4 sm:px-7">
          <p className="text-xs text-muted-foreground">Recommended pace</p>
          <p className="mt-1 text-lg font-semibold">8-12 weeks</p>
        </div>
        <div className="bg-card px-5 py-4 sm:px-7">
          <p className="text-xs text-muted-foreground">Final outcome</p>
          <p className="mt-1 text-lg font-semibold">Portfolio-ready project</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="relative min-w-[700px] px-5 py-8 sm:px-10 sm:py-10">
          <div className="absolute bottom-10 left-1/2 top-10 w-0.5 -translate-x-1/2 bg-primary/35" />
          <div className="relative space-y-7">
            {selectedOptions.map((option, index) => (
              <RoadmapStage key={option.name} option={option} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function RoadmapStage({ option, index }: { option: StackOption; index: number }) {
  const detail = detailFor(option);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="grid grid-cols-[1fr_170px_1fr] items-center gap-4"
    >
      <div className={isLeft ? "flex justify-end" : "invisible"}>
        {isLeft && <TopicPanel detail={detail} />}
      </div>

      <div className="relative z-10 flex justify-center">
        <div className="w-[170px] rounded-lg border-2 border-foreground bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md">
          {option.name}
        </div>
      </div>

      <div className={!isLeft ? "flex justify-start" : "invisible"}>
        {!isLeft && <TopicPanel detail={detail} />}
      </div>
    </motion.div>
  );
}

function TopicPanel({ detail }: { detail: RoadmapDetail }) {
  return (
    <div className="w-full max-w-[290px] rounded-lg border-2 border-foreground/80 bg-background p-2 shadow-sm">
      <div className="border-b border-foreground/15 px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Core topics
      </div>
      {detail.topics.map((topic, index) => (
        <div
          key={topic}
          className={`flex items-center gap-2 border-b border-foreground/10 px-3 py-2 text-xs font-medium last:border-0 ${
            index === 0 ? "bg-amber-100 dark:bg-amber-300/30" : "bg-background"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? "bg-primary" : "bg-emerald-500"}`}
          />
          {topic}
        </div>
      ))}
      <div className="mt-2 rounded-md bg-primary/10 px-3 py-2 text-[11px] leading-relaxed">
        <span className="font-semibold text-primary">Practice:</span> {detail.practice}
      </div>
      <div className="mt-2 rounded-md bg-emerald-500/10 px-3 py-2 text-[11px] leading-relaxed">
        <span className="font-semibold text-emerald-700 dark:text-emerald-400">Outcome:</span>{" "}
        {detail.outcome}
      </div>
    </div>
  );
}

function detailFor(option: StackOption): RoadmapDetail {
  const detailMap: Record<StackCategory, Omit<RoadmapDetail, "topics"> & { topics: string[] }> = {
    Frontend: {
      topics: ["HTML, CSS & accessibility", "Components & UI patterns", "Routing, state & forms"],
      practice: `Build a responsive ${option.name} dashboard with reusable components.`,
      outcome: "You can ship a polished, accessible frontend.",
    },
    Backend: {
      topics: ["Language & runtime basics", "REST APIs and validation", "Auth, errors & testing"],
      practice: `Create a ${option.name} API for users, projects and progress tracking.`,
      outcome: "You can design and secure a production-style API.",
    },
    Database: {
      topics: [
        "Data modeling & relationships",
        "Queries, filters & pagination",
        "Indexes, backups & security",
      ],
      practice: `Model a learning platform schema in ${option.name} and connect it to your API.`,
      outcome: "You can store, query and protect application data.",
    },
    DevOps: {
      topics: [
        "Local workflow & environments",
        "Build, deploy & secrets",
        "Logs, monitoring & scale",
      ],
      practice: `Deploy your learning platform with ${option.name} and document the workflow.`,
      outcome: "You can repeatably ship and operate your project.",
    },
  };

  return detailMap[option.category];
}
