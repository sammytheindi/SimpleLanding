import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO, isWithinInterval, startOfMonth, endOfMonth, addMonths, subMonths, isSameMonth } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DailyHealthData, Goal } from '../../data/healthData';

interface CalendarProps {
  data: DailyHealthData[];
  goals: Goal[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ data, goals, selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-center font-mono text-xs text-muted-foreground opacity-50">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 relative flex-1 content-start">
        {calendarDays.map((day, i) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const entry = data.find(d => d.date === dayStr);
          const isSelected = dayStr === selectedDate;
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          // Find active goal for this day
          const activeGoal = goals.find(g => 
            dayStr >= g.startDate && dayStr <= g.endDate
          );

          // Check goal completion (simple logic: >50% activities done)
          const isGoalMet = entry?.goalActivitiesCompleted 
            ? entry.goalActivitiesCompleted.filter(Boolean).length / entry.goalActivitiesCompleted.length >= 0.5
            : false;

          return (
            <motion.button
              key={dayStr}
              onClick={() => entry && onSelectDate(dayStr)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!entry}
              className={`
                relative aspect-square rounded-lg flex flex-col items-center justify-between p-1 text-xs font-mono transition-all
                ${!isCurrentMonth ? 'opacity-30' : ''}
                ${!entry ? 'opacity-20 cursor-default' : 'cursor-pointer hover:bg-muted/30'}
                ${isSelected ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background' : 'bg-background/50 border border-border'}
              `}
            >
              {/* Goal Bar (Top) */}
              {activeGoal && (
                <div 
                  className="absolute top-1.5 left-1.5 right-1.5 h-1.5 z-10 rounded-full opacity-80"
                  style={{ backgroundColor: activeGoal.color }}
                />
              )}

              {/* Day Number */}
              <span className={`relative z-20 mt-3 ${isSelected ? 'font-bold' : ''}`}>{format(day, 'd')}</span>

              {/* Daily Tracked Indicators (Bottom) */}
              {entry && (
                <div className="flex gap-1 mb-1">
                   {/* Goal Met Indicator (Checkmark or similar) */}
                   {isGoalMet && (
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 ring-1 ring-background" title="Goal Met" />
                   )}
                   
                   {/* Activity Bars */}
                   <div className="flex gap-0.5 h-1.5 items-end">
                      {entry.calories.total > 0 && <div className="w-1.5 h-full bg-orange-400 rounded-sm" title="Nutrition" />}
                      {entry.sleep.hours > 0 && <div className="w-1.5 h-full bg-blue-400 rounded-sm" title="Sleep" />}
                      {entry.workout && entry.workout.type !== 'Rest' && <div className="w-1.5 h-full bg-red-500 rounded-sm" title="Workout" />}
                      {entry.supplements.some(s => s.taken) && <div className="w-1.5 h-full bg-purple-400 rounded-sm" title="Supplements" />}
                   </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-4 justify-center">
            {goals.map(goal => (
            <div key={goal.id} className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <span className="w-3 h-1 rounded-full" style={{ backgroundColor: goal.color }} />
                {goal.title}
            </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center text-[10px] font-mono text-muted-foreground border-t border-border pt-2">
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/>Goal Met</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-orange-400"/>Nutrition</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-blue-400"/>Sleep</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"/>Workout</div>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-purple-400"/>Supplements</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
