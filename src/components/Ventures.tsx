import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ProjectListItem = ({ title, role, year, description, link }: { title: string, role: string, year: string, description?: string, link?: string }) => {
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
      onClick={() => window.posthog?.capture("venture_project_clicked", { title, role, year })}
      className="group flex flex-col md:flex-row md:items-start border-t border-border py-12 px-4 -mx-4 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-primary/5 z-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />
      
      <span className="font-mono text-xs md:w-32 text-muted-foreground group-hover:text-primary transition-colors mb-2 md:mb-0 pt-2 z-10 relative">{year}</span>
      <div className="flex-1 z-10 relative">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-display text-3xl md:text-4xl group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
          {link && <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-primary" />}
        </div>
        <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
      </div>
      <span className="font-mono text-xs md:w-48 text-right text-muted-foreground mt-4 md:mt-0 pt-2 uppercase tracking-widest z-10 relative">{role}</span>
    </motion.div>
  );
};

export default function Ventures() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-24">
        <header className="mb-24">
          <FadeIn>
            <h1 className="font-display text-6xl md:text-8xl mb-8">
              Ventures & <br/> <span className="text-primary">Projects</span>
            </h1>
            <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              A selected collection of production ML systems, data platforms, and applied AI products built across healthcare, BCI research, and enterprise automation.
            </p>
          </FadeIn>
        </header>

        <div className="flex flex-col">
          <ProjectListItem
            title="EpiWatch"
            role="Co-Founder / Principal ML Engineer"
            year="Current"
            description="Built a production wearable ML platform for real-time seizure detection. Novel algorithm with 10x improvement over prior art, FDA-cleared. Led on-device inference, distributed Spark training, probabilistic modeling, ClickHouse data platform, and full MLOps stack."
          />
          <ProjectListItem
            title="Orba"
            role="Co-Founder / Applied ML Engineer"
            year="2023"
            description="Production LLM platform for customer-facing automation — RAG pipelines, fine-tuning, NeMo Guardrails, real-time voice AI with sub-200ms latency."
          />
          <ProjectListItem 
            title="Strides" 
            role="Lead Engineer" 
            year="2022"
            description="Advanced wearable integration for gait analysis and rehabilitation monitoring."
          />
           <ProjectListItem 
            title="JobFunnel" 
            role="Open Source Contributor" 
            year="2021"
            description="Community-driven project for scraping job applications. Provided novel method for bypassing CAPTCHA restrictions."
          />
          <ProjectListItem
            title="JHU BCI Lab"
            role="Senior Software Engineer"
            year="2021"
            description="Production real-time inference pipeline (sub-70ms latency), HMM + deep learning for neural decoding, Bayesian/MCMC probabilistic modeling, LLM-based BCI with long-term memory."
          />
          <ProjectListItem 
            title="Philips Healthcare" 
            role="Systems Engineer" 
            year="2020"
            description="Next-generation diagnostic imaging systems and workflow optimization."
          />
           <ProjectListItem 
            title="AI Identity Resolution" 
            role="Developer" 
            year="2019"
            description="AI based identity resolution product that identified customers across different datasets using proprietary algorithms."
          />
           <ProjectListItem 
            title="Gamified Inhaler" 
            role="Prototyper" 
            year="2018"
            description="Smart inhaler prototype with biosensors rewarding correct technique via on-screen feedback."
          />
          <div className="border-t border-border" />
        </div>
      </div>
    </div>
  );
}
