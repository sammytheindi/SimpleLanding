import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";
import abstractTexture from "@assets/generated_images/abstract_geometric_black_white_and_navy_minimalist_texture.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-display font-bold tracking-tighter">ALEX.DESIGN</a>
          <div className="flex gap-8 text-sm font-mono uppercase tracking-widest">
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.p variants={fadeIn} className="font-mono text-sm mb-6 text-muted-foreground uppercase tracking-widest">
              Digital Product Designer
            </motion.p>
            <motion.h1 variants={fadeIn} className="font-display text-7xl md:text-9xl leading-[0.9] mb-12">
              Crafting <br/>
              <span className="text-stroke text-foreground">Digital</span> <br/>
              <span className="text-primary">Clarity.</span>
            </motion.h1>
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-12 items-start md:items-end justify-between border-t border-border pt-8">
              <p className="max-w-md font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                Specializing in minimalist interfaces and robust design systems. 
                I remove the noise to let the content speak.
              </p>
              <a href="#contact" className="group flex items-center gap-2 font-mono uppercase text-sm border border-border px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300">
                Start a Project
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image / Texture Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
        <div className="h-[60vh] md:h-auto border-b md:border-b-0 md:border-r border-border overflow-hidden relative group">
          <img 
            src={abstractTexture} 
            alt="Abstract Geometric Texture" 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>
        <div className="p-12 md:p-24 flex flex-col justify-center">
          <h2 className="font-display text-4xl md:text-5xl mb-8">Philosophy</h2>
          <div className="space-y-8 font-mono text-sm">
            <div className="border-l-2 border-primary pl-6">
              <h3 className="font-bold uppercase tracking-widest mb-2">Less, but better</h3>
              <p className="text-muted-foreground">Reducing design to its essential elements to achieve purity and simplicity.</p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-primary transition-colors">
              <h3 className="font-bold uppercase tracking-widest mb-2">Function First</h3>
              <p className="text-muted-foreground">Design must serve a purpose. Aesthetics are the result of a problem solved well.</p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-primary transition-colors">
              <h3 className="font-bold uppercase tracking-widest mb-2">Systematic</h3>
              <p className="text-muted-foreground">Building scalable design languages, not just isolated pages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work List */}
      <section id="work" className="py-24 border-b border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display text-5xl md:text-6xl">Selected Work</h2>
            <span className="font-mono text-sm hidden md:block">(2023 — 2025)</span>
          </div>

          <div className="flex flex-col">
            {[
              { id: "01", name: "Fintech Dashboard", cat: "UI/UX Design", year: "2025" },
              { id: "02", name: "Architectural Digest", cat: "Web Development", year: "2024" },
              { id: "03", name: "Mono Systems", cat: "Branding", year: "2024" },
              { id: "04", name: "Nebula AI Interface", cat: "Product Design", year: "2023" },
            ].map((item) => (
              <a 
                key={item.id} 
                href="#" 
                className="group flex flex-col md:flex-row md:items-center border-t border-border py-8 hover:bg-foreground hover:text-background transition-colors px-4 -mx-4"
              >
                <span className="font-mono text-xs md:w-24 text-muted-foreground group-hover:text-background/60 mb-2 md:mb-0">{item.id}</span>
                <span className="font-display text-3xl md:text-4xl flex-1 group-hover:translate-x-4 transition-transform duration-300">{item.name}</span>
                <div className="flex items-center justify-between md:w-64 mt-4 md:mt-0 font-mono text-xs uppercase tracking-widest">
                  <span>{item.cat}</span>
                  <span>{item.year}</span>
                </div>
              </a>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 container mx-auto px-6">
        <div className="max-w-4xl">
          <p className="font-mono text-sm text-primary uppercase tracking-widest mb-8">Get in touch</p>
          <h2 className="font-display text-6xl md:text-8xl leading-none mb-12">
            Have an idea? <br />
            Let's build it.
          </h2>
          
          <a 
            href="mailto:hello@alex.design" 
            className="inline-flex items-center gap-4 font-display text-3xl md:text-4xl border-b-2 border-foreground hover:text-primary hover:border-primary transition-colors pb-2"
          >
            hello@alex.design
            <Mail className="w-8 h-8" />
          </a>

          <div className="flex gap-8 mt-24">
            <a href="#" className="p-4 border border-border hover:bg-foreground hover:text-background transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-4 border border-border hover:bg-foreground hover:text-background transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-4 border border-border hover:bg-foreground hover:text-background transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>&copy; 2025 Alex Design. All rights reserved.</p>
          <p>Designed in Switzerland. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}
