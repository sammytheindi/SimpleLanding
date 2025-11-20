import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Menu, X, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import abstractTexture from "@assets/generated_images/abstract_data_visualization_flow_in_navy_and_black.png";

// --- Components ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.1);
    y.set((clientY - center.y) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const ProjectItem = ({ title, role, year, description }: { title: string, role: string, year: string, description?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, borderBottomColor: "hsl(var(--border))" }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ borderBottomColor: "hsl(var(--primary))", backgroundColor: "hsl(var(--muted) / 0.3)" }}
      className="group flex flex-col md:flex-row md:items-start border-t border-border py-8 px-4 -mx-4 transition-colors duration-300 cursor-pointer"
    >
      <span className="font-mono text-xs md:w-32 text-muted-foreground group-hover:text-primary transition-colors mb-2 md:mb-0 pt-2">{year}</span>
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-primary" />
        </div>
        <p className="font-mono text-sm text-muted-foreground max-w-xl">{description}</p>
      </div>
      <span className="font-mono text-xs md:w-32 text-right text-muted-foreground mt-4 md:mt-0 pt-2 uppercase tracking-widest">{role}</span>
    </motion.div>
  );
};

// --- Main Page ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax for texture
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <NoiseOverlay />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-background">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-lg font-display font-bold tracking-tighter z-50">SAMYAK SHAH</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest z-50">
            {['Ventures', 'Blog', 'Math', 'Philosophy', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-70 transition-opacity relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          {['Ventures', 'Blog', 'Math', 'Philosophy', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>{item}</a>
          ))}
        </div>
      </motion.div>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col justify-center border-b border-border overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <FadeIn>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-12 tracking-tight">
                Building at the <br/>
                <span className="italic text-primary">intersection</span> of AI <br/>
                & Healthcare.
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2} className="max-w-2xl border-l-2 border-primary pl-8 ml-2">
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Founder and technology leader transforming ambitious technical concepts into commercial products. 
                My work spans the full product lifecycle: from architecting full-stack solutions to leading teams through rigorous FDA regulatory hurdles.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                  View Ventures
                </MagneticButton>
                <MagneticButton className="px-6 py-3 border border-border font-mono text-xs uppercase tracking-widest hover:bg-muted transition-colors">
                  Read Blog
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Dynamic Background Element */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-full md:w-[50vw] h-full z-0 opacity-20 md:opacity-40 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
          <img 
            src={abstractTexture} 
            alt="Abstract Data Flow" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </motion.div>
      </header>

      {/* Philosophy / Intro Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
        <div className="md:col-span-8 p-12 md:p-24 border-b md:border-b-0 md:border-r border-border">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Multidisciplinary Synthesis</h2>
            <div className="prose prose-lg text-muted-foreground font-sans leading-relaxed">
              <p className="mb-6">
                My strength lies in synthesizing knowledge from disparate fields—from Biomedical Engineering and Data Science to Regulatory Affairs and UI/UX. 
                This synthesis is the key to solving technically ambitious problems with holistic solutions.
              </p>
              <p>
                I believe the most resilient products are built on this fundamental understanding of the entire technology stack, especially in complex domains like AI and regulated healthcare.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-4 bg-muted/30 p-12 flex flex-col justify-center">
          <div className="space-y-8 font-mono text-xs uppercase tracking-widest">
            <div className="group cursor-default">
              <span className="block text-primary mb-2 group-hover:translate-x-2 transition-transform">Focus</span>
              <ul className="space-y-1 text-muted-foreground">
                <li>AI/ML Architectures</li>
                <li>Wearable Technology</li>
                <li>Brain-Computer Interfaces</li>
                <li>Regulated Environments</li>
              </ul>
            </div>
            <div className="group cursor-default">
              <span className="block text-primary mb-2 group-hover:translate-x-2 transition-transform">Education</span>
              <ul className="space-y-1 text-muted-foreground">
                <li>Johns Hopkins</li>
                <li>Glasgow University</li>
                <li>UC Irvine</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section id="ventures" className="py-24 container mx-auto px-6">
        <FadeIn className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 block">Portfolio</span>
            <h2 className="font-display text-5xl md:text-6xl">Ventures & Work</h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-muted-foreground max-w-xs text-right">
            Select projects from concept to commercialization
          </span>
        </FadeIn>

        <div className="flex flex-col">
          <ProjectItem 
            title="EpiWatch" 
            role="Co-Founder / Head of Tech" 
            year="Current"
            description="Led development of a wearable AI platform from idea to market-ready medical device. Secured grant funding, architected full-stack solutions, and managed FDA regulatory hurdles."
          />
          <ProjectItem 
            title="Orba" 
            role="Founder" 
            year="2023"
            description="Transforming ambitious technical concepts into commercial products."
          />
          <ProjectItem 
            title="Strides" 
            role="Lead Engineer" 
            year="2022"
            description="Advanced wearable integration for gait analysis and rehabilitation monitoring."
          />
          <ProjectItem 
            title="JHU BCI Lab" 
            role="Researcher" 
            year="2021"
            description="Researching novel brain-computer interface systems for motor control restoration."
          />
          <ProjectItem 
            title="Philips Healthcare" 
            role="Systems Engineer" 
            year="2020"
            description="Working on next-generation diagnostic imaging systems and workflow optimization."
          />
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Writing / Blog Preview */}
      <section id="blog" className="bg-foreground text-background py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-4xl mb-8">Writing & Thoughts</h2>
              <p className="font-mono text-sm opacity-70 mb-8 max-w-md">
                I write about the lessons learned building in regulated industries, the philosophy of technology, and the mathematics behind modern AI.
              </p>
              <MagneticButton className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-background/20 px-6 py-3 hover:bg-background hover:text-foreground transition-colors">
                View All Posts <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
            <div className="space-y-8">
              {[
                "The Ethics of AI in Clinical Decision Support",
                "Architecting for FDA Approval: A Technical Guide",
                "On the Convergence of BCI and Consumer Wearables"
              ].map((post, i) => (
                <a key={i} href="#" className="block group">
                  <span className="font-mono text-xs text-primary mb-2 block">Essay 0{i+1}</span>
                  <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4">{post}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section id="about" className="py-24 border-b border-border bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 z-10" />
                {/* Placeholder for personal image */}
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600 font-mono text-xs">
                  [Personal Image Placeholder]
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-4xl mb-8">Beyond the Screen</h2>
              <div className="prose font-sans text-muted-foreground">
                <p className="mb-4">
                  Technology alone doesn't build a successful venture. I am deeply engaged in the entire go-to-market lifecycle, from product-market fit to commercialization strategy.
                </p>
                <p className="mb-4">
                  Outside of work, I am an avid runner and tennis player. I used to play high-level competitive cricket and soccer. In the winters, you'll find me skiing or ice-skating.
                </p>
                <p>
                  Currently based in <span className="text-foreground font-medium">Baltimore, USA</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="pt-32 pb-12 container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <p className="font-mono text-sm text-primary uppercase tracking-widest mb-8">Connect</p>
          <h2 className="font-display text-6xl md:text-7xl leading-tight mb-12">
            Building something ambitious? <br />
            <a href="mailto:hello@samyak.shah" className="text-muted-foreground hover:text-foreground transition-colors decoration-primary underline underline-offset-8">Let's talk.</a>
          </h2>
          
          <div className="flex flex-wrap gap-4 md:gap-8 font-mono text-sm">
            {[
              { icon: Mail, label: "Email", href: "mailto:hello@samyak.shah" },
              { icon: Twitter, label: "Twitter", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Github, label: "GitHub", href: "#" }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href}
                className="flex items-center gap-2 border border-border px-6 py-3 hover:bg-foreground hover:text-background transition-all hover:-translate-y-1"
              >
                <social.icon className="w-4 h-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; 2025 Samyak Shah.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground">Math</a>
            <a href="#" className="hover:text-foreground">Philosophy</a>
            <a href="#" className="hover:text-foreground">Colophon</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
