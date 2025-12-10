"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import CompanionCharacter, {
  CharacterState,
} from "@/components/CompanionCharacter";

export default function Home() {
  const [activeSection, setActiveSection] = useState<CharacterState>("idle");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            switch (section) {
              case "hero":
                setActiveSection("idle");
                break;
              case "experience":
                setActiveSection("run");
                break;
              case "projects":
                setActiveSection("action");
                break;
              case "contact":
                setActiveSection("wave");
                break;
              default:
                setActiveSection("idle");
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Character in bottom-left corner (fixed) */}
      <div className="fixed bottom-8 left-8 z-50">
        <CompanionCharacter state={activeSection} />
      </div>

      {/* Centered content */}
      <div className="section-content">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}

