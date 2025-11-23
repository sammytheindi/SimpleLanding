import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import Navbar from "./Navbar";

interface BlogPostProps {
  post: {
    data: {
      title: string;
      date: string;
      readTime: string;
      category: string;
    };
  };
  children: React.ReactNode;
}

export default function BlogPost({ post, children }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      <Navbar />

      <article className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        
        <header className="mb-16 text-center">
          <a href="/blog" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Writing
          </a>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-primary mb-6"
          >
            <span className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-full">
              <Tag className="w-3 h-3" /> {post.data.category}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3 h-3" /> {post.data.date}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.data.readTime}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-8"
          >
            {post.data.title}
          </motion.h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose max-w-none mx-auto font-mono
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-semibold
            prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-medium
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-bold
            prose-blockquote:border-l-primary prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:font-display
            prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-li:marker:text-primary prose-li:text-muted-foreground
            prose-img:rounded-lg prose-img:border prose-img:border-border"
        >
          {children}
        </motion.div>

        <div className="mt-24 pt-12 border-t border-border flex justify-between items-center">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Thanks for reading.
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}
