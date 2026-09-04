import { useState, type ReactNode, type ReactElement } from "react";
import { Plus, Users, Hash, FileText, ImageIcon } from "lucide-react";
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
import { useClassrooms } from "@/hooks/useClassrooms";

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
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useClassrooms();

  const triggerElement = children ? (
    (children as ReactElement)
  ) : (
    <Button variant="outline" className="h-10 px-4 py-2 font-medium shadow-sm">
      <Plus className="mr-1 h-4 w-4" /> Create Room
    </Button>
  );

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsLoading(true);

    const newClassroom: Classroom = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      name,
      category,
      profile_pic: profilePic,
      description,
      created_at: new Date().toISOString(),
      created_by: "current_user", // Placeholder
      members_count: 1, // Start with 1 member (creator)
      members: [currentUser],
      color: "bg-indigo-500", // Default color
    };

    if (onCreate) {
      await onCreate(newClassroom);
    }

    setIsLoading(false);
    setOpen(false);
    setName("");
    setCategory("");
    setProfilePic("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={triggerElement} />

      <DialogContent className="overflow-hidden border border-border bg-background p-0 shadow-2xl ring-0 sm:max-w-[480px]">
        <div className="relative overflow-hidden">
          <div className="relative border-b border-border p-6 pb-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
                Create Classroom
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
                Set up a new space for learning, sharing, and collaborating with your peers.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="grid max-h-[60vh] gap-5 overflow-y-auto p-6">
          <div className="space-y-2.5">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Users className="h-4 w-4 text-indigo-500" /> Classroom Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Advanced Machine Learning"
              className="h-11 border-border bg-transparent text-foreground transition-all placeholder:text-muted-foreground focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="subject"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Hash className="h-4 w-4 text-purple-500" /> Classroom Category
            </label>
            <Input
              id="subject"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Computer Science"
              className="h-11 border-border bg-transparent text-foreground transition-all placeholder:text-muted-foreground focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="profilePic"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <ImageIcon className="h-4 w-4 text-emerald-500" /> Upload Profile Photo
            </label>
            <div className="flex items-center gap-4">
              {profilePic && (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                  <img src={profilePic} alt="Preview" className="h-full w-full object-cover" />
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
                className="h-11 border-border bg-transparent pt-2 text-sm text-foreground transition-all file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:text-foreground hover:file:bg-accent focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <FileText className="h-4 w-4 text-pink-500" /> Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you learn here?"
              className="focus-visible:ring-3 flex min-h-[100px] w-full resize-y rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-pink-500 focus-visible:outline-none focus-visible:ring-pink-500/30"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-border p-5 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-10 w-full px-4 py-2 font-medium shadow-sm sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-10 w-full px-4 py-2 font-medium shadow-sm sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> {isLoading ? "Creating..." : "Create Classroom"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
