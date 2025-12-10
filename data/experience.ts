export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  tech?: string[];
}

export const experiences: Experience[] = [
  {
    title: "Technical Lead Game Developer",
    company: "TGA Entertainment",
    period: "2024–present",
    description: [
      "Leading mobile game development with Unity C#",
      "Building scalable frameworks and improving development pipelines",
    ],
    tech: ["Unity", "C#", "Mobile"],
  },
  {
    title: "Senior Game Developer",
    company: "B2B Game Studio",
    period: "2023–2024",
    description: [
      "Remote Unity C# development",
      "Tools and UI systems optimization",
    ],
    tech: ["Unity", "C#"],
  },
  {
    title: "Senior Game Developer",
    company: "NimbleGiant",
    period: "2023",
    description: [
      "Fortnite development with Unreal Engine",
      "Gameplay systems and performance optimization",
    ],
    tech: ["Unreal Engine", "C++"],
  },
  {
    title: "Senior Game Developer",
    company: "GameCloudNet",
    period: "2022–2023",
    description: [
      "Mobile game development",
      "Liveops and monetization systems",
    ],
    tech: ["Unity", "C#", "Mobile"],
  },
  {
    title: "Senior Game Developer",
    company: "Holos Technology",
    period: "2021–2022",
    description: [
      "VR game development",
      "UI/UX for immersive experiences",
    ],
    tech: ["Unity", "C#", "VR"],
  },
  {
    title: "Game Developer",
    company: "Jam City",
    period: "2019–2021",
    description: [
      "Mobile game development",
      "Cross-platform tools and pipelines",
    ],
    tech: ["Unity", "C#", "C++", "Mobile"],
  },
  {
    title: "UI Game Developer",
    company: "Globant",
    period: "2018–2019",
    description: [
      "Console game UI development",
      "Multi-language and scripting systems",
    ],
    tech: ["C++", "AS3", "Lua", "Console"],
  },
];

