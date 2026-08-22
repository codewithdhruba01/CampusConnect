import { Link, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useClassrooms } from "@/hooks/useClassrooms";

export default function AppLayout() {
  const navigate = useNavigate();
  const { classrooms } = useClassrooms();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600">
              <BookOpen className="h-4 w-4 text-white" />
            </span>
            Campus Connect
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Main Menu
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <Users className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-6 mb-2">
            Your Classrooms
          </div>
          {classrooms.length === 0 ? (
            <div className="px-3 py-2 text-sm font-medium text-neutral-600 italic">
              No classrooms yet
            </div>
          ) : (
            classrooms.map((room) => (
              <Link
                key={room.id}
                to={`/classroom/${room.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${room.color || 'bg-blue-500'}`}></span>
                {room.name}
              </Link>
            ))
          )}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-400 hover:text-white hover:bg-white/5"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Dynamic Background subtle */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[0%] right-[0%] w-[40%] h-[40%] rounded-full bg-purple-600/5 blur-[120px]" />
        </div>
        <div className="relative z-10 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
