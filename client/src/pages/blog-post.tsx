import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { BLOG_POSTS } from "./blog";
import NotFound from "./not-found";
import Navbar from "@/components/Navbar";
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = BLOG_POSTS.find(p => p.slug === params?.slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* We hide the Navbar on scroll or keep it? Let's keep it consistent but maybe simpler on blog post */}
      <Navbar />

      <article className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        
        <header className="mb-16 text-center">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Writing
            </a>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-primary mb-6"
          >
            <span className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-full">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-8"
          >
            {post.title}
          </motion.h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg md:prose-xl mx-auto 
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-bold
            prose-blockquote:border-l-primary prose-blockquote:text-foreground prose-blockquote:not-italic prose-blockquote:font-display
            prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-li:marker:text-primary
            prose-img:rounded-lg prose-img:border prose-img:border-border"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkMath]} 
            rehypePlugins={[rehypeKatex]}
          >
            {post.content}
          </ReactMarkdown>
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
