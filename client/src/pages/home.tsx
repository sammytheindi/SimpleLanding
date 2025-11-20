import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import abstractTexture from "@assets/generated_images/abstract_data_visualization_flow_in_navy_and_black.png";

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "hsl(var(--primary))" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: useSpring(cursorX, { stiffness: 500, damping: 25 }), // Slightly delayed follow
          y: useSpring(cursorY, { stiffness: 500, damping: 25 }),
          translateX: 12, // Center inside the larger circle
          translateY: 12
        }}
      />
    </>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full animate-noise" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }} // Custom ease
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
    x.set((clientX - center.x) * 0.2);
    y.set((clientY - center.y) * 0.2);
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
      whileHover={{ 
        borderBottomColor: "hsl(var(--primary))", 
        backgroundColor: "hsl(var(--muted) / 0.3)",
        paddingLeft: "1rem"
      }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col md:flex-row md:items-start border-t border-border py-8 px-4 -mx-4 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Animated background on hover */}
      <motion.div 
        className="absolute inset-0 bg-primary/5 z-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />
      
      <span className="font-mono text-xs md:w-32 text-muted-foreground group-hover:text-primary transition-colors mb-2 md:mb-0 pt-2 z-10 relative">{year}</span>
      <div className="flex-1 z-10 relative">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-primary" />
        </div>
        <p className="font-mono text-sm text-muted-foreground max-w-xl">{description}</p>
      </div>
      <span className="font-mono text-xs md:w-32 text-right text-muted-foreground mt-4 md:mt-0 pt-2 uppercase tracking-widest z-10 relative">{role}</span>
    </motion.div>
  );
};

// --- Background Animation Component ---

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Abstract Geometric Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Moving Gradient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen"
      />
      
      {/* Subtle Scanline */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10"
      />
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax for texture
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden cursor-none">
      <CustomCursor />
      <NoiseOverlay />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-background">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-lg font-display font-bold tracking-tighter z-50">SAMYAK SHAH</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest z-50">
            {['Ventures', 'CV', 'Blog', 'Math', 'Philosophy', 'Contact'].map((item) => (
              <a key={item} href={item === 'CV' ? '/cv' : item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`} className="hover:opacity-70 transition-opacity relative group">
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
          {['Ventures', 'CV', 'Blog', 'Math', 'Philosophy', 'Contact'].map((item) => (
            <a key={item} href={item === 'CV' ? '/cv' : item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>{item}</a>
          ))}
        </div>
      </motion.div>

      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex flex-col justify-center border-b border-border overflow-hidden">
        <HeroBackground />
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-12 tracking-tight"
              >
                Building at the <br/>
                <span className="italic text-primary relative">
                  intersection
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                    viewBox="0 0 300 20" 
                    className="absolute -bottom-2 left-0 w-full h-4 text-primary stroke-current fill-none"
                  >
                    <path d="M5 15 Q 150 5 295 15" strokeWidth="4" />
                  </motion.svg>
                </span> of AI <br/>
                & Healthcare.
              </motion.h1>
            </div>
            
            <FadeIn delay={0.4} className="max-w-2xl border-l-2 border-primary pl-8 ml-2">
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Founder and technology leader transforming ambitious technical concepts into commercial products. 
                My work spans the full product lifecycle: from architecting full-stack solutions to leading teams through rigorous FDA regulatory hurdles.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                  View Ventures
                </MagneticButton>
                <MagneticButton className="px-6 py-3 border border-border font-mono text-xs uppercase tracking-widest hover:bg-muted transition-colors bg-transparent">
                  <a href="/blog">Read Blog</a>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Dynamic Background Element - Updated */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-full md:w-[50vw] h-full z-0 opacity-30 pointer-events-none mix-blend-overlay"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={abstractTexture} 
            alt="Abstract Data Flow" 
            className="w-full h-full object-cover grayscale contrast-150"
          />
        </motion.div>
      </header>

      {/* Philosophy / Intro Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
        <div className="md:col-span-8 p-12 md:p-24 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
           {/* Background Grid Animation */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] mask-image-fade-bottom"></div>
          
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Multidisciplinary Synthesis</h2>
            <div className="prose prose-lg text-muted-foreground font-sans leading-relaxed relative z-10">
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
        <div className="md:col-span-4 bg-muted/30 p-12 flex flex-col justify-center relative">
          <div className="space-y-8 font-mono text-xs uppercase tracking-widest relative z-10">
            <div className="group cursor-default">
              <span className="block text-primary mb-2 group-hover:translate-x-2 transition-transform">Focus</span>
              <ul className="space-y-1 text-muted-foreground">
                {['AI/ML Architectures', 'Wearable Technology', 'Brain-Computer Interfaces', 'Regulated Environments'].map((item, i) => (
                   <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                   >{item}</motion.li>
                ))}
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
      <section id="ventures" className="py-24 container mx-auto px-6 relative">
        <div className="absolute top-0 left-0 w-1 h-24 bg-primary" />
        
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
      <section id="blog" className="bg-foreground text-background py-24 relative overflow-hidden">
        {/* Inverted Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <h2 className="font-display text-4xl mb-8">Writing & Thoughts</h2>
                <p className="font-mono text-sm opacity-70 mb-8 max-w-md">
                  I write about the lessons learned building in regulated industries, the philosophy of technology, and the mathematics behind modern AI.
                </p>
                <MagneticButton className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-background/20 px-6 py-3 hover:bg-background hover:text-foreground transition-colors">
                  <a href="/blog" className="flex items-center gap-2">View All Posts <ArrowUpRight className="w-4 h-4" /></a>
                </MagneticButton>
              </FadeIn>
            </div>
            <div className="space-y-8">
              {[
                "The Ethics of AI in Clinical Decision Support",
                "Architecting for FDA Approval: A Technical Guide",
                "On the Convergence of BCI and Consumer Wearables"
              ].map((post, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <a href="/blog" className="block group">
                    <span className="font-mono text-xs text-primary mb-2 block">Essay 0{i+1}</span>
                    <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4 decoration-primary/50">{post}</h3>
                  </a>
                </FadeIn>
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
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[4/3] bg-gray-200 relative overflow-hidden border border-border"
              >
                <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply" />
                {/* Placeholder for personal image */}
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 font-mono text-xs pattern-grid-lg">
                  <div className="text-center">
                    <p>[Personal Image]</p>
                    <p className="opacity-50 text-[10px] mt-2">Baltimore, MD</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="order-1 md:order-2">
              <FadeIn>
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
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="pt-32 pb-12 container mx-auto px-6 relative">
        <div className="max-w-4xl mb-24 relative z-10">
          <FadeIn>
            <p className="font-mono text-sm text-primary uppercase tracking-widest mb-8">Connect</p>
            <h2 className="font-display text-6xl md:text-7xl leading-tight mb-12">
              Building something ambitious? <br />
              <a href="mailto:hello@samyak.shah" className="text-muted-foreground hover:text-foreground transition-colors decoration-primary underline underline-offset-8 decoration-2">Let's talk.</a>
            </h2>
            
            <div className="flex flex-wrap gap-4 md:gap-8 font-mono text-sm">
              {[
                { icon: Mail, label: "Email", href: "mailto:hello@samyak.shah" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Github, label: "GitHub", href: "#" }
              ].map((social) => (
                <MagneticButton 
                  key={social.label}
                  className="flex items-center gap-2 border border-border px-6 py-3 hover:bg-foreground hover:text-background transition-all"
                >
                  <a href={social.href} className="flex items-center gap-2">
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </FadeIn>
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
