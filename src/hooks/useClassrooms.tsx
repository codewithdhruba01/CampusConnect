import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Classroom } from "@/types";

interface ClassroomContextType {
  classrooms: Classroom[];
  addClassroom: (classroom: Classroom) => void;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [classrooms, setClassrooms] = useState<Classroom[]>(() => {
    const saved = localStorage.getItem("classrooms");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse classrooms from local storage", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  }, [classrooms]);

  const addClassroom = (classroom: Classroom) => {
    setClassrooms((prev) => [classroom, ...prev]);
  };

  return (
    <ClassroomContext.Provider value={{ classrooms, addClassroom }}>
      {children}
    </ClassroomContext.Provider>
  );
}

export function useClassrooms() {
  const context = useContext(ClassroomContext);
  if (context === undefined) {
    throw new Error("useClassrooms must be used within a ClassroomProvider");
  }
  return context;
}
