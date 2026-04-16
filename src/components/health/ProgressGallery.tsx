import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import type { DailyHealthData } from '../../data/healthData';

interface ProgressGalleryProps {
  data: DailyHealthData[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  goalStartDate?: string;
}

const ProgressGallery: React.FC<ProgressGalleryProps> = ({ data, selectedIndex, onIndexChange, goalStartDate }) => {
  const currentEntry = data[selectedIndex];
  
  // Find the entry for the goal start date
  const startEntry = goalStartDate 
    ? data.find(d => d.date === goalStartDate) 
    : data[data.length - 1]; // Fallback to oldest

  const handlePrev = () => {
    if (selectedIndex > 0) onIndexChange(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < data.length - 1) onIndexChange(selectedIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl">Progress</h3>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{currentEntry.date}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-1 min-h-0">
        {/* Before Image (Goal Start) */}
        {startEntry && startEntry.date !== currentEntry.date && (
          <div className="relative flex-1 bg-black/5 rounded-lg overflow-hidden group">
            <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded">
              START ({startEntry.date})
            </div>
            <img
              src={startEntry.progressPictureUrl}
              alt={`Start of Goal: ${startEntry.date}`}
              className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}

        {/* After Image (Current Selection) */}
        <div className="relative flex-1 bg-black/5 rounded-lg overflow-hidden group">
          <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-[10px] font-mono px-2 py-1 rounded">
            CURRENT
          </div>
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentEntry.date}
              src={currentEntry.progressPictureUrl}
              alt={`Progress on ${currentEntry.date}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Navigation Overlays */}
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button 
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              disabled={selectedIndex === data.length - 1}
              className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4 text-xs font-mono text-muted-foreground">
        <span>Day {selectedIndex + 1}</span>
        <ArrowRight className="w-3 h-3" />
        <span>{data.length} Days Tracked</span>
      </div>
    </div>
  );
};

export default ProgressGallery;
