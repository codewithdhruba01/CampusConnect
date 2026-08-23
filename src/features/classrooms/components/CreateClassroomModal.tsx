import { useState, type ReactNode, type ReactElement } from "react";
import { Plus, BookOpen, Users, Hash, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Classroom } from "@/types";

interface CreateClassroomModalProps {
  children?: ReactNode;
  onCreate?: (classroom: Classroom) => void;
}

export function CreateClassroomModal({ children, onCreate }: CreateClassroomModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [description, setDescription] = useState("");

  const triggerElement = children ? (
    children as ReactElement
  ) : (
    <Button variant="outline" className="bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-white shadow-sm font-medium h-10 px-4 py-2">
      <Plus className="mr-1 h-4 w-4" /> Create Room
    </Button>
  );

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newClassroom: Classroom = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      name,
      category,
      profile_pic: profilePic,
      description,
      created_at: new Date().toISOString(),
      created_by: "current_user", // Placeholder
      members_count: 1, // Start with 1 member (creator)
      members: [{ id: "u-you", name: "You", email: "" }],
      color: "bg-indigo-500", // Default color
    };

    if (onCreate) {
      onCreate(newClassroom);
    }
    
    setOpen(false);
    setName("");
    setCategory("");
    setProfilePic("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={triggerElement} />
      
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none ring-0 bg-black shadow-2xl">
        {/* Nice header with gradient background */}
        <div className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative p-6 pb-5 border-b border-white/5">
            <DialogHeader>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-inset ring-white/10 backdrop-blur-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <DialogTitle className="text-2xl font-semibold text-white tracking-tight">Create Classroom</DialogTitle>
              <DialogDescription className="text-neutral-400 mt-1.5 text-sm">
                Set up a new space for learning, sharing, and collaborating with your peers.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 grid gap-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2.5">
            <label htmlFor="name" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Classroom Name
            </label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Advanced Machine Learning" 
              className="bg-black border-neutral-800/80 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 text-white h-11 transition-all placeholder:text-neutral-600"
            />
          </div>
          
          <div className="space-y-2.5">
            <label htmlFor="subject" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Hash className="w-4 h-4 text-purple-400" /> Classroom Category
            </label>
            <Input 
              id="subject" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Computer Science" 
              className="bg-black border-neutral-800/80 focus-visible:border-purple-500 focus-visible:ring-purple-500/30 text-white h-11 transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="space-y-2.5">
            <label htmlFor="profilePic" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" /> Upload Profile Photo
            </label>
            <div className="flex items-center gap-4">
              {profilePic && (
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-800 bg-neutral-900">
                  <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <Input 
                id="profilePic" 
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setProfilePic(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="bg-black border-neutral-800/80 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 text-white transition-all file:bg-neutral-900 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:text-sm hover:file:bg-neutral-800 text-sm h-11 pt-2"
              />
            </div>
          </div>
          
          <div className="space-y-2.5">
            <label htmlFor="description" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-pink-400" /> Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you learn here?"
              className="flex w-full rounded-lg border border-neutral-800/80 bg-black px-3 py-2 text-sm text-white transition-colors focus-visible:border-pink-500 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-pink-500/30 min-h-[100px] resize-y placeholder:text-neutral-600"
            />
          </div>
        </div>

        <div className="p-5 border-t border-white/5 bg-black flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-neutral-700 hover:bg-neutral-800 text-neutral-300 w-full sm:w-auto h-11">
            Cancel
          </Button>
          
          <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] w-full sm:w-auto h-11">
            <Plus className="w-4 h-4 mr-2" /> Create Classroom
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
