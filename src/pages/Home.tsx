import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden relative selection:bg-purple-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <HeroSection />
        <FeaturesSection />
      </div>

      <Footer />
    </div>
  );
}
