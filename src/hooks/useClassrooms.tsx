import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Classroom } from "@/types";

interface ClassroomContextType {
  classrooms: Classroom[];
  currentUser: { id: string; name: string; email: string };
  setCurrentUser: (user: { id: string; name: string; email: string }) => void;
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

  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string }>(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    return { id: "u-you", name: "You", email: "" };
  });

  useEffect(() => {
    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  }, [classrooms]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const addClassroom = (classroom: Classroom) => {
    setClassrooms((prev) => [classroom, ...prev]);
  };

  const joinClassroom = (id: string, name: string, email: string) => {
    const exists = classrooms.some((c) => c.id === id);
    if (exists) {
      const newUser = { id: `u-${Date.now()}`, name, email };
      setCurrentUser(newUser);
      setClassrooms((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              members_count: c.members_count + 1,
              members: [...(c.members || []), newUser],
            };
          }
          return c;
        })
      );
    }
    return exists;
  };

  return (
    <ClassroomContext.Provider value={{ classrooms, currentUser, setCurrentUser, addClassroom, joinClassroom }}>
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
