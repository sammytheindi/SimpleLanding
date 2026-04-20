import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  pathname?: string;
}

export default function Navbar({ pathname }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname || "");

  useEffect(() => {
    if (!pathname) {
      setCurrentPath(window.location.pathname);
    }
  }, [pathname]);

  const links = [
    { name: 'Career', href: '/career' },
    { name: 'CV', href: '/cv' },
{ name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <>
      {/* Announcement strip */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-green-700 border-b border-green-600">
        <div className="container mx-auto px-6 h-full flex items-center justify-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
            Open to Senior / Staff ML roles · Dallas TX · Open to remote
          </span>
          <span className="text-green-400 font-mono text-[10px]">·</span>
          <a href="/contact" onClick={() => window.posthog?.capture("lets_talk_cta_clicked")} className="font-mono text-[10px] font-bold uppercase tracking-widest text-white underline underline-offset-2 decoration-green-400 hover:text-green-200 transition-colors whitespace-nowrap">
            Let's talk →
          </a>
        </div>
      </div>

      <nav className="fixed top-10 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/60 text-foreground">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-lg font-display font-bold tracking-tighter z-50 text-foreground hover:text-primary transition-colors">
            SAMYAK SHAH
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest z-50">
            {links.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className={`relative group transition-colors ${isActive(item.href) ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? "auto" : "none" }}
        className="fixed inset-0 bg-background z-30 flex items-center justify-center md:hidden"
      >
        <div className="flex flex-col gap-8 text-center font-display text-4xl text-foreground">
          {links.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)} 
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
