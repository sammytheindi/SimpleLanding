import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isWithinInterval, parseISO, isSameDay } from 'date-fns';
import { healthData as staticHealthData, goals as staticGoals, type DailyHealthData, type Goal } from '../data/healthData';
import { fetchHealthData } from '../utils/googleSheets';
import HealthDashboard from './health/HealthDashboard';
import ProgressGallery from './health/ProgressGallery';
import LongitudinalCharts from './health/LongitudinalCharts';
import CorrelationsChart from './health/CorrelationsChart';
import GoalHeader from './health/GoalHeader';
import Calendar from './health/Calendar';

import Navbar from './Navbar';

// Google Sheets Published CSV URLs
const HEALTH_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTu6HfRGpY7XiSyOm4TWyq9KOiOSOjHJCW9oDDbfCimSMJRiwi-kglhkxY44MS5mm4V-YTEVVScWo8/pub?output=csv';
const GOALS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTkIt3cRC5xeIwbcQ9qko-vhOLv9D6twBXv5e2TczE9Dl6LmyiHh7nBI5MHyGGfu3PHpjKG3Vh55h5/pub?output=csv';

const Health = () => {
  const [healthData, setHealthData] = useState<DailyHealthData[]>(staticHealthData);
  const [goals, setGoals] = useState<Goal[]>(staticGoals);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Use Date object for selected date

  useEffect(() => {
    const loadData = async () => {
      try {
        const { healthData: fetchedData, goals: fetchedGoals } = await fetchHealthData(HEALTH_CSV_URL, GOALS_CSV_URL);
        
        if (fetchedData.length > 0) {
          // Sort by date ascending
          const sortedData = fetchedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setHealthData(sortedData);
          
          // Update goals with calculated metrics if needed
          // Let's map fetched goals to include calculated stats from the latest data point
          const latestData = sortedData[sortedData.length - 1];
          const enrichedGoals = fetchedGoals.map(g => ({
            ...g,
            currentWeight: latestData?.weight || 0,
            currentBodyFat: latestData?.bodyFatPercentage || 0,
            // We can find startWeight by looking up the start date in data
            startWeight: sortedData.find(d => d.date === g.startDate)?.weight || 0,
            startBodyFat: sortedData.find(d => d.date === g.startDate)?.bodyFatPercentage || 0,
          }));
          
          setGoals(enrichedGoals);

          // Set selectedDate to the latest available data point if not already set
          if (!selectedDate || !sortedData.some(d => isSameDay(new Date(d.date), selectedDate))) {
            setSelectedDate(new Date(sortedData[sortedData.length - 1].date));
          }
        }
      } catch (err) {
        console.error("Failed to load Google Sheets data, falling back to static data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get selected day's data
  const selectedData = healthData.find(d => isSameDay(new Date(d.date), selectedDate)) || healthData[healthData.length - 1];
  
  // Find goal for the selected date
  const selectedGoal = goals.find(g => g.id === selectedData?.goalId); // Use optional chaining for selectedData

  // Find the actual current goal (today)
  const today = new Date();
  const activeGoal = goals.find(g => 
    isWithinInterval(today, { start: parseISO(g.startDate), end: parseISO(g.endDate) })
  );

  const pastGoals = goals.filter(g => g.id !== activeGoal?.id);
  const isSelectedGoalActive = selectedGoal?.id === activeGoal?.id;

  const handleDateSelect = (date: string) => {
    setSelectedDate(new Date(date));
  };

  const displayGoal = selectedGoal || activeGoal;
  const displayLabel = selectedGoal 
    ? (isSelectedGoalActive ? "Current Goal" : "Past Goal")
    : "Current Goal";

  // Calculate index for ProgressGallery
  const selectedDateIndex = healthData.findIndex(d => isSameDay(new Date(d.date), selectedDate));
  const safeIndex = selectedDateIndex !== -1 ? selectedDateIndex : healthData.length - 1;

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 px-6">
      <Navbar />
      <div className="container mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-display text-6xl md:text-8xl mb-4">Health & Performance</h1>
          <p className="font-mono text-muted-foreground max-w-2xl">
            A living record of my physical state. Tracking metrics, nutrition, and progress daily.
          </p>

          <div className="mt-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Goals</span>
            <div className="flex flex-wrap gap-3">
              {/* Active Goal */}
              {activeGoal && (
                <a 
                  href={`/health/goal/${activeGoal.id}`}
                  className="px-3 py-1.5 rounded-full border border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all text-xs font-mono flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeGoal.color }} />
                  <span className="text-foreground font-bold">{activeGoal.title}</span>
                  <span className="text-[10px] text-primary/70 ml-1 border-l border-primary/20 pl-2">Current</span>
                </a>
              )}

              {/* Past Goals */}
              {pastGoals.map(goal => (
                <a 
                  key={goal.id}
                  href={`/health/goal/${goal.id}`}
                  className="px-3 py-1.5 rounded-full border border-border bg-muted/5 hover:bg-muted/20 hover:border-primary/50 transition-all text-xs font-mono flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: goal.color }} />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{goal.title}</span>
                  <span className="text-[10px] text-muted-foreground/50 ml-1 border-l border-border pl-2">{goal.startDate} — {goal.endDate}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <GoalHeader currentGoal={displayGoal} label={displayLabel} />

        <div className="space-y-8">
          {/* Top Row: Progress Gallery & Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="h-full">
               <ProgressGallery 
                  data={healthData} 
                  selectedIndex={safeIndex} 
                  onIndexChange={(index) => setSelectedDate(new Date(healthData[index].date))} 
                  goalStartDate={selectedGoal?.startDate}
               />
             </div>
             <div className="h-full">
               <Calendar 
                 data={healthData}
                 goals={goals}
                 selectedDate={selectedData.date}
                 onSelectDate={handleDateSelect}
               />
             </div>
          </div>

          {/* Middle Row: Dashboard */}
          <HealthDashboard data={selectedData} />
          
          {/* Bottom Row: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LongitudinalCharts data={healthData} />
            <CorrelationsChart data={healthData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
