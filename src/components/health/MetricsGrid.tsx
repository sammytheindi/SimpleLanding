import React from 'react';
import { Activity, Scale, Droplets, Heart } from 'lucide-react';
import type { DailyHealthData } from '../../data/healthData';

const MetricCard = ({ label, value, unit, icon: Icon, trend }: { label: string, value: string | number, unit: string, icon: any, trend?: string }) => (
  <div className="bg-muted/10 border border-border p-4 rounded-xl flex flex-col justify-between hover:bg-muted/20 transition-colors">
    <div className="flex items-start justify-between mb-2">
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <Icon className="w-4 h-4 text-primary opacity-70" />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-3xl">{value}</span>
      <span className="font-mono text-xs text-muted-foreground">{unit}</span>
    </div>
    {trend && (
      <div className="mt-2 text-[10px] font-mono text-muted-foreground">
        {trend}
      </div>
    )}
  </div>
);

const MetricsGrid = ({ data }: { data: DailyHealthData }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard 
        label="Weight" 
        value={data.weight} 
        unit="lbs" 
        icon={Scale}
      />
      <MetricCard 
        label="Body Fat" 
        value={data.bodyFatPercentage} 
        unit="%" 
        icon={Activity}
      />
      <MetricCard 
        label="VO2 Max" 
        value={data.vo2Max?.toFixed(1) || '-'} 
        unit="ml/kg" 
        icon={Heart}
      />
      <MetricCard 
        label="Water" 
        value={(data.calories.water / 1000).toFixed(1)} 
        unit="L" 
        icon={Droplets}
      />
    </div>
  );
};

export default MetricsGrid;
