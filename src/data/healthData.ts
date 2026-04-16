import { subDays, format, addDays, isWithinInterval, parseISO } from 'date-fns';

export interface Goal {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  targetActivities: string[];
  color: string; // Hex color for calendar line
}

export interface DailyHealthData {
  date: string;
  weight: number; // lbs
  bodyFatPercentage: number; // %
  calories: {
    total: number;
    protein: number; // g
    carbs: number; // g
    fats: number; // g
    water: number; // ml
  };
  meals: {
    name: string;
    calories: number;
    time: string;
  }[];
  supplements: {
    name: string;
    taken: boolean;
  }[];
  workout: {
    type: string;
    details?: {
      strength?: string[]; // Array of strings like "Bench Press: 4x5 @ 225lbs"
      cardio?: {
        type: string;
        distance: string;
        time: string;
      };
    };
  };
  sleep: {
    hours: number;
    quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  };
  vo2Max?: number;
  restingHeartRate?: number;
  progressPictureUrl?: string; 
  
  // New Goal Fields
  goalId?: string;
  goalActivitiesCompleted?: boolean[]; // Matches targetActivities index
  journalEntry?: string;
}

export const goals: Goal[] = [
  {
    id: 'cut-2025-q1',
    title: 'Spring Cut',
    startDate: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    description: 'Aggressive fat loss phase targeting 12% body fat while maintaining muscle mass.',
    targetActivities: ['Hit Protein Goal', 'Calorie Deficit', 'Cardio 30m'],
    color: '#ef4444' // red-500
  },
  {
    id: 'maintenance-recovery',
    title: 'Maintenance & Recovery',
    startDate: format(subDays(new Date(), 14), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'), // Current goal
    description: 'Focus on recovery, sleep quality, and maintaining weight after the cut.',
    targetActivities: ['Sleep 8h', 'Mobility Work', 'Maintenance Calories'],
    color: '#3b82f6' // blue-500
  }
];

// Generate last 60 days of mock data
export const generateMockData = (): DailyHealthData[] => {
  const data: DailyHealthData[] = [];
  // Use a fixed date to prevent hydration mismatches between server (build time) and client (runtime)
  const today = new Date('2025-11-24T12:00:00');

  for (let i = 0; i < 60; i++) {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Determine active goal
    const activeGoal = goals.find(g => 
      isWithinInterval(date, { start: parseISO(g.startDate), end: parseISO(g.endDate) })
    );

    // Randomize slightly for realism
    const weight = 175 + Math.random() * 2 - 1; 
    const bf = 15 + Math.random() * 0.5 - 0.25; 
    
    data.push({
      date: dateStr,
      weight: parseFloat(weight.toFixed(1)),
      bodyFatPercentage: parseFloat(bf.toFixed(1)),
      calories: {
        total: Math.floor(2200 + Math.random() * 400),
        protein: Math.floor(160 + Math.random() * 20),
        carbs: Math.floor(200 + Math.random() * 50),
        fats: Math.floor(60 + Math.random() * 15),
        water: Math.floor(2000 + Math.random() * 1000),
      },
      meals: [
        { name: 'Oatmeal & Berries', calories: 450, time: '08:00' },
        { name: 'Chicken Salad', calories: 650, time: '13:00' },
        { name: 'Protein Shake', calories: 150, time: '16:00' },
        { name: 'Salmon & Rice', calories: 750, time: '19:30' },
      ],
      supplements: [
        { name: 'Multivitamin', taken: true },
        { name: 'Omega-3', taken: true },
        { name: 'Creatine', taken: Math.random() > 0.1 }, 
        { name: 'Vitamin D', taken: true },
      ],
      workout: i % 2 === 0 ? {
        type: 'Strength',
        details: {
          strength: [
            'Bench Press: 4x5 @ 225 lbs',
            'Pull Ups: 3x10 @ BW',
            'OHP: 3x8 @ 135 lbs'
          ]
        }
      } : {
        type: 'Cardio',
        details: {
          cardio: {
            type: 'Run',
            distance: '4.5 mi',
            time: '45 min'
          }
        }
      },
      sleep: {
        hours: 6.5 + Math.random() * 2,
        quality: Math.random() > 0.3 ? 'Good' : 'Fair',
      },
      vo2Max: 48 + (60-i)*0.05, 
      restingHeartRate: 55 + Math.random() * 3,
      progressPictureUrl: `https://placehold.co/400x600/1a1a1a/ffffff?text=Progress+${dateStr}`,
      
      // Goal Data
      goalId: activeGoal?.id,
      goalActivitiesCompleted: activeGoal ? activeGoal.targetActivities.map(() => Math.random() > 0.3) : [],
      journalEntry: Math.random() > 0.5 ? "Felt strong today. Sleep was a bit off but energy levels are high." : undefined
    });
  }

  return data.reverse(); // Oldest to newest
};

export const healthData = generateMockData();
