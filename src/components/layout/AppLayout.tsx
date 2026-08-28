import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Users } from "lucide-react";
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
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
        <div className="flex h-16 items-center border-b border-neutral-800 px-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <img src="/logo.png" alt="Campus Connect Logo" className="h-8 w-8 object-contain" />
            Campus Connect
          </Link>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <div className="mb-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Main Menu
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Users className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="mb-2 mt-6 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Your Classrooms
          </div>
          {classrooms.length === 0 ? (
            <div className="px-3 py-2 text-sm font-medium italic text-neutral-600">
              No classrooms yet
            </div>
          ) : (
            classrooms.map((room) => (
              <Link
                key={room.id}
                to={`/classroom/${room.id}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className={`h-2 w-2 rounded-full ${room.color || "bg-blue-500"}`}></span>
                {room.name}
              </Link>
            ))
          )}
        </nav>

        <div className="border-t border-neutral-800 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-400 hover:bg-white/5 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Dynamic Background subtle */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute right-[0%] top-[0%] h-[40%] w-[40%] rounded-full bg-purple-600/5 blur-[120px]" />
        </div>
        <div className="relative z-10 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
