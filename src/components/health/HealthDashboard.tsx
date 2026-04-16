import React from 'react';
import type { DailyHealthData } from '../../data/healthData';
import MetricsGrid from './MetricsGrid';
import NutritionPanel from './NutritionPanel';
import ActivityFeed from './ActivityFeed';
import SleepTracker from './SleepTracker';
import SupplementsList from './SupplementsList';
import DailyJournal from './DailyJournal';

interface HealthDashboardProps {
  data: DailyHealthData;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Row: Key Metrics */}
      <div className="md:col-span-2">
        <MetricsGrid data={data} />
      </div>

      {/* Middle Row: Nutrition & Activity */}
      <div className="space-y-6">
        <NutritionPanel data={data} />
        <SupplementsList data={data} />
      </div>
      
      <div className="space-y-6">
        <ActivityFeed data={data} />
        <SleepTracker data={data} />
        <DailyJournal data={data} />
      </div>
    </div>
  );
};

export default HealthDashboard;
