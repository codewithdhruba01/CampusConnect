import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div className="flex min-h-screen w-full bg-white font-sans selection:bg-[#59BCCC]/30">
      {/* Left Panel */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Logo */}
        <div className="absolute left-0 top-0 p-8">
          <Link
            to="/"
            className="flex items-center gap-1 text-2xl font-extrabold italic tracking-tighter text-black"
          >
            CampusConnect
          </Link>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-1 items-center justify-center p-8 md:mt-0"
        >
          <div className="w-full max-w-[380px]">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-[32px] font-semibold tracking-tight text-black">
                {isSignUp ? "Create an account" : "Welcome to CampusConnect"}
              </h2>
              <p className="text-sm text-[#6B7280]">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium text-[#59BCCC] hover:underline"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>

            {/* Google Auth Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white py-2.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-neutral-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google"
              />
              Sign in with Google
            </button>

            <div className="relative mb-6 flex items-center py-2">
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
              <span className="mx-4 flex-shrink-0 text-[11px] uppercase tracking-wider text-[#9CA3AF]">
                or
              </span>
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="janesmith1.mobbin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-lg border-[#E5E7EB] bg-white text-black shadow-sm placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#59BCCC] focus-visible:ring-offset-0"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-lg border-[#E5E7EB] bg-white text-black shadow-sm placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#59BCCC] focus-visible:ring-offset-0"
                  required
                />
              </div>
              {error && <p className="text-center text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#59BCCC] text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#4CA5B4]"
              >
                <Mail className="h-5 w-5" />
                {loading ? "Loading..." : isSignUp ? "Sign Up with Email" : "Sign in with Email"}
              </Button>
            </form>

            <div className="mt-12 text-center text-[13px] text-[#9CA3AF]">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-[#6B7280]">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/privacy" className="underline hover:text-[#6B7280]">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="relative hidden flex-1 flex-col items-center justify-center overflow-hidden bg-[#193233] p-16 text-center lg:flex">
        {/* Abstract background shapes mimicking the image */}
        <div className="absolute right-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-[#1F4142] opacity-80 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] h-[70%] w-[70%] rounded-full bg-[#183A3B] opacity-70 blur-[120px]"></div>
        <div className="absolute left-[20%] top-[30%] h-[40%] w-[40%] rounded-full bg-[#204748] opacity-60 blur-[100px]"></div>

        {/* Large smooth shape like the one in the reference */}
        <div className="absolute right-[-10%] top-[-10%] h-[120%] w-[80%] rotate-12 transform rounded-l-[100%] bg-gradient-to-bl from-[#20494A]/40 to-transparent blur-[40px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-xl"
        >
          <h2 className="mb-16 text-[34px] font-medium leading-[1.3] tracking-tight text-white">
            85,000 companies & people like you made more than 1 million apps with CampusConnect.
          </h2>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-90">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold uppercase tracking-tighter text-white">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[3px] bg-white text-[10px] font-black text-[#193233]">
                L
              </div>
              LOWE'S
            </div>
            <div className="flex items-center text-[22px] font-bold tracking-tight text-white">
              Whirlpool
            </div>
            <div className="flex items-center gap-1.5 text-2xl font-bold italic tracking-tight text-white">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              _zapier
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
