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
              Senior ML Engineer &amp; Data Scientist
            </p>

            <div className="flex flex-wrap gap-6 font-mono text-sm text-muted-foreground">
               <a href="mailto:hello@samyak.shah" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> hello@samyak.shah
              </a>
              <a href="https://linkedin.com/in/samyak-shah-68410561/" target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://samyakshah.me" target="_blank" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Globe className="w-4 h-4" /> samyakshah.me
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Grapevine, TX
              </span>
            </div>
          </motion.div>

          {/* Download Button — top right */}
          <motion.a
            href="/Samyak_Shah_CV.pdf"
            download
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-0 right-0 flex items-center gap-3 font-mono text-base px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-background transition-colors"
          >
            <Download className="w-5 h-5" /> Download PDF
          </motion.a>

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
                  role="Co-Founder, Principal ML Engineer"
                  company="EpiWatch"
                  period="Aug 2017 – Present"
                  location="Dallas, TX"
                >
                  <li>Designed novel real-time seizure detection algorithm using consumer wearable sensors — 10x improvement over prior art — FDA-cleared, validated in large-scale clinical trial.</li>
                  <li>Designed patient-adaptive focal seizure detection using probabilistic modeling, latent-variable methods, and adaptive deep learning — secured $300K NIH STTR grant.</li>
                  <li>510(k) technical lead — SRS, SDS, Design Controls, Risk/FMEA, SDLC, QMS — completed 60% faster than expected at under 50% of budget.</li>
                  <li>Designed deployment strategy for per-patient adaptive system — code-promotion architecture for reduced release risk and auditability under FDA constraints.</li>
                  <li>Built monitoring and incident-response workflows — input-data drift detection and seizure-to-detection latency via replay tests — caught hardware-induced regression pre-release.</li>
                  <li>Built distributed Spark-based training and simulation framework — parallelized jobs reduced experiment turnaround from 1 month to 10 days.</li>
                  <li>Implemented reproducible ML workflows with DVC, MLflow, DAGsHub — 200+ tracked experiments, comparison time reduced from days to hours.</li>
                  <li>Evaluated classical ML models — isolation forest, XGBoost, SVM, PCA, clustering — with ROC/AUC, F1, and leave-one-user-out cross-validation.</li>
                  <li>On-device Apple Watch algorithm optimization — CPU/memory constraints for 10+ hour battery life on older devices.</li>
                  <li>2-year, 6-hospital clinical trial technical lead — Python/SQL reporting with automated compliance and trial blinding.</li>
                  <li>Statistical analysis plan (with biostatistician) — binomial proportion methods for paired sensitivity analysis.</li>
                  <li>ClickHouse time-series architecture — over 10x query improvement on ~1 TB proof-of-concept.</li>
                  <li>Full-stack: iOS/WatchOS (Swift, Obj-C), backend (Java, Spring Boot), cloud (AWS CDK).</li>
                  <li>CI/CD: Fastlane + Bitbucket Actions — 40% release overhead reduction.</li>
                  <li>Selected for MedTech Innovator accelerator (4% acceptance rate).</li>
                </ExperienceItem>

                <ExperienceItem
                  role="Co-Founder, Applied ML Engineer"
                  company="Orba"
                  period="08/2022 – 06/2024"
                  location="Dallas, TX"
                >
                  <li>Built production LLM/agentic workflows — RAG with citation support, context-aware retrieval over CRM and internal data — ~30% relevance improvement, ~50% hallucination reduction.</li>
                  <li>Implemented NVIDIA NeMo Guardrails for safety and formatting policy enforcement.</li>
                  <li>GPT-3.5 fine-tuning + LangChain prompt-chaining — 15% task completion improvement.</li>
                  <li>Built self-hosted real-time AI voice system — sub-200ms latency — Whisper transcription + retrieval + generation.</li>
                  <li>Backend/infra: FastAPI, AWS, PostgreSQL, MongoDB — distributed web-scraping system.</li>
                  <li>#2 Product of the Day on Product Hunt; accepted into Jason Calacanis’ Founder University; featured in industry newsletters.</li>
                </ExperienceItem>

                <ExperienceItem
                  role="Senior Software Engineer"
                  company="Johns Hopkins University"
                  period="06/2019 – 06/2024"
                  location="Baltimore, MD"
                >
                  <li>Implemented Agile methodology for the research group — 30% efficiency improvement.</li>
                  <li>Built real-time brain-signal decoding models for cursor control — HMM + deep learning — Kedro-based pipeline.</li>
                  <li>Applied Bayesian and probabilistic methods including MCMC — posterior analysis for parameter uncertainty and model robustness across datasets.</li>
                  <li>Led development of LLM-based BCI application with long-term memory — collaboration with JHU APL — presented at SfN 2023.</li>
                  <li>Built production modeling + real-time inference pipeline — sub-70ms latency — Python/C++ — scalable across multiple decoding pipelines.</li>
                  <li>Built React/Next.js interfaces for neural decoding and ALS patient communication.</li>
                  <li>Built real-time WebRTC audio visualization for voice synthesis — C++ + Next.js — primary interface for speech synthesis training.</li>
                  <li>8 peer-reviewed papers, 256 citations, SfN 2023.</li>
                </ExperienceItem>

                <ExperienceItem
                  role="Systems Engineer"
                  company="Philips Healthcare"
                  period="Jun 2016 – Sep 2016"
                  location="Internship"
                >
                  <li>Next-generation diagnostic imaging systems and workflow optimization.</li>
                </ExperienceItem>

                <ExperienceItem
                  role="Research & Development"
                  company="InCube Labs"
                  period="Aug 2015 – Sep 2015"
                  location="Internship"
                >
                  <li>Worked as part of Rani Therapeutics on an ingestible capsule to replace injectables during animal testing.</li>
                  <li>Designed and fabricated capsule components using SolidWorks and an in-house laser-cutter.</li>
                  <li>Tested injection system mechanics and performed sensitive bio-assays of serum from animal testing to evaluate delivery efficacy.</li>
                </ExperienceItem>

                <ExperienceItem
                  role="Research & Development"
                  company="InCube Labs"
                  period="Jul 2014 – Sep 2014"
                  location="Internship"
                >
                  <li>Reviewed viability of animal models for stimulating natural incretin secretion.</li>
                  <li>Performed ELISA assays and operated HPLC, PCR, and related sensitive equipment.</li>
                </ExperienceItem>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-24">
              <SectionHeader title="Projects" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Strides",
                    stars: "Lead Engineer",
                    desc: "Advanced wearable integration for gait analysis and rehabilitation monitoring."
                  },
                  {
                    title: "JobFunnel",
                    stars: "★ 5.3k stars",
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
                  },
                  {
                    title: "SensUs Biosensor · University of Glasgow",
                    stars: "Technical Lead",
                    desc: "SAW wave biosensor for point-of-care NT-ProBNP detection using MEMS microfabrication and integrated circuits with a phase-locked loop."
                  },
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

             {/* Patents, Talks & Papers */}
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
                      <p className="text-sm text-muted-foreground">Inventor (royalty-bearing), patent published — novel method of seizure detection and alerting using biosensor data.</p>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Neurally Augmented Virtual Interface</h4>
                      <p className="text-sm text-muted-foreground">Co-inventor, patent pending — novel control interface for paralyzed individuals and patients with ALS.</p>
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
                      <p className="text-sm text-muted-foreground">Spoke to 200+ attendees at Society for Neuroscience on using LLMs for Brain Computer Interface (BCI) applications.</p>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Founder University 2023</h4>
                      <p className="text-sm text-muted-foreground">Spoke to 150 Founder University participants about Orba and automating inbound marketing with LLMs.</p>
                    </motion.li>
                  </ul>
                </div>
              </div>
              <div className="mt-12">
                <SectionHeader title="Papers" />
                {(() => {
                  const papers = [
                    {
                      title: "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
                      authors: "M Angrick, S Luo, Q Rabbani, DN Candrea, S Shah, GW Milsap, et al.",
                      venue: "Scientific Reports",
                      year: "2024",
                    },
                    {
                      title: "Stable decoding from a speech BCI enables control for an individual with ALS without recalibration for 3 months",
                      authors: "S Luo, M Angrick, C Coogan, DN Candrea, K Wyse‐Sookoo, S Shah, et al.",
                      venue: "Advanced Science",
                      year: "2023",
                    },
                    {
                      title: "A click-based electrocorticographic brain-computer interface enables long-term high-performance switch scan spelling",
                      authors: "DN Candrea, S Shah, S Luo, M Angrick, Q Rabbani, C Coogan, et al.",
                      venue: "Communications Medicine",
                      year: "2024",
                    },
                    {
                      title: "Prospective multicenter study of continuous tonic-clonic seizure monitoring on Apple Watch in epilepsy monitoring units and ambulatory environments",
                      authors: "S Shah, EG Gutierrez, JL Hopp, J Wheless, A Gil-Nagel, GL Krauss, et al.",
                      venue: "Epilepsy & Behavior",
                      year: "2024",
                    },
                    {
                      title: "Seizure triggers identified postictally using a smart watch reporting system",
                      authors: "A Ge, EG Gutierrez, SW Lee, S Shah, Y Carmenate, M Collard, NE Crone, et al.",
                      venue: "Epilepsy & Behavior",
                      year: "2022",
                    },
                    {
                      title: "Iterative alignment discovery of speech-associated neural activity",
                      authors: "Q Rabbani, S Shah, G Milsap, M Fifer, H Hermansky, N Crone",
                      venue: "Journal of Neural Engineering",
                      year: "2024",
                    },
                    {
                      title: "On-chip magnetoresistive sensors for detection and localization of paramagnetic particles",
                      authors: "S Shah, H Heidari",
                      venue: "2017 IEEE SENSORS",
                      year: "2017",
                    },
                    {
                      title: "Development of a real-time smartwatch algorithm for the detection of generalized tonic-clonic seizures",
                      authors: "S Shah",
                      venue: "Johns Hopkins University (Thesis)",
                      year: "2019",
                    },
                  ];
                  return (
                    <ul className="space-y-6">
                      {papers.map((p, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * (i + 1) }}
                          className="group"
                        >
                          <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{p.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {p.authors.split("S Shah").map((part, j, arr) => (
                              <span key={j}>{part}{j < arr.length - 1 && <strong className="text-foreground">S Shah</strong>}</span>
                            ))}
                            {" — "}<em>{p.venue}</em>, {p.year}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  );
                })()}
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
              <div className="space-y-6">
                {[
                  {
                    category: "Modeling & Data Science",
                    skills: ["Python", "scikit-learn", "PyTorch", "TensorFlow", "XGBoost", "Random Forest", "Isolation Forest", "SVM", "PCA", "Clustering", "HMMs", "MCMC", "Bayesian Modeling", "Adaptive Deep Learning", "Statistical Analysis", "Experimental Design"]
                  },
                  {
                    category: "ML Systems & MLOps",
                    skills: ["MLflow", "DVC", "DAGsHub", "Spark", "ClickHouse", "Model Monitoring", "Drift Detection", "Experiment Tracking", "Real-Time Inference", "MLOps Pipelines"]
                  },
                  {
                    category: "LLM / Applied AI",
                    skills: ["RAG", "Prompt Orchestration", "Fine-Tuning", "LangChain", "NeMo Guardrails", "Context-Aware Retrieval", "Citation-Grounded Generation", "Whisper"]
                  },
                  {
                    category: "Backend / Cloud",
                    skills: ["AWS", "AWS CDK", "FastAPI", "Flask", "Spring Boot", "PostgreSQL", "MongoDB", "REST APIs", "CI/CD", "Bitbucket Actions", "Fastlane"]
                  },
                  {
                    category: "Frontend / Product",
                    skills: ["TypeScript", "Next.js", "React", "Swift", "Xcode", "Objective-C"]
                  }
                ].map(({ category, skills }) => (
                  <div key={category}>
                    <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{category}</p>
                    <motion.div
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.03 } }
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      {skills.map(skill => (
                        <SkillTag
                          key={skill}
                          name={skill}
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        />
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
