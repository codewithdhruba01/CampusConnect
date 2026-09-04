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
            },
          },
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
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background font-sans text-foreground selection:bg-muted">
      {/* Left Panel - Form Area */}
      <div className="relative flex w-full flex-col overflow-y-auto lg:w-1/2">
        <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center px-6 py-12 lg:px-0">
          <Link
            to="/"
            className="mb-10 inline-flex w-fit items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-1.5 text-[32px] font-medium tracking-tight text-foreground">
              {isSignUp ? "Get Started" : "Welcome Back"}
            </h1>
            <p className="mb-8 text-[14px] text-muted-foreground">
              {isSignUp
                ? "Create your account and start editing with AI"
                : "Sign in to continue editing with AI"}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="block text-[13px] text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-[14px] text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[13px] text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-card px-3.5 text-[14px] text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] text-muted-foreground">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-card pl-3.5 pr-10 text-[14px] text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-[13px] text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-primary text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border"></div>
              <span className="text-[12px] text-muted-foreground">Or continue with</span>
              <div className="h-px flex-1 bg-border"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-transparent text-[14px] font-medium text-foreground transition-colors hover:bg-accent"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-[18px] w-[18px]"
                alt="Google"
              />
              Continue with Google
            </button>

            <div className="mt-8 text-center text-[13px] text-muted-foreground">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Image Area */}
      <div className="hidden w-1/2 p-4 lg:flex lg:p-5 lg:pl-0">
        <div className="relative h-full w-full overflow-hidden rounded-[24px]">
          <img
            src="/loginCover.jpg"
            alt="AI editing visualization"
            className="h-full w-full object-cover"
          />

          {/* Review Cards Overlay */}
        </div>
      </div>
    </div>
  );
}
