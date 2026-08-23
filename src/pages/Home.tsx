import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/Features";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white selection:bg-purple-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32">
        <HeroSection />
        <FeaturesSection />
      </div>

      <Footer />
    </div>
  );
}
