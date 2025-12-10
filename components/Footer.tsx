export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
        <p>© {currentYear} Lautaro Pereyra</p>
        <p className="mt-2">
          Built with Next.js, Tailwind, Framer Motion
        </p>
      </div>
    </footer>
  );
}

