import { motion } from "framer-motion";
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

type EntryProps = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  description?: string;
  note?: string;
  tag?: string;
  stars?: string;
};

const ExperienceItem = ({ role, company, startDate, endDate, duration, description, note, tag }: EntryProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{
      backgroundColor: "hsl(var(--muted) / 0.3)",
      paddingLeft: "1rem",
    }}
    transition={{ duration: 0.3 }}
    className="group flex flex-col md:flex-row md:items-start border-t border-border py-10 px-4 -mx-4 transition-all duration-300 cursor-pointer relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-primary/5 z-0"
      initial={{ x: "-100%" }}
      whileHover={{ x: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
    />

    {/* Date column */}
    <div className="md:w-48 shrink-0 mb-3 md:mb-0 pt-1 z-10 relative">
      <p className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors leading-relaxed">
        {startDate} – {endDate}
      </p>
      <p className="font-mono text-xs text-muted-foreground/60">{duration}</p>
    </div>

    {/* Content */}
    <div className="flex-1 z-10 relative">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300 leading-tight">
          {role}
        </h3>
        {tag && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest border border-border text-muted-foreground px-2 py-1 mt-1">
            {tag}
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">{company}</p>
      {description && (
        <p className="font-mono text-sm text-muted-foreground max-w-2xl leading-relaxed mb-3">{description}</p>
      )}
      {note && (
        <p className="font-mono text-xs text-muted-foreground/70 max-w-2xl leading-relaxed border-l-2 border-primary/30 pl-3 italic">
          {note}
        </p>
      )}
    </div>
  </motion.div>
);

const ProjectItem = ({ role, company, startDate, endDate, duration, description, note, stars }: EntryProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{
      backgroundColor: "hsl(var(--muted) / 0.2)",
      paddingLeft: "1rem",
    }}
    transition={{ duration: 0.3 }}
    className="group flex flex-col md:flex-row md:items-start border-t border-border/50 py-8 px-4 -mx-4 transition-all duration-300 cursor-pointer relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-muted/10 z-0"
      initial={{ x: "-100%" }}
      whileHover={{ x: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
    />

    {/* Date column */}
    <div className="md:w-48 shrink-0 mb-3 md:mb-0 pt-1 z-10 relative">
      <p className="font-mono text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors leading-relaxed">
        {startDate}{endDate !== startDate ? ` – ${endDate}` : ""}
      </p>
      <p className="font-mono text-xs text-muted-foreground/40">{duration}</p>
    </div>

    {/* Content */}
    <div className="flex-1 z-10 relative">
      <div className="flex items-center gap-3 flex-wrap mb-1">
        <h3 className="font-display text-xl md:text-2xl text-foreground/80 group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300 leading-tight">
          {company}
        </h3>
        {stars && (
          <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-0.5">
            ★ {stars}
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest mb-3">{role}</p>
      {description && (
        <p className="font-mono text-sm text-muted-foreground/70 max-w-2xl leading-relaxed">{description}</p>
      )}
      {note && (
        <p className="font-mono text-xs text-muted-foreground/50 max-w-2xl leading-relaxed border-l-2 border-border pl-3 italic mt-2">
          {note}
        </p>
      )}
    </div>
  </motion.div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-end gap-4 mt-20 mb-4"
  >
    <h2 className="font-display text-4xl md:text-5xl">{label}</h2>
    <div className="h-px bg-primary flex-1 mb-2 opacity-30" />
  </motion.div>
);

export default function Career() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="container mx-auto px-6 pt-40 pb-24">
        <header className="mb-24">
          <FadeIn>
            <h1 className="font-display text-6xl md:text-8xl mb-8">
              Career & <br /> <span className="text-primary">Experience</span>
            </h1>
            <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              A timeline of roles, companies, and projects that shaped my career in ML and engineering.
            </p>
          </FadeIn>
        </header>

        <div className="flex flex-col">
          <SectionLabel label="Experience" />

          <ExperienceItem
            role="Co-Founder / Principal ML Engineer"
            company="EpiWatch"
            startDate="Aug 2017"
            endDate="Present"
            duration="8 yrs 8 mos"
            description="Built a production wearable ML platform for real-time seizure detection. Novel algorithm with 10x improvement over prior art, FDA-cleared. Led on-device inference, distributed Spark training, probabilistic modeling, ClickHouse data platform, and full MLOps stack."
            note="Co-founded EpiWatch as a Johns Hopkins spinout during graduate research and continued development alongside roles at Johns Hopkins and Orba, serving as the primary technical owner for ML, product, and regulatory work."
          />
          <ExperienceItem
            role="Co-Founder / Applied ML Engineer"
            company="Orba"
            startDate="Aug 2022"
            endDate="Jun 2024"
            duration="1 yr 10 mos"
            description="Production LLM platform for customer-facing automation — RAG pipelines, fine-tuning, NeMo Guardrails, real-time voice AI with sub-200ms latency."
          />
          <ExperienceItem
            role="Senior Software Engineer"
            company="JHU BCI Lab · Johns Hopkins University"
            startDate="Jun 2019"
            endDate="Jun 2024"
            duration="5 yrs"
            description="Production real-time inference pipeline (sub-70ms latency), HMM + deep learning for neural decoding, Bayesian/MCMC probabilistic modeling, LLM-based BCI with long-term memory."
          />
          <ExperienceItem
            role="Systems Engineer"
            company="Philips Healthcare"
            startDate="Jun 2016"
            endDate="Sep 2016"
            duration="4 mos"
            tag="Internship"
            description="Next-generation diagnostic imaging systems and workflow optimization."
          />
          <ExperienceItem
            role="Research & Development"
            company="InCube Labs"
            startDate="Aug 2015"
            endDate="Sep 2015"
            duration="2 mos"
            tag="Internship"
            description="Worked as part of Rani Therapeutics on an ingestible capsule to replace injectables during animal testing. Designed and fabricated capsule components using SolidWorks and an in-house laser-cutter. Tested injection system mechanics and performed sensitive bio-assays of serum from animal testing to evaluate delivery efficacy."
          />
          <ExperienceItem
            role="Research & Development"
            company="InCube Labs"
            startDate="Jul 2014"
            endDate="Sep 2014"
            duration="3 mos"
            tag="Internship"
            description="Reviewed viability of animal models for stimulating natural incretin secretion. Performed ELISA assays and operated HPLC, PCR, and related sensitive equipment."
          />

          <SectionLabel label="Projects" />

          <ProjectItem
            role="Lead Engineer"
            company="Strides"
            startDate="Jun 2025"
            endDate="Jan 2026"
            duration="8 mos"
            description="Advanced wearable integration for gait analysis and rehabilitation monitoring."
          />
          <ProjectItem
            role="Open Source Contributor"
            company="JobFunnel"
            startDate="Aug 2025"
            endDate="Aug 2025"
            duration="1 mo"
            description="Community-driven project for scraping job applications. Provided novel method for bypassing CAPTCHA restrictions."
            stars="5.3k"
          />
          <ProjectItem
            role="Developer"
            company="AI Identity Resolution"
            startDate="Apr 2022"
            endDate="Aug 2022"
            duration="5 mos"
            description="AI-based identity resolution product that identified customers across different datasets using proprietary algorithms."
          />
          <ProjectItem
            role="Prototyper"
            company="Gamified Inhaler"
            startDate="Jan 2019"
            endDate="Apr 2019"
            duration="4 mos"
            description="Smart inhaler prototype with biosensors rewarding correct technique via on-screen feedback."
          />
          <ProjectItem
            role="Technical Lead"
            company="SensUs Biosensor · University of Glasgow"
            startDate="Jan 2017"
            endDate="Aug 2017"
            duration="8 mos"
            description="SAW wave biosensor for point-of-care NT-ProBNP detection using MEMS microfabrication and integrated circuits with a phase-locked loop. Developed as part of the international SensUs competition."
          />

          <div className="border-t border-border mt-4" />
        </div>
      </div>
    </div>
  );
}
