import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Mail, Linkedin, Globe, Plus, Minus, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";

// --- Components ---

const SectionHeader = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-end gap-4 mb-12 border-b border-border pb-4"
  >
    <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
    <div className="h-px bg-primary flex-1 mb-2 opacity-30" />
  </motion.div>
);

const ExperienceItem = ({ 
  role, 
  company, 
  period, 
  location, 
  children 
}: { 
  role: string, 
  company: string, 
  period: string, 
  location: string, 
  children: React.ReactNode 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border-l-2 border-border pl-8 relative pb-12 last:pb-0"
    >
      {/* Timeline Dot */}
      <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${isOpen ? "bg-primary border-primary" : "bg-background border-border group-hover:border-primary"}`} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          <h3 className="font-display text-2xl group-hover:text-primary transition-colors">{role}</h3>
          <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{period}</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          <span>{company}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground font-sans leading-relaxed marker:text-primary">
              {children}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs font-mono uppercase tracking-widest text-primary hover:underline mt-2 flex items-center gap-2"
        >
          <Plus className="w-3 h-3" /> View Details
        </button>
      )}
       {isOpen && (
        <button 
          onClick={() => setIsOpen(false)}
          className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mt-4 flex items-center gap-2"
        >
          <Minus className="w-3 h-3" /> Close
        </button>
      )}
    </motion.div>
  );
};

const EducationItem = ({ degree, school, period, location }: { degree: string, school: string, period: string, location: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5 }}
    className="border border-border p-6 hover:border-primary transition-colors bg-background"
  >
    <h3 className="font-display text-lg mb-1">{degree}</h3>
    <p className="font-mono text-sm text-primary mb-4">{school}</p>
    <div className="flex justify-between font-mono text-xs text-muted-foreground uppercase tracking-widest">
      <span>{period}</span>
      <span>{location}</span>
    </div>
  </motion.div>
);

const SkillTag = ({ name, variants }: { name: string, variants?: any }) => (
  <motion.span 
    variants={variants}
    whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
    className="inline-block px-4 py-2 border border-border text-xs font-mono uppercase tracking-widest cursor-default transition-colors hover:border-primary"
  >
    {name}
  </motion.span>
);

// --- Main Page ---

export default function CV() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-24">
        
        {/* Header */}
        <header className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-6xl md:text-8xl mb-6">
              Samyak <br /> Shah
            </h1>
            <p className="font-mono text-lg md:text-xl text-primary mb-8 uppercase tracking-widest">
              Staff Software Engineer
            </p>
            
            <div className="flex flex-wrap gap-6 font-mono text-sm text-muted-foreground">
               <a href="mailto:samyak.shahfamily@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> samyak.shahfamily@gmail.com
              </a>
              <a href="https://linkedin.com/in/samyak-shah-68410561/" target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://samyakshah.me" target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Globe className="w-4 h-4" /> samyakshah.me
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Baltimore, MD
              </span>
            </div>
          </motion.div>
          
          {/* Abstract Decoration */}
          <div className="absolute -z-10 top-0 right-0 w-64 h-64 border border-border opacity-20 rotate-45 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute -z-10 top-10 right-10 w-64 h-64 border border-primary opacity-10 rotate-12 translate-x-1/3 -translate-y-1/3" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            
            {/* Experience */}
            <section className="mb-24">
              <SectionHeader title="Experience" />
              
              <div className="space-y-8">
                <ExperienceItem 
                  role="Co-Founder & Head of Technology"
                  company="EpiWatch"
                  period="09/2021 – Present"
                  location="Baltimore, MD"
                >
                  <li>Led cross-functional strategy execution, ensuring compliance with FDA regulations, referencing ISO13485/27001 standards. Completed the application 60% faster than expected.</li>
                  <li>Implemented a company-wide software strategy, including requirements, risk analysis (FMEA), V&V testing, and a robust QMS using Greenlight Guru.</li>
                  <li>Led development of a novel seizure detection algorithm with 10x performance improvement over market competitors. Deployed and optimized algorithm on Apple Watch, and secured international patents.</li>
                  <li>Led full-stack development (SpringBoot, PostgreSQL, AWS CDK, XCode, Swift) to deliver production-ready EpiWatch app.</li>
                  <li>Directed development of cybersecurity enhancements, CI/CD pipelines, and automated test protocols.</li>
                  <li>Completed successful 2-year multi-center clinical trial for algorithm efficacy.</li>
                  <li>Secured $300,000 in NIH funding by spearheading efforts to write a federal research grant (STTR) in 2 weeks.</li>
                </ExperienceItem>

                <ExperienceItem 
                  role="Co-Founder & CEO"
                  company="Orba"
                  period="08/2022 – 06/2024"
                  location="Baltimore, MD"
                >
                  <li>Developed company strategy and launched a #2 Product of the Day on Product Hunt. Accepted into Jason Calacanis’ Founder University.</li>
                  <li>Built the company’s core AI-based event-triggered marketing product, leading development of frontend dashboard, AI sales chatbot (NextJS, Typescript), and backend architecture (Python, FastAPI, AWS).</li>
                  <li>Engineered a self-hosted, real-time, AI voice chat system with sub-200ms latency using Whisper and local generative AI models.</li>
                  <li>Designed a custom RAG architecture reducing LLM hallucinations by 50%.</li>
                  <li>Led 25+ sales meetings, driving customer acquisition and revenue growth.</li>
                </ExperienceItem>

                <ExperienceItem 
                  role="Senior Software Engineer"
                  company="Johns Hopkins University"
                  period="06/2019 – 06/2024"
                  location="Baltimore, MD"
                >
                  <li>Implemented Agile methodology for the research group, improving efficiency by 30%.</li>
                  <li>Developed a user-facing web application (NAVI) for ALS patients to enable communication and control through neural decoding (Next.js, TypeScript).</li>
                  <li>Led development of an LLM-based Brain Computer Interface (BCI) application with long-term memory (Python, Next.js, C++).</li>
                  <li>Built a real-time audio-visualization tool for voice synthesis modeling with WebRTC.</li>
                  <li>Developed a production-ready end-to-end modeling pipeline and real-time inference pipeline (sub-70ms latency).</li>
                  <li>Published 8 peer-reviewed articles (64 citations) and presented research at SfN 2023.</li>
                </ExperienceItem>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-24">
              <SectionHeader title="Projects" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "JobFunnel",
                    stars: "2k stars",
                    desc: "Contributor to a community-driven project for scraping job applications. Provided novel method for bypassing CAPTCHA restrictions."
                  },
                  {
                    title: "AI Identity Resolution",
                    stars: "Startup",
                    desc: "Developed and deployed an AI based identity resolution product that identified customers across different datasets using proprietary AI."
                  },
                  {
                    title: "Gamified Inhaler",
                    stars: "Prototype",
                    desc: "Developed a smart inhaler prototype with biosensors rewarding correct technique via on-screen feedback. 3D-printed custom components."
                  }
                ].map((p, i) => (
                  <motion.a 
                    key={p.title}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="block p-6 border border-border bg-muted/10 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-xl">{p.title}</h3>
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </div>
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4 rounded">
                      {p.stars}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </motion.a>
                ))}
              </div>
            </section>

             {/* Patents & Talks */}
             <section className="mb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <SectionHeader title="Patents" />
                  <ul className="space-y-6">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Physiological detection and alerting</h4>
                      <p className="text-sm text-muted-foreground">Patent (pending) for novel method of seizure detection and alerting using biosensor data.</p>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Neurally Augmented Virtual Interface</h4>
                      <p className="text-sm text-muted-foreground">Patent (pending) for a novel control interface for paralyzed individuals and patients with ALS.</p>
                    </motion.li>
                  </ul>
                </div>
                <div>
                  <SectionHeader title="Talks" />
                  <ul className="space-y-6">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Speaker at SfN 2023</h4>
                      <p className="text-sm text-muted-foreground">Spoke to 200 people at Society for Neuroscience conference on using LLMs for Brain Computer Interface (BCI) applications.</p>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Founder University 2023</h4>
                      <p className="text-sm text-muted-foreground">Spoke to 150 founder university participants about Orba, and automating inbound marketing.</p>
                    </motion.li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Content */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Education */}
            <section>
              <SectionHeader title="Education" />
              <div className="space-y-4">
                <EducationItem 
                  degree="MS CS & Data Science"
                  school="Johns Hopkins University"
                  period="2022 – Present"
                  location="Baltimore, MD"
                />
                <EducationItem 
                  degree="MS Biomedical Engineering"
                  school="Johns Hopkins University"
                  period="2017 – 2019"
                  location="Baltimore, MD"
                />
                <EducationItem 
                  degree="BS Biomedical Engineering"
                  school="University of Glasgow"
                  period="2013 – 2017"
                  location="Glasgow, UK"
                />
              </div>
            </section>

            {/* Skills */}
            <section>
              <SectionHeader title="Skills" />
              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="flex flex-wrap gap-2"
              >
                {[
                  "Python", "Pandas", "MATLAB", "Javascript", "TypeScript", "NextJS", "React", "Vue",
                  "AWS", "Azure", "MongoDB", "TensorFlow", "PyTorch", "SciKit Learn", 
                  "Deep Learning", "Swift", "XCode", "LangChain", "Java", "SpringBoot", "C++",
                  "Kedro", "FastAPI", "Flask", "CI/CD", "Cybersecurity", "Gen AI",
                  "Medical Devices", "QMS", "Startups"
                ].map(skill => (
                  <SkillTag 
                    key={skill} 
                    name={skill} 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                  />
                ))}
              </motion.div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
