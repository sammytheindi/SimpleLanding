import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// --- Sample Data ---

export type Category = "All" | "Posts" | "Notes" | "Tutorials" | "Deep Dives" | "Challenges";

export const BLOG_POSTS = [
  {
    id: "1",
    title: "The Ethics of AI in Clinical Decision Support",
    slug: "ethics-ai-clinical-decision-support",
    date: "Oct 24, 2024",
    readTime: "8 min read",
    category: "Deep Dives",
    excerpt: "Exploring the moral implications of algorithmic bias in healthcare settings and the regulatory frameworks emerging to address them.",
    content: `
      <p>As artificial intelligence becomes increasingly integrated into clinical workflows, the question shifts from "can we build it?" to "should we trust it?" Clinical Decision Support Systems (CDSS) powered by machine learning offer the promise of earlier diagnoses and personalized treatment plans, but they also introduce significant ethical risks.</p>
      
      <h3>The Black Box Problem</h3>
      <p>One of the primary ethical challenges is interpretability. Deep learning models, particularly those used in imaging (radiology, pathology), often operate as "black boxes." When a model suggests a diagnosis of malignancy with 99% confidence, but cannot explain <em>why</em>, can a physician ethically act on that information?</p>
      
      <p>Regulatory bodies like the FDA are moving towards requirements for "explainability" in Software as a Medical Device (SaMD). This isn't just a technical nice-to-have; it's a safety requirement. If a model fails, we need to know why to prevent recurrence.</p>

      <h3>Algorithmic Bias and Health Equity</h3>
      <p>Models are only as good as the data they are trained on. Historically, medical datasets have been heavily skewed towards specific demographics. An AI trained primarily on data from urban academic medical centers may perform poorly on rural populations or underrepresented minorities.</p>
    `
  },
  {
    id: "2",
    title: "Architecting for FDA Approval: A Technical Guide",
    slug: "architecting-fda-approval",
    date: "Sep 12, 2024",
    readTime: "12 min read",
    category: "Tutorials",
    excerpt: "A practical guide for engineering teams on setting up Design Controls, Traceability Matrices, and QMS integrations from Day 1.",
    content: `
      <p>Many startups treat FDA compliance as a paperwork exercise to be completed after the product is built. This is a fatal mistake. Compliance is an engineering constraint, not just a legal one.</p>

      <h3>Design Controls as Engineering Artifacts</h3>
      <p>In the software world, we talk about requirements, specifications, and tests. The FDA uses specific language: User Needs, Design Inputs, Design Outputs, and Verification/Validation.</p>
      
      <ul>
        <li><strong>User Needs:</strong> What problem are we solving? (e.g., "User needs to know when a seizure occurs.")</li>
        <li><strong>Design Input:</strong> The technical requirement. (e.g., "System shall detect tonic-clonic motion with >90% sensitivity.")</li>
        <li><strong>Design Output:</strong> The code/architecture. (e.g., The specific Python classifier module.)</li>
      </ul>

      <h3>Automating Traceability</h3>
      <p>The Traceability Matrix links these three together. Manual matrices are brittle. We implemented automated traceability by linking Jira tickets (Requirements) to GitHub PRs (Implementation) and Xray Tests (Verification). This allows us to generate a real-time compliance matrix with every build.</p>
    `
  },
  {
    id: "3",
    title: "On the Convergence of BCI and Consumer Wearables",
    slug: "convergence-bci-wearables",
    date: "Aug 05, 2024",
    readTime: "6 min read",
    category: "Notes",
    excerpt: "Thoughts on how non-invasive neural interfaces are slowly merging with the form factors of standard smartwatches and earbuds.",
    content: `
      <p>We are seeing a shift in Brain-Computer Interfaces (BCI) from purely clinical, invasive devices (like Utah arrays) to consumer-friendly form factors. Companies like Meta and Apple are investigating neural inputs via wrist-based electromyography (EMG) and ear-based EEG.</p>
      
      <p>The "AirPods as a Platform" concept is particularly interesting. The ear canal is an excellent location for biological sensing—close to the brain for EEG, stable for motion artifacts, and vascularized for heart rate.</p>
    `
  },
  {
    id: "4",
    title: "Weekly Challenge: Optimizing Transformer Inference",
    slug: "challenge-transformer-inference",
    date: "Jul 15, 2024",
    readTime: "4 min read",
    category: "Challenges",
    excerpt: "My attempt at reducing the latency of a Llama-2-7b model on edge devices using quantization and pruning.",
    content: `
      <p>This week's challenge was to get a 7B parameter model running at >10 tokens/sec on a standard MacBook Air (M1) without destroying perplexity.</p>
      
      <h3>Approach</h3>
      <p>I utilized <code>llama.cpp</code> for 4-bit quantization (Q4_K_M). The results were surprisingly robust. The memory footprint dropped from ~14GB (FP16) to ~4GB, fitting entirely within the unified memory of the base M1 chip.</p>
    `
  },
  {
    id: "5",
    title: "Why I chose Rust for Medical Device Middleware",
    slug: "why-rust-medical-device",
    date: "Jun 20, 2024",
    readTime: "10 min read",
    category: "Posts",
    excerpt: "Memory safety without garbage collection makes Rust a compelling choice for high-reliability systems where a crash is not an option.",
    content: `
      <p>In medical devices, reliability is paramount. A "segfault" isn't just an annoyance; it could mean a missed alarm or a halted therapy.</p>
      <p>C++ has long been the standard, but managing memory manually is error-prone. Rust's borrow checker enforces memory safety at compile time. This eliminates entire classes of bugs (buffer overflows, use-after-free) that are common in C/C++ codebases.</p>
    `
  },
   {
    id: "6",
    title: "Mathematical Intuition behind Diffusion Models",
    slug: "math-intuition-diffusion",
    date: "May 10, 2024",
    readTime: "15 min read",
    category: "Deep Dives",
    excerpt: "Breaking down the stochastic differential equations (SDEs) that power modern generative image models.",
    content: `
      <p>At their core, diffusion models are about destroying and reconstructing information. We take an image and slowly add Gaussian noise until it is pure static. The model learns the <em>reverse</em> process: how to take static and denoise it step-by-step into a coherent image.</p>
    `
  }
];

// --- Components ---

const CategoryButton = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-300
      ${active 
        ? "bg-primary text-primary-foreground border-primary" 
        : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"}
    `}
  >
    {label}
  </button>
);

const ArticleCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <Link href={`/blog/${post.slug}`}>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border-t border-border py-12 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
            <Tag className="w-3 h-3" />
            {post.category}
          </div>
          <div className="text-xs font-mono text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" /> {post.readTime}
            </div>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
            Read Article <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.article>
  </Link>
);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-lg font-display font-bold tracking-tighter">SAMYAK SHAH</a>
          </Link>
          <div className="flex items-center gap-6">
             <Link href="/">
               <a className="text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors">Back to Home</a>
             </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl mb-8"
          >
            Writing & <br/> <span className="text-primary">Thinking</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed mb-12"
          >
            A collection of essays, technical notes, and tutorials on engineering, philosophy, and the chaotic process of building products.
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {(["All", "Posts", "Notes", "Tutorials", "Deep Dives", "Challenges"] as Category[]).map((cat) => (
              <CategoryButton 
                key={cat} 
                label={cat} 
                active={activeCategory === cat} 
                onClick={() => setActiveCategory(cat)} 
              />
            ))}
          </motion.div>
        </header>

        <div className="min-h-[400px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => <ArticleCard key={post.id} post={post} />)
          ) : (
            <div className="py-24 text-center font-mono text-muted-foreground">
              No posts found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
