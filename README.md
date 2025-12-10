# Portfolio Website - Lautaro Pereyra

A modern, single-page portfolio website for a Senior Game Developer, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Single-page design** with smooth scroll navigation
- **Companion character** with animated states that change based on active section
- **Dark theme** by default with theme toggle
- **Responsive layout**: 2-column desktop (character + content), stacked mobile
- **Sections**:
  - Hero with headline and CTA buttons
  - Experience timeline with career progression
  - Projects showcase as numbered list
  - Contact form with social links

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **shadcn/ui** (basic UI primitives)
- **next-themes** (theme management)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with navbar and footer
│   ├── page.tsx            # Main page with scroll detection
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── CompanionCharacter.tsx  # Animated character component
│   ├── Navbar.tsx             # Navigation bar
│   ├── Footer.tsx             # Footer component
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/                    # shadcn/ui components
├── data/
│   ├── experience.ts       # Experience data
│   └── projects.ts         # Projects data
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## Customization

### Update Content

Edit the data files:
- `data/experience.ts` - Add/modify work experience
- `data/projects.ts` - Add/modify projects

### Update Personal Info

Edit:
- `app/page.tsx` - Scroll detection logic and layout
- `components/sections/HeroSection.tsx` - Hero content
- `components/Navbar.tsx` - Name in navbar
- `components/Footer.tsx` - Footer text

### Styling

- Theme colors: `app/globals.css` (CSS variables)
- Tailwind config: `tailwind.config.ts`
- Component styles: Individual component files

## Companion Character

The character animates based on the active section:
- **Hero**: `idle` - Gentle floating animation
- **Experience**: `run` - Running/moving forward animation
- **Projects**: `action` - Action/attack animation
- **Contact**: `wave` - Waving animation

Character animation states are managed in `components/CompanionCharacter.tsx`.

## License

MIT

