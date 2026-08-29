import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Users, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useClassrooms } from "@/hooks/useClassrooms";

export default function AppLayout() {
  const navigate = useNavigate();
  const { classrooms } = useClassrooms();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside 
        className={`flex flex-shrink-0 flex-col border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className={`flex h-16 shrink-0 items-center border-b border-neutral-800 ${isSidebarOpen ? "justify-between px-4" : "justify-center"}`}>
          {isSidebarOpen && (
            <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight overflow-hidden">
              <img src="/logo.png" alt="Campus Connect Logo" className="h-8 w-8 shrink-0 object-contain" />
              <span className="whitespace-nowrap">Campus Connect</span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="shrink-0 text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-3">
          {isSidebarOpen ? (
            <div className="mb-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Main Menu
            </div>
          ) : (
            <div className="mb-2 h-4" />
          )}
          
          <Link
            to="/dashboard"
            className={`flex items-center rounded-lg bg-white/5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 ${
              isSidebarOpen ? "px-3 gap-3" : "justify-center"
            }`}
            title={!isSidebarOpen ? "Dashboard" : undefined}
          >
            <Users className="h-4 w-4 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap">Dashboard</span>}
          </Link>

          {isSidebarOpen ? (
            <div className="mb-2 mt-6 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Your Classrooms
            </div>
          ) : (
            <div className="mb-2 mt-6 h-4 border-t border-neutral-800/50" />
          )}

          {classrooms.length === 0 ? (
            isSidebarOpen && (
              <div className="px-3 py-2 text-sm font-medium italic text-neutral-600">
                No classrooms yet
              </div>
            )
          ) : (
            classrooms.map((room) => (
              <Link
                key={room.id}
                to={`/classroom/${room.id}`}
                className={`flex items-center rounded-lg py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white ${
                  isSidebarOpen ? "px-3 gap-3" : "justify-center"
                }`}
                title={!isSidebarOpen ? room.name : undefined}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${room.color || "bg-blue-500"}`}></span>
                {isSidebarOpen && <span className="truncate">{room.name}</span>}
              </Link>
            ))
          )}
        </nav>

        <div className="border-t border-neutral-800 p-3">
          <Button
            variant="ghost"
            className={`w-full text-neutral-400 hover:bg-white/5 hover:text-white ${
              isSidebarOpen ? "justify-start px-3" : "justify-center px-0"
            }`}
            onClick={handleLogout}
            title={!isSidebarOpen ? "Log out" : undefined}
          >
            <LogOut className={`h-4 w-4 shrink-0 ${isSidebarOpen ? "mr-2" : ""}`} />
            {isSidebarOpen && <span>Log out</span>}
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
