import React from 'react';
import { BookOpen } from 'lucide-react';
import type { DailyHealthData } from '../../data/healthData';

const DailyJournal = ({ data }: { data: DailyHealthData }) => {
  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <h3 className="font-display text-xl mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Daily Journal
      </h3>

      <div className="min-h-[80px] text-sm font-mono text-muted-foreground whitespace-pre-wrap">
        {data.journalEntry || "No entry for this day."}
      </div>
    </div>
  );
};

export default DailyJournal;
