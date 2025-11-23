import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import Navbar from "./Navbar";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h1 className="font-display text-6xl md:text-8xl mb-8">
                Get in <br/> <span className="text-primary">Touch</span>
              </h1>
              <p className="font-mono text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
                I'm always open to discussing new ventures, technical challenges, or just chatting about the future of BCI and AI.
              </p>
              
              <div className="space-y-8 font-mono text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <a href="mailto:samyak.shahfamily@gmail.com" className="hover:text-primary transition-colors">samyak.shahfamily@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                    <p>Baltimore, MD (EST)</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-16 border-t border-border">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Socials</p>
                <div className="flex gap-4">
                  <a href="https://linkedin.com" target="_blank" className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com" target="_blank" className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="bg-muted/20 p-8 md:p-12 border border-border h-fit">
             <FadeIn delay={0.2}>
                <h2 className="font-display text-2xl mb-6">Send a message</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                    <input type="text" className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                    <input type="email" className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea rows={5} className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors" placeholder="Tell me about your project..." />
                  </div>
                  <button className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-widest py-4 hover:bg-primary transition-colors">
                    Send Message
                  </button>
                </form>
             </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
