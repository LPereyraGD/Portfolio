"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useState } from "react";

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Projects
        </motion.h2>

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group border-t border-foreground/10 pt-8 md:pt-12"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Number */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-6xl md:text-8xl font-bold text-foreground/20 leading-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p className="text-lg text-foreground/70">
                      {project.description}
                    </p>
                  </div>

                  <ul className="space-y-2 text-foreground/60">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-foreground/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

