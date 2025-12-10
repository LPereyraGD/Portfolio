"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { useRef, useEffect, useState } from "react";

export default function ExperienceSection() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Experience Log
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-foreground/20" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                data-index={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-background z-10" />

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-8 text-right" : "md:pl-8"
                  }`}
                >
                  <div
                    className={`space-y-2 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-foreground/70 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-foreground/50">{exp.period}</p>
                    <ul
                      className={`text-sm text-foreground/60 space-y-1 mt-4 ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      }`}
                      style={{
                        listStyle: "none",
                        maxWidth: "400px",
                      }}
                    >
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-foreground/40 mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.tech && (
                      <div
                        className={`flex flex-wrap gap-2 mt-3 ${
                          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 border border-foreground/20 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

