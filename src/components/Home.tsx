import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

import Navbar from "./Navbar";
import EEGBackground from "./EEGBackground";

// --- Components ---

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
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

const MagneticButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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

export const ProjectItem = ({
  title,
  role,
  year,
  description,
}: {
  title: string;
  role: string;
  year: string;
  description?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, borderBottomColor: "hsl(var(--border))" }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{
        borderBottomColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--muted) / 0.3)",
        paddingLeft: "1rem",
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

      <span className="font-mono text-xs md:w-32 text-muted-foreground group-hover:text-primary transition-colors mb-2 md:mb-0 pt-2 z-10 relative">
        {year}
      </span>
      <div className="flex-1 z-10 relative">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">
            {role}
          </h3>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-primary" />
        </div>
        <p className="font-mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">
          {title}
        </p>
        <p className="font-mono text-sm text-muted-foreground max-w-xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// --- Hero Photo Component ---

const DotMatrixPhoto = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 520, H = 693;

    const img = new Image();
    img.src = "/profile-transparent.png";
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const offCtx = off.getContext("2d")!;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = W / H;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = 0;
      }
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary").trim() || "220 100% 20%";

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        // Draw grayscale
        ctx.filter = "grayscale(1) brightness(1.9)";
        ctx.drawImage(off, 0, 0);
        ctx.filter = "none";
        // Navy tint only over the silhouette
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "hsl(220 70% 15% / 0.5)";
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "source-over";

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    };

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) * (520 / rect.width),
      y: (e.clientY - rect.top) * (693 / rect.height),
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={693}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseRef.current = { x: -9999, y: -9999 }; }}
      className="cursor-none w-full max-w-[520px]"
    />
  );
};

const HeroPhoto = () => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="relative"
  >
    <DotMatrixPhoto />
    <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-primary/40 -z-10" />
    <div className="absolute -top-3 -left-3 w-8 h-8 border border-border -z-10" />
  </motion.div>
);

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
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen"
      />
    </div>
  );
};

// --- Personal Carousel ---

const SLIDES = [
  { src: "/personal-2.jpg", caption: "Presenting LLM-augmented BCI research at Society For Neuroscience" },
  { src: "/personal-1.jpg", caption: "Using CAD and a custom gingerbread batter to over-engineer a gingerbread house with my wife!" },
  { src: "/personal-3.jpg", caption: "Getting lost on one of the nicest trails in Maryland (Sugarloaf iykyk)" },
  { src: "/personal-4.jpg", caption: "Me and my wife after finishing our first marathon at the beautiful Rehoboth Beach!" },
  { src: "/personal-5.jpg", caption: "Shredding up the slopes moments before wiping out at Snowshoe Mountain" },
];

