import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        alert("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#0E0E0E] font-sans text-white overflow-hidden">
      {/* Left Panel */}
      <div className="relative flex w-full flex-col lg:w-[45%] p-8 lg:p-12 overflow-y-auto">
        {/* Back button */}
        <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-1 flex-col justify-center max-w-[400px] mx-auto w-full pt-12 pb-12"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">
              {isSignUp ? "Get Started" : "Welcome Back"}
            </h1>
            <p className="text-zinc-400 text-sm">
              {isSignUp ? "Create your account and start editing with AI" : "Sign in to continue editing with AI"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full rounded-xl bg-[#1C1C1E] border border-transparent px-4 text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all text-sm"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl bg-[#1C1C1E] border border-transparent px-4 text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl bg-[#1C1C1E] border border-transparent pl-4 pr-11 text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-xl bg-[#FFE4D6] text-sm font-semibold text-[#111111] hover:bg-[#FFD6C0] transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative bg-[#0E0E0E] px-4 text-xs text-zinc-500">
              Or continue with
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-transparent text-sm font-medium text-white hover:bg-zinc-900 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-4 w-4"
              alt="Google"
            />
            Continue with Google
          </button>

          <div className="mt-8 text-center text-sm text-zinc-400">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-[#A78BFA] hover:text-[#9373eb] transition-colors"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </motion.div>
        
        {/* Bottom Left Logo */}
        <div className="absolute bottom-8 left-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-white">
            N
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block lg:w-[55%] p-4 pl-0">
        <div className="relative h-full w-full overflow-hidden rounded-[24px]">
          <img 
            src="/loginCover.jpg" 
            alt="AI editing visualization" 
            className="h-full w-full object-cover"
          />
          
          {/* Review Cards Overlay */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="rounded-[20px] border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?u=dhruv" alt="Dhruv" className="h-9 w-9 rounded-full bg-zinc-800 object-cover border border-white/20" />
                <div>
                  <div className="text-sm font-semibold text-white leading-none">Dhruv</div>
                  <div className="text-xs text-white/70 mt-1">@dhruvtwt_</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/90">
                Removed my image background in seconds. The AI tools are incredibly fast and accurate.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-[20px] border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?u=athrix" alt="Athrix" className="h-9 w-9 rounded-full bg-zinc-800 object-cover border border-white/20" />
                <div>
                  <div className="text-sm font-semibold text-white leading-none">Athrix</div>
                  <div className="text-xs text-white/70 mt-1">@athrix_codes</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/90">
                Finally an editor that doesn't slow me down. The AI extend feature is a game changer.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-[20px] border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?u=sahil" alt="Sahil" className="h-9 w-9 rounded-full bg-zinc-800 object-cover border border-white/20" />
                <div>
                  <div className="text-sm font-semibold text-white leading-none">Sahil</div>
                  <div className="text-xs text-white/70 mt-1">@sahilcodex</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/90">
                Clean interface, powerful tools. Been using it for all my product photography.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

