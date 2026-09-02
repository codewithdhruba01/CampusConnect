import { create } from "zustand";
import type { Classroom } from "@/types";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ClassroomStore {
  classrooms: Classroom[];
  currentUser: User;
  setCurrentUser: (user: User) => void;
  addClassroom: (classroom: Classroom) => Promise<void>;
  joinClassroom: (
    id: string,
    name: string,
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  fetchClassrooms: () => Promise<void>;
}

const getInitialUser = (): User => {
  const saved = localStorage.getItem("currentUser");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
    }
  }
  return { id: "u-you", name: "You", email: "" };
};

export const useClassrooms = create<ClassroomStore>((set, get) => ({
  classrooms: [],
  currentUser: getInitialUser(),

  setCurrentUser: (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    set({ currentUser: user });
  },

  addClassroom: async (classroom) => {
    set((state) => ({ classrooms: [classroom, ...state.classrooms] }));
    const { error } = await supabase.from("classrooms").insert([classroom]);
    if (error) {
      console.error("Error creating classroom:", error);
    }
  },

  joinClassroom: async (id, name, email) => {
    const { classrooms } = get();
    const classroom = classrooms.find((c) => c.id === id);
    if (classroom) {
      const isAlreadyMember = classroom.members?.some(
        (m) => m.email.toLowerCase() === email.toLowerCase()
      );

      if (isAlreadyMember) {
        return { success: false, error: "You are already a member of this classroom." };
      }

      const newUser = { id: `u-${Date.now()}`, name, email };

      get().setCurrentUser(newUser);

      const updatedMembersCount = classroom.members_count + 1;
      const updatedMembers = [...(classroom.members || []), newUser];

      set((state) => ({
        classrooms: state.classrooms.map((c) =>
          c.id === id ? { ...c, members_count: updatedMembersCount, members: updatedMembers } : c
        ),
      }));

      const { error } = await supabase
        .from("classrooms")
        .update({
          members_count: updatedMembersCount,
          members: updatedMembers,
        })
        .eq("id", id);

      if (error) {
        console.error("Error joining classroom:", error);
        return { success: false, error: "Failed to join classroom. Please try again later." };
      }
      return { success: true };
    }
    return { success: false, error: "Classroom not found. Please check the ID and try again." };
  },

  fetchClassrooms: async () => {
    const { data, error } = await supabase
      .from("classrooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching classrooms:", error);
    } else if (data) {
      set({ classrooms: data as Classroom[] });
    }
  },
}));
