import { useState } from 'react';

export default function ImageWithPlaceholder({ src, alt, ...props }: any) {
  // Handle Astro optimized images (which might be passed as objects)
  const imageSrc = typeof src === 'object' && src !== null && 'src' in src ? src.src : src;

  return (
    <div className="relative overflow-hidden rounded-lg my-8 border border-border/50 bg-muted/10 group">
      <img
        src={imageSrc}
        alt={alt}
        {...props}
        className="w-full h-auto"
      />
    </div>
  );
}
