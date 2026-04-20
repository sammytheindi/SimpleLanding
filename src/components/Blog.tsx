import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "./Navbar";
import ArticleCard from "./ArticleCard";

// --- Sample Data Types ---
export type Category = "All" | "Posts" | "Notes" | "Tutorials" | "Deep Dives" | "Challenges";

interface BlogProps {
  posts: any[]; // We'll pass the sorted/formatted posts from Astro
}

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

export default function Blog({ posts }: BlogProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.data.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="container mx-auto px-6 pt-40 pb-24">
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
                onClick={() => { setActiveCategory(cat); window.posthog?.capture("blog_category_filtered", { category: cat }); }}
              />
            ))}
          </motion.div>
        </header>

        <div className="min-h-[400px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => <ArticleCard key={post.slug} post={post} />)
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
