import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
  position: number;
}

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [hoveredHeading, setHoveredHeading] = useState<string | null>(null);

  useEffect(() => {
    // Only detect headers on blog posts
    const isBlogPost = window.location.pathname.includes('/blog/') && 
                       window.location.pathname !== '/blog' && 
                       window.location.pathname !== '/blog/';
    
    if (!isBlogPost) {
      setHeadings([]);
      return;
    }

    // Detect h2 and h3 headers in the document
    const detectHeaders = () => {
      const headers = document.querySelectorAll('article h2, article h3');
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const headingData: Heading[] = Array.from(headers).map((header) => {
        const element = header as HTMLElement;
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        
        // Ensure header has an id for navigation
        if (!element.id) {
          element.id = element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
        }
        
        // Calculate position accounting for navbar offset (100px)
        // This makes the marker appear where the progress bar will be when this header is at the top
        const adjustedPosition = elementTop - 100;
        
        return {
          id: element.id,
          text: element.textContent || '',
          level: parseInt(header.tagName.substring(1)),
          position: documentHeight > 0 ? Math.max(0, adjustedPosition) / documentHeight : 0,
        };
      });
      
      setHeadings(headingData);
    };

    // Detect headers after a short delay to ensure content is rendered
    const timer = setTimeout(detectHeaders, 100);
    
    // Re-detect on window resize
    window.addEventListener('resize', detectHeaders);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', detectHeaders);
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate position accounting for fixed navbar (80px) + progress bar (8px) + small padding
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 h-2 z-50 bg-background/50 backdrop-blur-sm">
      {/* Progress bar */}
      <motion.div 
        className="absolute inset-0 bg-primary/80 origin-left"
        style={{ scaleX }}
      />
      
      {/* Header markers - only visible on blog posts */}
      {headings.map((heading) => (
        <div
          key={heading.id}
          className="absolute cursor-pointer group transition-all"
          style={{ 
            left: `${heading.position * 100}%`,
            top: '50%',
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHoveredHeading(heading.id)}
          onMouseLeave={() => setHoveredHeading(null)}
          onClick={() => scrollToHeading(heading.id)}
        >
          {/* Circular Marker - centered within clickable area */}
          <div 
            className={`rounded-full transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 ${
              heading.level === 2
                ? 'w-4 h-4 bg-background border-2 border-primary/80 shadow-sm' 
                : 'w-[11px] h-[11px] bg-background/90 border border-primary/50'
            } group-hover:bg-primary group-hover:border-primary group-hover:shadow-md`}
          />
          
          {/* Tooltip */}
          {hoveredHeading === heading.id && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 bg-background border border-border px-3 py-2 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none min-w-max"
            >
              <div className="text-xs font-mono text-foreground max-w-xs truncate">
                {heading.text}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                {heading.level === 2 ? 'Section' : 'Subsection'}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

