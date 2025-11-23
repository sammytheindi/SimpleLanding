import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";

interface ArticleCardProps {
  post: {
    slug: string;
    data: {
      title: string;
      date: string;
      readTime: string;
      category: string;
      excerpt: string;
    };
  };
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <a href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group border-t border-border py-12 cursor-pointer block"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
              <Tag className="w-3 h-3" />
              {post.data.category}
            </div>
            <div className="text-xs font-mono text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {post.data.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" /> {post.data.readTime}
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors leading-tight">
              {post.data.title}
            </h2>
            <p className="font-mono text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {post.data.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
              Read Article <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </motion.article>
    </a>
  );
}
