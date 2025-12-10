"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      {/* Subtle radial gradient behind hero */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-foreground/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto md:ml-[15%] text-center md:text-left space-y-8 relative z-10">
        {/* Editorial label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs md:text-sm uppercase tracking-wider text-foreground/40 font-medium"
        >
          Senior Game Developer – Unity & Unreal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          I build games and the tools behind them.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-foreground/70"
        >
          Senior Game Developer – Unity, Unreal, C#, C++
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-foreground/60 max-w-lg leading-relaxed"
        >
          Senior Game Developer with 8+ years of experience across Unity and
          Unreal Engine. Skilled in C# and C++, focused on UI, gameplay systems
          and tools development. Passionate about building efficient frameworks,
          improving pipelines, and collaborating across teams to ship scalable
          solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start pt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="hover:bg-foreground/95 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View Projects
            </Button>
          </motion.div>
          <Button variant="secondary" size="lg" asChild>
            <a
              href="/Lautaro Pereyra - CV .pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

