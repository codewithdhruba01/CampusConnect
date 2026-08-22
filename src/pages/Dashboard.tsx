import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { ClassroomCard } from "@/features/classrooms/components/ClassroomCard";
import { CreateClassroomModal } from "@/features/classrooms/components/CreateClassroomModal";
import type { Classroom } from "@/types";

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Discover Classrooms</h1>
          <p className="text-neutral-400">Find and join communities or create your own.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <CreateClassroomModal onCreate={(newRoom) => setClassrooms([newRoom, ...classrooms])} />
        </div>
      </div>

      <div className="mb-8 max-w-sm">
        <SearchBar placeholder="Search Classroom..." />
      </div>

      {classrooms.length === 0 ? (
        <div className="text-center py-20 text-neutral-500">
          <p>No classrooms found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((room, idx) => (
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
      )}
    </div>
  );
}
