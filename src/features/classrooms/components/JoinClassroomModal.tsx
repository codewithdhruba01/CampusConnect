import { useState, type ReactNode, type ReactElement } from "react";
import { LogIn, Hash, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { useClassrooms } from "@/hooks/useClassrooms";

interface JoinClassroomModalProps {
  children?: ReactNode;
}

export function JoinClassroomModal({ children }: JoinClassroomModalProps) {
  const [open, setOpen] = useState(false);
  const [classroomId, setClassroomId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { joinClassroom } = useClassrooms();
  const navigate = useNavigate();

  const triggerElement = children ? (
    (children as ReactElement)
  ) : (
    <Button className="h-10 bg-white px-4 py-2 font-medium text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-neutral-200">
      <LogIn className="mr-2 h-4 w-4" /> Join Room
    </Button>
  );

  const handleSubmit = async () => {
    setError("");
    if (!classroomId.trim() || !name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const success = await joinClassroom(classroomId.trim(), name.trim(), email.trim());
    setIsLoading(false);

    if (success) {
      setOpen(false);
      setClassroomId("");
      setName("");
      setEmail("");
      navigate(`/classroom/${classroomId.trim()}`);
    } else {
      setError("Classroom not found. Please check the ID and try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={triggerElement} />

      <DialogContent className="overflow-hidden border-none bg-black p-0 shadow-2xl ring-0 sm:max-w-[440px]">
        <div className="relative overflow-hidden">
          <div className="relative border-b border-white/5 p-6 pb-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Join Classroom
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-sm text-neutral-400">
                Enter an invite code and your details to join an existing classroom.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="grid gap-5 p-6">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2.5">
            <label
              htmlFor="join-id"
              className="flex items-center gap-2 text-sm font-medium text-neutral-300"
            >
              <Hash className="h-4 w-4 text-indigo-400" /> Classroom ID
            </label>
            <Input
              id="join-id"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value.toUpperCase())}
              placeholder="e.g. 7A4K9X2P"
              className="h-11 border-neutral-800/80 bg-black font-mono uppercase tracking-widest text-white transition-all placeholder:text-neutral-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="join-name"
              className="flex items-center gap-2 text-sm font-medium text-neutral-300"
            >
              <User className="h-4 w-4 text-blue-400" /> Your Name
            </label>
            <Input
              id="join-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="h-11 border-neutral-800/80 bg-black text-white transition-all placeholder:text-neutral-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/30"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="join-email"
              className="flex items-center gap-2 text-sm font-medium text-neutral-300"
            >
              <Mail className="h-4 w-4 text-emerald-400" /> Email Address
            </label>
            <Input
              id="join-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="h-11 border-neutral-800/80 bg-black text-white transition-all placeholder:text-neutral-600 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/5 bg-black p-5 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-11 w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-11 w-full bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] sm:w-auto"
          >
            <LogIn className="mr-2 h-4 w-4" /> {isLoading ? "Joining..." : "Join Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
