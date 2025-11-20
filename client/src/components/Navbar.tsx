import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { name: 'Ventures & Projects', href: '/ventures' },
    { name: 'CV', href: '/cv' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/60 text-foreground">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="text-lg font-display font-bold tracking-tighter z-50 text-foreground hover:text-primary transition-colors">SAMYAK SHAH</a>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest z-50">
            {links.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`relative group transition-colors ${location === item.href ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}>
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${location === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              </Link>
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
            <Link key={item.name} href={item.href}>
              <a onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">{item.name}</a>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}
