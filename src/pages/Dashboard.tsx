import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassroomCard } from "@/features/classrooms/components/ClassroomCard";
import type { Classroom } from "@/types";

const mockClassrooms: Classroom[] = [
  { id: "1", name: "Computer Science 101", members_count: 124, color: "bg-blue-500", created_at: "", created_by: "" },
  { id: "2", name: "Design Club", members_count: 56, color: "bg-pink-500", created_at: "", created_by: "" },
  { id: "3", name: "Mathematics Study Group", members_count: 89, color: "bg-green-500", created_at: "", created_by: "" },
  { id: "4", name: "Physics Lab A", members_count: 34, color: "bg-orange-500", created_at: "", created_by: "" },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Discover Classrooms</h1>
          <p className="text-neutral-400">Find and join communities or create your own.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button variant="outline" className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-white shadow-sm font-medium h-10 px-4 py-2">
            <Plus className="mr-1 h-4 w-4" /> Create Room
          </Button>
        </div>
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
        <Input 
          placeholder="Search classrooms..." 
          className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 rounded-full focus-visible:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClassrooms.map((room, idx) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <ClassroomCard classroom={room} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