const PersonalCarousel = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go((index - 1 + SLIDES.length) % SLIDES.length);
  const next = () => go((index + 1) % SLIDES.length);

  return (
    <div className="relative border border-border overflow-hidden">
      {/* Controls — fixed at top so caption changes don't shift layout */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`w-1.5 h-1.5 transition-colors ${i === index ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="font-mono text-xs px-3 py-1 border border-border hover:bg-muted transition-colors">←</button>
          <button onClick={next} className="font-mono text-xs px-3 py-1 border border-border hover:bg-muted transition-colors">→</button>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <motion.img
          key={index}
          src={SLIDES[index].src}
          alt={SLIDES[index].caption}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Caption — fixed height so layout doesn't shift */}
      <div className="px-4 py-3 border-t border-border bg-background min-h-[56px] flex items-center">
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">{SLIDES[index].caption}</p>
      </div>
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
      <header className="relative min-h-[95vh] flex flex-col justify-start md:justify-center border-b border-border overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          <HeroBackground />
          <EEGBackground lineCount={15} opacity={0.075} />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-48 md:pt-32 pb-16 md:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="max-w-2xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-6xl md:text-8xl lg:text-8xl leading-[0.9] mb-12 tracking-tight"
              >
                Building{" "}
                <span className="italic text-primary relative">
                  ML systems
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                    viewBox="0 0 300 20"
                    className="absolute -bottom-2 left-0 w-full h-4 text-primary stroke-current fill-none"
                  >
                    <path d="M5 15 Q 150 5 295 15" strokeWidth="4" />
                  </motion.svg>
                </span>{" "}
                <br />
                from modeling to production
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="max-w-2xl border-l-2 border-primary pl-8 ml-2"
            >
              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Senior ML Engineer and data scientist specializing in production
                ML, probabilistic modeling, real-time inference, LLM systems,
                and MLOps. I've shipped novel algorithms from research to
                production, built distributed data platforms, and led end-to-end
                ML across high-stakes environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                  <a href="/career" onClick={() => window.posthog?.capture("view_career_clicked")}>View Career</a>
                </MagneticButton>
                <MagneticButton className="px-6 py-3 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors bg-transparent">
                  <a href="/Samyak_Shah_CV.pdf" download onClick={() => window.posthog?.capture("cv_downloaded")}>Download CV</a>
                </MagneticButton>
                <MagneticButton className="px-6 py-3 border border-border font-mono text-xs uppercase tracking-widest hover:bg-muted transition-colors bg-transparent">
                  <a href="/blog">Read Blog</a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center lg:justify-start mt-8 lg:mt-0">
            <HeroPhoto />
          </div>
          </div>
        </div>

        {/* Dynamic Background Element - Updated */}
        {/* Dynamic Background Element - Removed as per request */}
      </header>

      {/* Philosophy / Intro Grid */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8 py-12 md:py-24 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] mask-image-fade-bottom"></div>

            <FadeIn>
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                Engineering Rigor at Scale
              </h2>
              <div className="prose prose-lg text-muted-foreground font-mono leading-relaxed relative z-10">
                <p className="mb-6">
                  My work sits at the intersection of deep technical ML and the
                  engineering discipline required to ship it reliably. Building
                  in high-stakes environments forces real rigor: reproducible
                  experiments, measurable outcomes, systems that hold up under
                  adversarial conditions.
                </p>
                <p>
                  I believe the most trustworthy ML systems are built on
                  probabilistic thinking, careful instrumentation, and the
                  willingness to treat every deployment as a live experiment
                  worth measuring.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-4 bg-muted/30 py-10 md:p-12 flex flex-col justify-center relative">
            <div className="space-y-8 font-mono text-xs uppercase tracking-widest relative z-10">
              <div className="group cursor-pointer">
                <span className="block text-primary mb-2 group-hover:translate-x-2 transition-transform">
                  Focus
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  {[
                    "Production ML & MLOps",
                    "Probabilistic & Statistical Modeling",
                    "LLM Systems & Applied AI",
                    "Real-Time Inference & Distributed Systems",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="group cursor-pointer">
                <span className="block text-primary mb-2 group-hover:translate-x-2 transition-transform">
                  Education
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Johns Hopkins</li>
                  <li>Glasgow University</li>
                  <li>UC Irvine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-24 container mx-auto px-6 relative">
        <div className="absolute top-0 left-0 w-1 h-24 bg-primary" />

        <FadeIn className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 block">
              Featured
            </span>
            <h2 className="font-display text-5xl md:text-6xl">
              Career Highlights
            </h2>
          </div>
          <a
            href="/career"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            View Full Career <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <div className="flex flex-col">
          <ProjectItem
            title="EpiWatch"
            role="Co-Founder / Principal ML Engineer"
            year="Current"
            description="Led development of a wearable AI platform from idea to market-ready medical device."
          />
          <ProjectItem
            title="Orba"
            role="Co-Founder / Applied ML Engineer"
            year="2023"
            description="Transforming ambitious technical concepts into commercial products."
          />
          <ProjectItem
            title="JHU BCI Lab · Johns Hopkins University"
            role="Senior Software Engineer"
            year="2019"
            description="Production real-time inference pipeline, neural decoding with HMMs and deep learning, and LLM-based BCI with long-term memory."
          />
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Achievements Strip */}
      <section className="bg-[#0f2044] py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-mono text-xs uppercase tracking-widest text-blue-300/70">
            {[
              { value: "8", label: "Peer-Reviewed Papers" },
              { value: "256", label: "Citations" },
              { value: "2", label: "Patents" },
              { value: "FDA", label: "Cleared" },
              { value: "$300K", label: "NIH Grant" },
              { value: "Top 4%", label: "MedTech Innovator" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-white font-bold text-lg">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing / Blog Preview */}
      <section
        id="blog"
        className="bg-foreground text-background py-24 relative overflow-hidden"
        data-cursor="light"
      >
        {/* Inverted Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <h2 className="font-display text-4xl mb-8">
                  Writing & Thoughts
                </h2>
                <p className="font-mono text-sm opacity-70 mb-8 max-w-md">
                  I write about probabilistic modeling in practice, MLOps
                  patterns for real-world systems, LLM system design, and the
                  engineering discipline required to ship reliable ML.
                </p>
                <MagneticButton className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-background/20 px-6 py-3 hover:bg-background hover:text-foreground transition-colors">
                  <a href="/blog" className="flex items-center gap-2">
                    View All Posts <ArrowUpRight className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </FadeIn>
            </div>
            <div className="space-y-8">
              {[
                { title: "Architecting FDA Approval", slug: "architecting-fda-approval", label: "Deep Dive" },
                { title: "Weekly Challenge: Optimizing Transformer Inference", slug: "challenge-transformer-inference", label: "Challenge" },
                { title: "On the Convergence of BCI and Consumer Wearables", slug: "convergence-bci-wearables", label: "Notes" },
              ].map((post, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <a href={`/blog/${post.slug}`} className="block group">
                    <span className="font-mono text-xs text-primary-foreground/70 mb-2 block">
                      {post.label}
                    </span>
                    <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4 decoration-primary/50">
                      {post.title}
                    </h3>
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
              <FadeIn>
                <PersonalCarousel />
              </FadeIn>
            </div>
            <div className="order-1 md:order-2">
              <FadeIn>
                <h2 className="font-display text-4xl mb-8">
                  Beyond the Screen
                </h2>
                <div className="prose font-mono text-muted-foreground">
                  <p className="mb-4">
                    Technology alone doesn't build a successful venture. I am
                    deeply engaged in the entire go-to-market lifecycle, from
                    product-market fit to commercialization strategy.
                  </p>
                  <p className="mb-4">
                    Outside of work, I am an avid runner and tennis player. I
                    used to play high-level competitive cricket and soccer. In
                    the winters, you'll find me skiing or ice-skating.
                  </p>
                  <p>
                    Currently based in{" "}
                    <span className="text-foreground font-medium">
                      Dallas, TX
                    </span>
                    .
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer
        id="contact"
        className="pt-32 pb-12 container mx-auto px-6 relative"
      >
        <div className="max-w-4xl mb-24 relative z-10">
          <FadeIn>
            <p className="font-mono text-sm text-primary uppercase tracking-widest mb-8">
              Connect
            </p>
            <h2 className="font-display text-6xl md:text-7xl leading-tight mb-12">
              Looking for a Staff or Senior ML Engineer? <br />
              <a
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors decoration-primary underline underline-offset-8 decoration-2"
              >
                Let's talk.
              </a>
            </h2>

            <div className="flex flex-wrap gap-4 md:gap-8 font-mono text-sm">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  href: "mailto:hello@samyak.shah",
                },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Github, label: "GitHub", href: "#" },
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
          <p>&copy; 2026 Samyak Shah.</p>
          <div className="flex gap-8">
            <a href="/contact" className="hover:text-foreground">
              Contact
            </a>
            <a href="#" className="hover:text-foreground">
              Colophon
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
