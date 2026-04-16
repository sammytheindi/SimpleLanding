import React, { useState, useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Label
} from 'recharts';
import type { DailyHealthData } from '../../data/healthData';

interface CorrelationsChartProps {
  data: DailyHealthData[];
}

const METRICS = [
  { id: 'weight', label: 'Weight (lbs)', color: '#3b82f6' },
  { id: 'bodyFatPercentage', label: 'Body Fat %', color: '#10b981' },
  { id: 'calories.total', label: 'Calories', color: '#f59e0b' },
  { id: 'sleep.hours', label: 'Sleep (hrs)', color: '#8b5cf6' },
  { id: 'vo2Max', label: 'VO2 Max', color: '#ec4899' },
  { id: 'restingHeartRate', label: 'RHR (bpm)', color: '#ef4444' },
];

const CorrelationsChart: React.FC<CorrelationsChartProps> = ({ data }) => {
  const [xMetric, setXMetric] = useState<string>('calories.total');
  const [yMetric, setYMetric] = useState<string>('weight');

  // Helper to get value from nested path
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => o?.[i], obj);
  };

  const processedData = useMemo(() => {
    const points = data
      .map(d => ({
        x: getValue(d, xMetric),
        y: getValue(d, yMetric),
        date: d.date
      }))
      .filter(p => typeof p.x === 'number' && typeof p.y === 'number');

    if (points.length < 2) return { points: [], trendline: [], r2: 0, equation: '' };

    // Linear Regression Calculation
    const n = points.length;
    const sumX = points.reduce((a, b) => a + b.x, 0);
    const sumY = points.reduce((a, b) => a + b.y, 0);
    const sumXY = points.reduce((a, b) => a + b.x * b.y, 0);
    const sumXX = points.reduce((a, b) => a + b.x * b.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // R-squared calculation
    const meanY = sumY / n;
    const ssTot = points.reduce((a, b) => a + Math.pow(b.y - meanY, 2), 0);
    const ssRes = points.reduce((a, b) => a + Math.pow(b.y - (slope * b.x + intercept), 2), 0);
    const r2 = 1 - (ssRes / ssTot);

    // Generate trendline points (min and max X)
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));

    const trendline = [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ];

    return {
      points,
      trendline,
      r2: r2.toFixed(3),
      equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(1)}`,
      interpretation: `Every 1 additional unit of ${METRICS.find(m => m.id === xMetric)?.label} is associated with a ${Math.abs(slope).toFixed(2)} ${slope >= 0 ? 'increase' : 'decrease'} in ${METRICS.find(m => m.id === yMetric)?.label}.`
    };
  }, [data, xMetric, yMetric]);

  const xLabel = METRICS.find(m => m.id === xMetric)?.label;
  const yLabel = METRICS.find(m => m.id === yMetric)?.label;

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="font-display text-xl">Correlations & Analysis</h3>
        
        <div className="flex items-center gap-2">
          <select 
            value={xMetric} 
            onChange={(e) => setXMetric(e.target.value)}
            className="bg-background border border-border rounded-md px-2 py-1 text-xs font-mono"
          >
            {METRICS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <span className="text-muted-foreground text-xs font-mono">vs</span>
          <select 
            value={yMetric} 
            onChange={(e) => setYMetric(e.target.value)}
            className="bg-background border border-border rounded-md px-2 py-1 text-xs font-mono"
          >
            {METRICS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div className="h-[600px] w-full min-h-[600px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="x" 
              type="number" 
              name={xLabel} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={['auto', 'auto']}
            >
              <Label value={xLabel} offset={0} position="bottom" fontSize={12} fill="hsl(var(--muted-foreground))" />
            </XAxis>
            <YAxis 
              dataKey="y" 
              type="number" 
              name={yLabel} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={['auto', 'auto']}
            >
               <Label value={yLabel} angle={-90} position="left" fontSize={12} fill="hsl(var(--muted-foreground))" />
            </YAxis>
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border p-2 rounded-lg shadow-lg text-xs font-mono">
                      <p className="mb-1 text-muted-foreground">{data.date}</p>
                      <p>{xLabel}: {Number(data.x).toFixed(1)}</p>
                      <p>{yLabel}: {Number(data.y).toFixed(1)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Data Points" data={processedData.points} fill="hsl(var(--primary))" fillOpacity={0.6} />
            <Line 
              dataKey="y" 
              data={processedData.trendline} 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2} 
              dot={false} 
              activeDot={false}
              name="Linear Fit"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            <span>Best Fit: {processedData.equation}</span>
          </div>
          <div>
            R² = {processedData.r2}
          </div>
        </div>
        <div className="text-center italic opacity-80">
          {processedData.interpretation}
        </div>
      </div>
    </div>
  );
};

export default CorrelationsChart;
