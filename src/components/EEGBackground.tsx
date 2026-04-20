import { useEffect, useRef } from 'react';

interface EEGBackgroundProps {
  lineCount?: number;
  color?: string;
  opacity?: number;
}

export default function EEGBackground({ 
  lineCount = 6, 
  color = "hsl(var(--primary))", 
  opacity = 0.2 
}: EEGBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Configuration
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      speed: 0.001 + Math.random() * 0.002,
      amplitude: 20 + Math.random() * 10, // Reduced amplitude
      offset: Math.random() * 100,
      frequency: 0.005 + Math.random() * 0.01, 
      secondaryFreq: 0.02 + Math.random() * 0.02, 
      phase: Math.random() * Math.PI * 2,
      yBase: (i + 1) * (canvas.height / (lineCount + 1))
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-distribute lines on resize
      lines.forEach((line, i) => {
        line.yBase = (canvas.height / (lineCount + 1)) * (i + 0.5) + (canvas.height * 0.1); 
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Resolve color to RGB format for Canvas compatibility
      // We do this inside the loop to handle theme changes (light/dark mode) dynamically
      // Ideally this should be optimized, but for this simple case it's acceptable
      // or we can move it out and listen for theme changes.
      // For now, let's try a safer approximation using the variable if possible, 
      // or just standard DOM resolution which is robust.
      
      let r = 0, g = 0, b = 0;
      
      // Quick hack to get the color from the variable if it matches the expected format
      // This avoids DOM thrashing every frame
      const primaryVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (primaryVar) {
        // primaryVar is likely "220 100% 20%" (HSL)
        // We can use HSL string directly in Canvas if formatted correctly
        // Modern browsers support "hsl(220 100% 20% / alpha)"
        // But let's use the legacy format "hsla(220, 100%, 20%, alpha)" for maximum safety if we parse it
        // Actually, let's just use the computed style of a dummy element ONCE or periodically
      }

      // Better approach: Use the color prop directly if it's not a variable, 
      // or construct the HSL string properly.
      
      // Let's assume the color is "hsl(var(--primary))"
      // We can construct "hsl(from hsl(var(--primary)) h s l / alpha)" in CSS Color 5, but that's too new.
      
      // Let's use a robust fallback:
      // We will use the variable value directly.
      const variableName = color.match(/var\(([^)]+)\)/)?.[1];
      let colorString = color;
      if (variableName) {
         const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
         // value is "220 100% 20%"
         // Construct "hsl(220 100% 20% / alpha)"
         colorString = `hsl(${value}`;
      } else {
         colorString = color.replace(')', ''); // Remove closing parenthesis if it's a function
         if (colorString.startsWith('hsl')) colorString = colorString; // It's already start of hsl
         else colorString = `color(${colorString}`; // Fallback
      }

      // Actually, the simplest way that works in all modern browsers (including Chrome/Safari/Firefox)
      // for Tailwind v4 variables (space separated) is:
      // `hsl(var(--primary) / 0.5)`
      
      // If that failed, it might be because the variable wasn't resolved in the context.
      // Let's try to explicitly read the variable.
      
      const rawColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      // rawColor is "220 100% 20%"
      
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 300
      );
      
      // Use standard CSS Color 4 syntax which works with space-separated values
      gradient.addColorStop(0, `hsl(${rawColor} / ${opacity * 4})`);
      gradient.addColorStop(1, `hsl(${rawColor} / ${opacity})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;

      lines.forEach((line) => {
        ctx.beginPath();
        
        const step = 8;
        const points: { x: number; y: number }[] = [];

        for (let x = 0; x <= canvas.width; x += step) {
          const baseWave = Math.sin(x * line.frequency + time * line.speed + line.offset);
          const detailWave = Math.sin(x * line.secondaryFreq - time * (line.speed * 2)) * 0.5;
          let y = line.yBase + (baseWave + detailWave) * line.amplitude;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 200;
          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            y += Math.sin(x * 0.05 + time * 0.1) * 10 * force;
            y += (mouseRef.current.y - y) * 0.02 * force;
          }

          points.push({ x, y });
        }

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const mx = (points[i].x + points[i + 1].x) / 2;
          const my = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
        }
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };



    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineCount, color, opacity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
