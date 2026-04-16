import React from 'react';
import { Moon, Star } from 'lucide-react';
import type { DailyHealthData } from '../../data/healthData';

const SleepTracker = ({ data }: { data: DailyHealthData }) => {
  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <h3 className="font-display text-xl mb-6 flex items-center gap-2">
        <Moon className="w-5 h-5 text-primary" />
        Sleep
      </h3>

      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="font-display text-4xl">{data.sleep.hours.toFixed(1)}</span>
          <span className="font-mono text-sm text-muted-foreground ml-1">hrs</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Quality</span>
          <span className={`font-medium ${
            data.sleep.quality === 'Excellent' ? 'text-green-500' :
            data.sleep.quality === 'Good' ? 'text-blue-500' :
            data.sleep.quality === 'Fair' ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {data.sleep.quality}
          </span>
        </div>
      </div>

      {/* Sleep Bar Visualization */}
      <div className="h-2 bg-background rounded-full overflow-hidden flex">
        <div 
          className="h-full bg-indigo-500" 
          style={{ width: `${(data.sleep.hours / 10) * 100}%` }} 
        />
      </div>
      <div className="flex justify-between mt-1 font-mono text-[10px] text-muted-foreground">
        <span>0h</span>
        <span>Target: 8h</span>
        <span>10h+</span>
      </div>
    </div>
  );
};

export default SleepTracker;
