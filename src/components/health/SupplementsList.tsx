import React from 'react';
import { CheckCircle2, Circle, Pill } from 'lucide-react';
import type { DailyHealthData } from '../../data/healthData';

const SupplementsList = ({ data }: { data: DailyHealthData }) => {
  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <h3 className="font-display text-xl mb-6 flex items-center gap-2">
        <Pill className="w-5 h-5 text-primary" />
        Supplements
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {data.supplements.map((supp, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
            {supp.taken ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground/30" />
            )}
            <span className={`text-sm ${supp.taken ? 'text-foreground' : 'text-muted-foreground line-through opacity-50'}`}>
              {supp.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementsList;
