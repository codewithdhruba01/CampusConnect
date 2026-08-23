import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Classroom } from "@/types";

interface ClassroomContextType {
  classrooms: Classroom[];
  addClassroom: (classroom: Classroom) => void;
  joinClassroom: (id: string, name: string, email: string) => boolean;
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

  const joinClassroom = (id: string, name: string, email: string) => {
    const exists = classrooms.some(c => c.id === id);
    if (exists) {
      setClassrooms((prev) => prev.map(c => {
        if (c.id === id) {
          const newUser = { id: `u-${Date.now()}`, name, email };
          return {
            ...c,
            members_count: c.members_count + 1,
            members: [...(c.members || []), newUser]
          };
        }
        return c;
      }));
    }
    return exists;
  };

  return (
    <ClassroomContext.Provider value={{ classrooms, addClassroom, joinClassroom }}>
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
