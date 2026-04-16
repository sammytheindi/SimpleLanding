import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, ErrorBar, Scatter
} from 'recharts';
import { format, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval } from 'date-fns';
import type { DailyHealthData } from '../../data/healthData';

interface LongitudinalChartsProps {
  data: DailyHealthData[];
}

const METRICS_GROUP_1 = [
  { id: 'weight', label: 'Weight', unit: 'lbs', color: '#3b82f6' },
  { id: 'bodyFatPercentage', label: 'Body Fat', unit: '%', color: '#10b981' },
  { id: 'calories.total', label: 'Calories', unit: 'kcal', color: '#f59e0b' },
];

const METRICS_GROUP_2 = [
  { id: 'sleep.hours', label: 'Sleep', unit: 'hrs', color: '#8b5cf6' },
  { id: 'vo2Max', label: 'VO2 Max', unit: 'ml/kg/min', color: '#ec4899' },
];

const ALL_METRICS = [...METRICS_GROUP_1, ...METRICS_GROUP_2];

type ViewMode = 'daily' | 'weekly' | 'monthly';

const LongitudinalCharts: React.FC<LongitudinalChartsProps> = ({ data }) => {
  const [activeMetrics, setActiveMetrics] = useState<string[]>(ALL_METRICS.map(m => m.id));
  const [viewMode, setViewMode] = useState<ViewMode>('daily');

  const toggleMetric = (metricId: string) => {
    setActiveMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(m => m !== metricId)
        : [...prev, metricId]
    );
  };

  // Helper to get value from nested path
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => o?.[i], obj);
  };

  const processedData = useMemo(() => {
    if (viewMode === 'daily') {
      // Show last 7 days
      return data.slice(-7).map(d => ({
        date: d.date,
        ...ALL_METRICS.reduce((acc, m) => ({ 
          ...acc, 
          [m.id]: parseFloat((getValue(d, m.id) as number).toFixed(1))
        }), {})
      }));
    }

    // Aggregation Logic
    const groups: Record<string, DailyHealthData[]> = {};
    
    data.forEach(d => {
      const date = new Date(d.date);
      const key = viewMode === 'weekly' 
        ? format(startOfWeek(date), 'yyyy-MM-dd')
        : format(startOfMonth(date), 'yyyy-MM');
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    });

    return Object.entries(groups).map(([key, group]) => {
      const entry: any = { date: key };
      
      ALL_METRICS.forEach(m => {
        const values = group.map(d => getValue(d, m.id)).filter(v => typeof v === 'number');
        if (values.length > 0) {
          const mean = values.reduce((a, b) => a + b, 0) / values.length;
          const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
          const stdDev = Math.sqrt(variance);
          
          entry[m.id] = parseFloat(mean.toFixed(1));
          entry[`${m.id}Error`] = [parseFloat((mean - stdDev).toFixed(1)), parseFloat((mean + stdDev).toFixed(1))];
        }
      });
      
      return entry;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  }, [data, viewMode]);

  const renderChart = (metrics: typeof METRICS_GROUP_1, height: number = 300, showXAxis: boolean = true, hasSecondRightAxis: boolean = false) => (
    <div style={{ height }} className="w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={processedData} 
          syncId="longitudinal-sync"
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          {showXAxis && (
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickFormatter={(val) => {
                if (viewMode === 'monthly') return format(new Date(val), 'MMM yyyy');
                if (viewMode === 'weekly') return `W${format(new Date(val), 'w')}`;
                return val.slice(5);
              }}
            />
          )}
          
          {/* Left Axis Slot (Always 1) */}
          <YAxis 
            yAxisId={metrics[0].id}
            orientation="left"
            stroke={activeMetrics.includes(metrics[0].id) ? metrics[0].color : "transparent"}
            fontSize={12}
            width={60}
            domain={['auto', 'auto']}
            tick={activeMetrics.includes(metrics[0].id)}
            tickFormatter={(val) => val.toFixed(1)}
            axisLine={activeMetrics.includes(metrics[0].id)}
            label={activeMetrics.includes(metrics[0].id) ? { value: metrics[0].unit, angle: -90, position: 'insideLeft', fill: metrics[0].color, fontSize: 10 } : undefined}
          />

          {/* Right Axis Slot 1 */}
          {metrics[1] && (
            <YAxis 
              yAxisId={metrics[1].id}
              orientation="right"
              stroke={activeMetrics.includes(metrics[1].id) ? metrics[1].color : "transparent"}
              fontSize={12}
              width={60}
              domain={['auto', 'auto']}
              tick={activeMetrics.includes(metrics[1].id)}
              tickFormatter={(val) => val.toFixed(1)}
              axisLine={activeMetrics.includes(metrics[1].id)}
              label={activeMetrics.includes(metrics[1].id) ? { value: metrics[1].unit, angle: 90, position: 'insideRight', fill: metrics[1].color, fontSize: 10 } : undefined}
            />
          )}

          {/* Right Axis Slot 2 (Only Top chart has 3rd metric) */}
          {metrics[2] ? (
            <YAxis 
              yAxisId={metrics[2].id}
              orientation="right"
              stroke={activeMetrics.includes(metrics[2].id) ? metrics[2].color : "transparent"}
              fontSize={12}
              width={60}
              domain={['auto', 'auto']}
              tick={activeMetrics.includes(metrics[2].id)}
              tickFormatter={(val) => val.toFixed(1)}
              axisLine={activeMetrics.includes(metrics[2].id)}
              label={activeMetrics.includes(metrics[2].id) ? { value: metrics[2].unit, angle: 90, position: 'insideRight', fill: metrics[2].color, fontSize: 10 } : undefined}
            />
          ) : (
            // Reserve space for 3rd axis if this chart doesn't have one, but the other does
            hasSecondRightAxis && (
               <YAxis yAxisId="dummy-right-2" orientation="right" width={60} stroke="transparent" tick={false} axisLine={false} />
            )
          )}

          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
            itemStyle={{ fontSize: '12px' }}
            labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '0.25rem', fontWeight: 'bold' }}
            labelFormatter={(label) => {
               if (viewMode === 'monthly') return format(new Date(label), 'MMMM yyyy');
               if (viewMode === 'weekly') return `Week of ${label}`;
               return format(new Date(label), 'EEE, MMM d, yyyy');
            }}
          />
          <Legend />

          {metrics.map(metric => {
            if (!activeMetrics.includes(metric.id)) return null;
            return (
              <React.Fragment key={metric.id}>
                <Line
                  yAxisId={metric.id}
                  type="monotone"
                  dataKey={metric.id}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={viewMode !== 'daily'}
                  activeDot={{ r: 6 }}
                  name={metric.label}
                >
                  {viewMode !== 'daily' && (
                    <ErrorBar dataKey={`${metric.id}Error`} width={4} strokeWidth={2} stroke={metric.color} direction="y" />
                  )}
                </Line>
              </React.Fragment>
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl">Longitudinal Trends</h3>
          <div className="flex gap-2 bg-muted/20 p-1 rounded-lg w-fit">
            {(['daily', 'weekly', 'monthly'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-xs font-mono capitalize transition-all ${
                  viewMode === mode 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        
        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2 max-w-md justify-end">
          {ALL_METRICS.map(metric => (
            <button
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                activeMetrics.includes(metric.id)
                  ? 'bg-background text-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/50'
              }`}
              style={{
                borderColor: activeMetrics.includes(metric.id) ? metric.color : undefined
              }}
            >
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: metric.color }}
              />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Top Chart: Weight, BF, Calories */}
        <div>
           <h4 className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Composition & Nutrition</h4>
           {renderChart(METRICS_GROUP_1, 300, false, true)}
        </div>

        {/* Bottom Chart: Sleep, VO2 Max */}
        <div>
           <h4 className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Recovery & Performance</h4>
           {renderChart(METRICS_GROUP_2, 250, true, true)}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
        {viewMode === 'daily' 
          ? "* Showing last 7 days. Switch views for aggregated trends."
          : "* Error bars represent standard deviation."}
      </p>
    </div>
  );
};

export default LongitudinalCharts;
