export function Footer() {
  return (
    <footer className="relative z-20 px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-card px-4 pb-7 pt-4 shadow-2xl sm:px-6 sm:pb-8 sm:pt-6">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#b35cff] via-[#7c3aed] to-[#3157d5] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12">
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
                <img
                  src="/logo.png"
                  alt="Campus Connect Logo"
                  className="h-9 w-9 rounded-lg bg-white object-contain p-1"
                />
                <span>Campus Connect</span>
              </a>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                Your ultimate student community platform. Create classrooms, chat in real-time, and
                collaborate with peers seamlessly.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href="https://x.com/codewithdhruba"
                  aria-label="X"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                  >
                    <title>X</title>
                    <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/codewithdhruba01/CampusConnect"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6d28d9] transition-transform hover:scale-110"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
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

        <div className="pt-5 text-center text-xs text-muted-foreground">
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
        <a
          key={link}
          href={link === "Roadmap" ? "/roadmap" : "#"}
          className="text-white/75 transition-colors hover:text-white"
        >
          {link}
        </a>
      ))}
    </div>
  );
}
