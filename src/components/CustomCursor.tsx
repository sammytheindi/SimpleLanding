import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for light cursor requirement
      const lightSection = target.closest('[data-cursor="light"]');
      setIsLight(!!lightSection);
      
      // Check if the element or any parent is clickable
      const isClickable = (el: HTMLElement | null): boolean => {
        if (!el || el === document.body) return false;
        
        const tagName = el.tagName;
        const classList = el.classList;
        
        if (
          tagName === 'A' || 
          tagName === 'BUTTON' || 
          tagName === 'INPUT' || 
          tagName === 'TEXTAREA' || 
          tagName === 'SELECT' ||
          tagName === 'LABEL' ||
          classList.contains('cursor-pointer')
        ) {
          return true;
        }
        
        return isClickable(el.parentElement);
      };

      setIsHovering(isClickable(target));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-300 ${isLight ? 'border-white' : 'border-primary'}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? (isLight ? "white" : "hsl(var(--primary))") : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-colors duration-300 ${isLight ? 'bg-yellow-300' : 'bg-yellow-600'}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12
        }}
      />
    </>
  );
};

export const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-repeat w-full h-full animate-noise" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);
