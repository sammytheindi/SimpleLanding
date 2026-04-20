import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import Navbar from "./Navbar";

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
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="container mx-auto px-6 pt-40 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h1 className="font-display text-6xl md:text-8xl mb-8">
                Get in <br /> <span className="text-primary">Touch</span>
              </h1>
              <p className="font-mono text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
                I'm always open to discussing ML systems, data platforms, LLM
                applications, and hard technical problems.
              </p>

              <div className="space-y-8 font-mono text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:samyak.shahfamily@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      samyak.shahfamily@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Location
                    </p>
                    <p>Dallas, TX (CST)</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-16 border-t border-border">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  Socials
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    className="p-4 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="bg-muted/20 p-8 md:p-12 border border-border h-fit">
            <FadeIn delay={0.2}>
              <h2 className="font-display text-2xl mb-6">Send a message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="access_key"
                  value="8bc9d2f9-252e-478e-86c4-93ef0b4aaf4d"
                />
                <input
                  type="hidden"
                  name="subject"
                  value="New message from samyak.me contact form"
                />
                <input type="hidden" name="from_name" value="samyak.me" />
                <input type="hidden" name="redirect" value="false" />
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    className="w-full bg-background border border-border p-4 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Tell me about your project..."
                  />
                </div>
                {status === "success" && (
                  <p className="font-mono text-xs text-green-600 uppercase tracking-widest">
                    Message sent — I'll be in touch soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="font-mono text-xs text-red-500 uppercase tracking-widest">
                    Something went wrong. Try emailing me directly.
                  </p>
                )}
                <button
                  disabled={status === "sending"}
                  className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-widest py-4 hover:bg-primary transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
