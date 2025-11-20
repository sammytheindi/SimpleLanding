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
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-background bg-background/80 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="text-lg font-display font-bold tracking-tighter z-50 text-foreground">SAMYAK SHAH</a>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest z-50">
            {links.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`hover:opacity-70 transition-opacity relative group text-foreground ${location === item.href ? 'opacity-100 font-bold' : 'opacity-80'}`}>
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-current transition-all ${location === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
        <div className="flex flex-col gap-8 text-center font-display text-4xl">
          {links.map((item) => (
            <Link key={item.name} href={item.href}>
              <a onClick={() => setIsMenuOpen(false)}>{item.name}</a>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}
