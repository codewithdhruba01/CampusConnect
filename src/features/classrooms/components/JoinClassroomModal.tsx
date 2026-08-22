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
  
  const { joinClassroom } = useClassrooms();
  const navigate = useNavigate();

  const triggerElement = children ? (
    children as ReactElement
  ) : (
    <Button className="bg-white hover:bg-neutral-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] font-medium h-10 px-4 py-2">
      <LogIn className="mr-2 h-4 w-4" /> Join Room
    </Button>
  );

  const handleSubmit = () => {
    setError("");
    if (!classroomId.trim() || !name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const success = joinClassroom(classroomId.trim(), name.trim(), email.trim());
    
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
      
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none ring-0 bg-black shadow-2xl">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative p-6 pb-5 border-b border-white/5">
            <DialogHeader>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-inset ring-white/10 backdrop-blur-md">
                <LogIn className="w-6 h-6 ml-0.5" />
              </div>
              <DialogTitle className="text-2xl font-semibold text-white tracking-tight">Join Classroom</DialogTitle>
              <DialogDescription className="text-neutral-400 mt-1.5 text-sm">
                Enter an invite code and your details to join an existing classroom.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 grid gap-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2.5">
            <label htmlFor="join-id" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Hash className="w-4 h-4 text-indigo-400" /> Classroom ID
            </label>
            <Input 
              id="join-id" 
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value.toUpperCase())}
              placeholder="e.g. 7A4K9X2P" 
              className="bg-black border-neutral-800/80 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 text-white h-11 transition-all placeholder:text-neutral-600 font-mono tracking-widest uppercase"
            />
          </div>
          
          <div className="space-y-2.5">
            <label htmlFor="join-name" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> Your Name
            </label>
            <Input 
              id="join-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson" 
              className="bg-black border-neutral-800/80 focus-visible:border-blue-500 focus-visible:ring-blue-500/30 text-white h-11 transition-all placeholder:text-neutral-600"
            />
          </div>
          
          <div className="space-y-2.5">
            <label htmlFor="join-email" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Email Address
            </label>
            <Input 
              id="join-email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com" 
              className="bg-black border-neutral-800/80 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30 text-white h-11 transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        <div className="p-5 border-t border-white/5 bg-black flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-neutral-700 hover:bg-neutral-800 text-neutral-300 w-full sm:w-auto h-11">
            Cancel
          </Button>
          
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] w-full sm:w-auto h-11">
            <LogIn className="w-4 h-4 mr-2" /> Join Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
