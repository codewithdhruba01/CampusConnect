import { motion } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { ClassroomCard } from "@/features/classrooms/components/ClassroomCard";
import { CreateClassroomModal } from "@/features/classrooms/components/CreateClassroomModal";
import { JoinClassroomModal } from "@/features/classrooms/components/JoinClassroomModal";
import { useClassrooms } from "@/hooks/useClassrooms";

export default function Dashboard() {
  const { classrooms, addClassroom } = useClassrooms();

  return (
    <div className="p-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Discover Classrooms</h1>
          <p className="text-neutral-400">Find and join communities or create your own.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <JoinClassroomModal />
          <CreateClassroomModal onCreate={addClassroom} />
        </div>
      </div>

      <div className="mb-8 max-w-sm">
        <SearchBar placeholder="Search Classroom..." />
      </div>

      {classrooms.length === 0 ? (
        <div className="py-20 text-center text-neutral-500">
          <p>No classrooms found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
