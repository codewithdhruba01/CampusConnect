import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Classroom } from "@/types";
import { supabase } from "@/lib/supabase";

interface ClassroomContextType {
  classrooms: Classroom[];
  currentUser: { id: string; name: string; email: string };
  setCurrentUser: (user: { id: string; name: string; email: string }) => void;
  addClassroom: (classroom: Classroom) => Promise<void>;
  joinClassroom: (id: string, name: string, email: string) => Promise<boolean>;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data, error } = await supabase
        .from("classrooms")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Error fetching classrooms:", error);
      } else if (data) {
        setClassrooms(data as Classroom[]);
      }
    };
    
    fetchClassrooms();
  }, []);

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
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const addClassroom = async (classroom: Classroom) => {
    // Ensure optimistic UI update
    setClassrooms((prev) => [classroom, ...prev]);
    
    const { error } = await supabase.from("classrooms").insert([classroom]);
    if (error) {
      console.error("Error creating classroom:", error);
      // Revert if error? For now just log it.
    }
  };

  const joinClassroom = async (id: string, name: string, email: string) => {
    const classroom = classrooms.find((c) => c.id === id);
    if (classroom) {
      const newUser = { id: `u-${Date.now()}`, name, email };
      setCurrentUser(newUser);
      
      const updatedMembersCount = classroom.members_count + 1;
      const updatedMembers = [...(classroom.members || []), newUser];

      // Optimistic update
      setClassrooms((prev) =>
        prev.map((c) => (c.id === id ? { ...c, members_count: updatedMembersCount, members: updatedMembers } : c))
      );

      const { error } = await supabase
        .from("classrooms")
        .update({ 
          members_count: updatedMembersCount,
          members: updatedMembers 
        })
        .eq("id", id);
        
      if (error) {
        console.error("Error joining classroom:", error);
        return false;
      }
      return true;
    }
    return false;
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
