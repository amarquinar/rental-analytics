"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Magnetic button component
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3 px-8 py-4 bg-lime text-black font-semibold text-lg rounded-full hover:bg-lime-hover transition-colors"
    >
      {children}
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </motion.a>
  );
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen bg-background text-zinc-50 overflow-hidden flex flex-col relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source
          src="https://cdn.midjourney.com/video/7b255d7a-8f03-4a28-8452-2fd10674ef70/0.mp4"
          type="video/mp4"
        />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/80 z-0" aria-hidden="true" />

      {/* Simple header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 relative z-10">
        <div className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-zinc-800/80 rounded-lg flex items-center justify-center border border-border-subtle backdrop-blur-sm">
            <span className="text-lime font-semibold text-sm">RA</span>
          </div>
          <span className="text-zinc-100/80 font-medium hidden sm:block tracking-tight">
            Rental Analytics
          </span>
        </div>
        <div className="px-4 py-2 border border-border-subtle rounded-full text-zinc-400 text-sm backdrop-blur-sm bg-surface/30">
          Investment Insights
        </div>
      </header>

      {/* Main content - split layout */}
      <main className="flex-1 flex items-center px-6 md:px-12 lg:px-20 relative z-10">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-lime/20 bg-lime/5 rounded-full text-lime text-sm backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
                Personal Investment Tool
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight">
                Rental Analytics
                <br />
                <span className="text-lime">Smarter investments.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 text-lg lg:text-xl max-w-md leading-relaxed"
            >
              Compare rental properties side-by-side. Analyze neighborhoods.
              Make data-driven investment decisions.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="/dashboard">
                View Dashboard
              </MagneticButton>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-zinc-500 text-sm"
            >
              Compare properties, analyze yields, and find the best investments
            </motion.p>
          </div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract shape */}
              <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-lime/10 via-lime/5 to-transparent rotate-12 blur-sm" />
              <div className="absolute inset-4 rounded-[50px] bg-gradient-to-br from-zinc-100/5 to-transparent -rotate-6" />

              {/* Content card */}
              <div className="absolute inset-8 bg-surface/50 backdrop-blur-md rounded-2xl ring-1 ring-border-subtle p-8 flex flex-col justify-between shadow-premium-lg">
                <div>
                  <div className="text-zinc-500 text-xs mb-3 font-medium uppercase tracking-wider">
                    Features
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Property Comparison", detail: "Side-by-side" },
                      { name: "Neighborhood Data", detail: "Area insights" },
                      { name: "Yield Calculator", detail: "ROI metrics" },
                      { name: "Data Scraping", detail: "Auto-import" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                        <span className="text-zinc-200">{item.name}</span>
                        <span className="text-zinc-500 text-sm">
                          {item.detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border-subtle">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">MVP: Property Comparison</span>
                    <span className="text-lime font-medium">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
          <p>© 2026 Rental Analytics</p>
          <div className="flex items-center gap-6">
            <a
              href="/dashboard"
              className="hover:text-zinc-400 transition-colors duration-150"
            >
              Dashboard
            </a>
            <a
              href="/neighborhoods"
              className="hover:text-zinc-400 transition-colors duration-150"
            >
              Neighborhoods
            </a>
            <a
              href="/calculator"
              className="hover:text-zinc-400 transition-colors duration-150"
            >
              Calculator
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
