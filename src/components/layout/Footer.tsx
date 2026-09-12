export function Footer() {
  return (
    <footer className="relative z-20 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#17191b] px-4 pb-7 pt-4 shadow-2xl sm:px-6 sm:pb-8 sm:pt-6">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#b35cff] via-[#7c3aed] to-[#3157d5] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0% 10%, rgba(255, 255, 255, 0.03) 10% 20%, rgba(54, 22, 132, 0.18) 20% 30%, rgba(255, 255, 255, 0.04) 30% 40%, rgba(47, 19, 112, 0.3) 40% 50%, rgba(25, 20, 91, 0.38) 50% 60%, rgba(43, 28, 125, 0.22) 60% 70%, rgba(255, 255, 255, 0.04) 70% 80%, rgba(40, 48, 137, 0.15) 80% 90%, rgba(255, 255, 255, 0.1) 90% 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 45%, rgba(20, 18, 82, 0.22))",
            }}
          />

          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
            <div className="max-w-sm">
              <a
                href="/"
                className="flex items-center gap-2.5 text-xl font-semibold tracking-tight"
              >
                <img src="/logo.png" alt="Campus Connect Logo" className="h-9 w-9 object-contain" />
                <span>Campus Connect</span>
              </a>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                Your ultimate student community platform. Create classrooms, chat in real-time, and
                collaborate with peers seamlessly.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
                <a
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <span className="text-sm font-bold">◎</span>
                </a>
                <a
                  href="https://www.youtube.com/"
                  aria-label="YouTube"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <span className="text-xs font-bold">▶</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8 text-sm sm:grid-cols-3 sm:gap-x-14 lg:pt-1">
              <FooterColumn
                title="Product"
                links={["Features", "Classrooms", "Messaging", "Updates", "Roadmap"]}
              />
              <FooterColumn
                title="Company"
                links={["About Us", "Contact", "GitHub", "Self-host", "Contribute"]}
              />
              <FooterColumn
                title="Resources"
                links={["Documentation", "Help Center", "Community", "Blog", "Status"]}
              />
            </div>
          </div>
        </div>

        <div className="pt-5 text-center text-xs text-white/60">
          &copy; {new Date().getFullYear()} Campus Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-white">{title}</h2>
      {links.map((link) => (
        <a key={link} href="#" className="text-white/75 transition-colors hover:text-white">
          {link}
        </a>
      ))}
    </div>
  );
}
