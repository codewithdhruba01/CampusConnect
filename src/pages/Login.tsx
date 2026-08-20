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
        provider: 'google',
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
    <div className="min-h-screen flex w-full font-sans bg-white selection:bg-[#59BCCC]/30">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Logo */}
        <div className="p-8 absolute top-0 left-0">
          <Link to="/" className="text-2xl font-extrabold italic tracking-tighter text-black flex items-center gap-1">
             CampusConnect
          </Link>
        </div>
        
        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex items-center justify-center p-8 mt-16 md:mt-0"
        >
          <div className="w-full max-w-[380px]">
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-semibold text-black mb-2 tracking-tight">
                {isSignUp ? "Create an account" : "Welcome to CampusConnect"}
              </h2>
              <p className="text-[#6B7280] text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="text-[#59BCCC] font-medium hover:underline"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
            
            {/* Google Auth Button */}
            <button 
               type="button" 
               onClick={handleGoogleAuth}
               className="w-full flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] rounded-lg py-2.5 text-sm font-medium text-black hover:bg-neutral-50 transition-colors mb-6 shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
              <span className="flex-shrink-0 mx-4 text-[#9CA3AF] text-[11px] uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-[#E5E7EB]"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="janesmith1.mobbin@gmail.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border-[#E5E7EB] text-black placeholder:text-[#9CA3AF] h-12 rounded-lg bg-white focus-visible:ring-[#59BCCC] focus-visible:ring-1 focus-visible:ring-offset-0 shadow-sm"
                  required
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border-[#E5E7EB] text-black placeholder:text-[#9CA3AF] h-12 rounded-lg bg-white focus-visible:ring-[#59BCCC] focus-visible:ring-1 focus-visible:ring-offset-0 shadow-sm"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#59BCCC] hover:bg-[#4CA5B4] text-white h-12 rounded-lg text-[15px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Mail className="w-5 h-5" />
                {loading ? "Loading..." : isSignUp ? "Sign Up with Email" : "Sign in with Email"}
              </Button>
            </form>

            <div className="mt-12 text-center text-[13px] text-[#9CA3AF]">
              By signing in, you agree to our <Link to="/terms" className="underline hover:text-[#6B7280]">Terms</Link> & <Link to="/privacy" className="underline hover:text-[#6B7280]">Privacy Policy</Link>.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 bg-[#193233] relative overflow-hidden flex-col justify-center items-center p-16 text-center">
        {/* Abstract background shapes mimicking the image */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1F4142] blur-[100px] opacity-80"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#183A3B] blur-[120px] opacity-70"></div>
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#204748] blur-[100px] opacity-60"></div>
        
        {/* Large smooth shape like the one in the reference */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[120%] bg-gradient-to-bl from-[#20494A]/40 to-transparent rounded-l-[100%] blur-[40px] transform rotate-12"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-xl"
        >
          <h2 className="text-[34px] font-medium text-white mb-16 leading-[1.3] tracking-tight">
            85,000 companies & people like you made more than 1 million apps with CampusConnect.
          </h2>
          
          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-90">
             <div className="text-white font-extrabold text-2xl tracking-tighter uppercase flex items-center gap-1.5">
               <div className="w-[22px] h-[22px] bg-white text-[#193233] flex items-center justify-center text-[10px] font-black rounded-[3px]">L</div>
               LOWE'S
             </div>
             <div className="text-white font-bold text-[22px] tracking-tight flex items-center">
                Whirlpool
             </div>
             <div className="text-white font-bold text-2xl tracking-tight italic flex items-center gap-1.5">
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
               _zapier
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
