import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DailyHealthData } from '../../data/healthData';

const NutritionPanel = ({ data }: { data: DailyHealthData }) => {
  const macros = [
    { name: 'Protein', value: data.calories.protein, color: '#3b82f6' }, // blue-500
    { name: 'Carbs', value: data.calories.carbs, color: '#10b981' },   // emerald-500
    { name: 'Fats', value: data.calories.fats, color: '#f59e0b' },    // amber-500
  ];

  return (
    <div className="bg-muted/10 border border-border rounded-xl p-6">
      <h3 className="font-display text-xl mb-6 flex items-center justify-between">
        Nutrition
        <span className="font-mono text-sm text-muted-foreground">{data.calories.total} kcal</span>
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Macro Chart */}
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macros}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {macros.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[10px] text-muted-foreground">MACROS</span>
          </div>
        </div>

        {/* Macro Legend */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {macros.map((macro) => (
            <div key={macro.name} className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: macro.color }} />
                {macro.name}
              </span>
              <span className="font-display text-xl">{macro.value}g</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meals List */}
      <div className="mt-8 space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Meals Log</h4>
        <div className="space-y-4">
        {/* Breakfast */}
        {data.meals.breakfast && (
          <div className="p-3 bg-muted/5 rounded-lg border border-border/50">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Breakfast</span>
              <span className="text-xs font-mono text-muted-foreground">{data.meals.breakfast.time}</span>
            </div>
            <p className="text-sm">{data.meals.breakfast.description}</p>
          </div>
        )}

        {/* Lunch */}
        {data.meals.lunch && (
          <div className="p-3 bg-muted/5 rounded-lg border border-border/50">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Lunch</span>
              <span className="text-xs font-mono text-muted-foreground">{data.meals.lunch.time}</span>
            </div>
            <p className="text-sm">{data.meals.lunch.description}</p>
          </div>
        )}

        {/* Dinner */}
        {data.meals.dinner && (
          <div className="p-3 bg-muted/5 rounded-lg border border-border/50">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Dinner</span>
              <span className="text-xs font-mono text-muted-foreground">{data.meals.dinner.time}</span>
            </div>
            <p className="text-sm">{data.meals.dinner.description}</p>
          </div>
        )}

        {/* Snacks */}
        {data.meals.snacks && data.meals.snacks.length > 0 && (
          <div className="p-3 bg-muted/5 rounded-lg border border-border/50">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Snacks</span>
            <ul className="space-y-2">
              {data.meals.snacks.map((snack, i) => (
                <li key={i} className="text-sm">
                  <span className="text-muted-foreground mr-2">{snack.time}</span>
                  {snack.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default NutritionPanel;
