import React from 'react';
import { ArrowRight, Target } from 'lucide-react';
import type { Goal } from '../../data/healthData';

interface GoalHeaderProps {
  currentGoal?: Goal;
  label?: string;
}

const GoalHeader: React.FC<GoalHeaderProps> = ({ currentGoal, label = "Current Goal" }) => {
  if (!currentGoal) return null;

  return (
    <div className="mb-8 p-6 rounded-xl border border-border bg-muted/10 relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-1 h-full" 
        style={{ backgroundColor: currentGoal.color }} 
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-background border border-border">
              {currentGoal.startDate} — {currentGoal.endDate}
            </span>
          </div>
          <h2 className="font-display text-3xl">{currentGoal.title}</h2>
          <p className="font-mono text-sm text-muted-foreground mt-2 max-w-2xl">
            {currentGoal.description}
          </p>
        </div>

        <a 
          href={`/health/goal/${currentGoal.id}`}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          View Goal Summary
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Target Activities Pills */}
      <div className="flex flex-wrap gap-2 mt-6">
        {currentGoal.targetActivities.map((activity, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/50 border border-border text-xs font-mono">
            <Target className="w-3 h-3 text-primary" />
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalHeader;
