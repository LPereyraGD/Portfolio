export interface Project {
  name: string;
  description: string;
  bullets: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "LiveOps Framework",
    description: "Scalable event and campaign system for mobile games",
    bullets: [
      "Built modular event system supporting multiple concurrent campaigns",
      "Reduced event deployment time by 70% through tooling automation",
      "Integrated analytics pipeline for real-time performance tracking",
    ],
    tags: ["Unity", "C#", "Mobile", "Tools"],
  },
  {
    name: "UI Toolkit Extension",
    description: "Custom Unity UI framework for rapid game interface development",
    bullets: [
      "Created reusable component library with 30+ pre-built widgets",
      "Implemented animation system with timeline integration",
      "Achieved 60fps on mid-range mobile devices",
    ],
    tags: ["Unity", "C#", "UI", "Tools"],
  },
  {
    name: "Level Editor Pipeline",
    description: "In-house tooling suite for level design and asset management",
    bullets: [
      "Developed visual scripting system for non-programmers",
      "Streamlined asset pipeline reducing build times by 40%",
      "Enabled version control integration for collaborative workflows",
    ],
    tags: ["Unity", "C#", "Tools", "Editor"],
  },
  {
    name: "Performance Profiling SDK",
    description: "Cross-platform performance monitoring and optimization toolkit",
    bullets: [
      "Built real-time profiling dashboard with memory and frame analysis",
      "Identified bottlenecks across 5+ shipped titles",
      "Integrated automated regression testing in CI/CD pipeline",
    ],
    tags: ["Unity", "C++", "Tools", "SDK"],
  },
  {
    name: "Match-3 Core Systems",
    description: "High-performance game engine for mobile puzzle games",
    bullets: [
      "Designed efficient board state management with undo/redo",
      "Optimized particle systems handling 500+ simultaneous effects",
      "Delivered consistent 60fps on devices dating back to 2018",
    ],
    tags: ["Unity", "C#", "Mobile", "Gameplay"],
  },
];

