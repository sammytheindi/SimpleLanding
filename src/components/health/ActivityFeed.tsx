import React from 'react';
import { Dumbbell, Timer, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DailyHealthData } from '../../data/healthData';

const ActivityFeed = ({ data }: { data: DailyHealthData }) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <h3 className="font-display text-xl mb-6 flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-primary" />
        Activity
      </h3>

      <div className="space-y-4">
        {data.workout && data.workout.type !== 'Rest' ? (
          <div className="relative pl-4 border-l-2 border-primary/30">
            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-lg leading-none">{data.workout.type}</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded">
                  {data.workout.type}
                </span>
                {data.workout.details && (
                  <button 
                    onClick={() => toggleExpand(0)}
                    className="text-xs text-muted-foreground hover:text-foreground underline decoration-dotted"
                  >
                    {expandedIndex === 0 ? 'Hide' : 'Details'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Detailed View */}
            {expandedIndex === 0 && data.workout.details && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-border/50 text-sm"
              >
                {data.workout.details.strength && (
                  <div className="space-y-1">
                    {data.workout.details.strength.map((ex, idx) => (
                      <div key={idx} className="text-xs font-mono text-muted-foreground">
                        {ex}
                      </div>
                    ))}
                  </div>
                )}

                {data.workout.details.cardio && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span>{data.workout.details.cardio.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance</span>
                      <span>{data.workout.details.cardio.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span>{data.workout.details.cardio.time}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground font-mono text-sm">
            Rest Day
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
