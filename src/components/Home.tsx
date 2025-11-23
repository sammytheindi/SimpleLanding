import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

import Navbar from "./Navbar";
import EEGBackground from "./EEGBackground";

// --- Components ---

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
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const ProjectItem = ({ title, role, year, description }: { title: string, role: string, year: string, description?: string }) => {
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
      

    </div>
  );
};

// --- Main Page ---

export default function Home() {
  const { scrollY } = useScroll();
  
  // Parallax for texture
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden cursor-none">
      
      {/* Use Global Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex flex-col justify-center border-b border-border overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <HeroBackground />
          <EEGBackground lineCount={15} opacity={0.075} />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-12 tracking-tight"
              >
                Building at the <br/>
                <span className="italic text-primary relative">
                  intersection
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                    viewBox="0 0 300 20" 
                    className="absolute -bottom-2 left-0 w-full h-4 text-primary stroke-current fill-none"
                  >
                    <path d="M5 15 Q 150 5 295 15" strokeWidth="4" />
                  </motion.svg>
                </span> of AI <br/>
                & Healthcare.
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="max-w-2xl border-l-2 border-primary pl-8 ml-2"
            >
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Founder and technology leader transforming ambitious technical concepts into commercial products. 
                My work spans the full product lifecycle: from architecting full-stack solutions to leading teams through rigorous FDA regulatory hurdles.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                  <a href="/ventures">View Ventures</a>
                </MagneticButton>
                <MagneticButton className="px-6 py-3 border border-border font-mono text-xs uppercase tracking-widest hover:bg-muted transition-colors bg-transparent">
                  <a href="/blog">Read Blog</a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Background Element - Updated */}
      {/* Dynamic Background Element - Removed as per request */}

      </header>

      {/* Philosophy / Intro Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
        <div className="md:col-span-8 p-12 md:p-24 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
           {/* Background Grid Animation */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] mask-image-fade-bottom"></div>
          
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Multidisciplinary Synthesis</h2>
            <div className="prose prose-lg text-muted-foreground font-mono leading-relaxed relative z-10">
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
            <div className="group cursor-pointer">
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
            <div className="group cursor-pointer">
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
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 block">Featured</span>
            <h2 className="font-display text-5xl md:text-6xl">Selected Work</h2>
          </div>
          <a href="/ventures" className="hidden md:flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <div className="flex flex-col">
          <ProjectItem 
            title="EpiWatch" 
            role="Co-Founder / Head of Tech" 
            year="Current"
            description="Led development of a wearable AI platform from idea to market-ready medical device."
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
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Writing / Blog Preview */}
      <section id="blog" className="bg-foreground text-background py-24 relative overflow-hidden" data-cursor="light">
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
                    <span className="font-mono text-xs text-primary-foreground/70 mb-2 block">Essay 0{i+1}</span>
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
                <div className="prose font-mono text-muted-foreground">
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
              <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors decoration-primary underline underline-offset-8 decoration-2">Let's talk.</a>
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
            <a href="/contact" className="hover:text-foreground">Contact</a>
            <a href="#" className="hover:text-foreground">Colophon</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
