import Papa from 'papaparse';
import type { DailyHealthData, Goal } from '../data/healthData';

// Helper to convert Google Drive share links to direct download/view links
const transformDriveImage = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  // Handle "drive.google.com/file/d/ID/view" format
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

// Helper to parse "Exercise:SetsxReps@Weight" strings
const parseStrengthDetails = (detailsStr: string | undefined) => {
  if (!detailsStr) return undefined;
  return detailsStr.split(',').map(s => s.trim()).filter(Boolean);
};

// Helper to parse "Type:Distance:Time" strings
const parseCardioDetails = (detailsStr: string | undefined) => {
  if (!detailsStr) return undefined;
  const parts = detailsStr.split(':');
  if (parts.length >= 3) {
    return {
      type: parts[0],
      distance: parts[1],
      time: parts[2]
    };
  }
  return undefined;
};

// Helper to parse "Time:Description" strings
const parseMeal = (time: string | undefined, description: string | undefined) => {
  if (!description) return undefined;
  return {
    time: time || '',
    description: description
  };
};

export const fetchHealthData = async (
  healthSheetUrl: string, 
  goalsSheetUrl: string
): Promise<{ healthData: DailyHealthData[], goals: Goal[] }> => {
  
  try {
    // 1. Fetch CSVs
    const [healthResponse, goalsResponse] = await Promise.all([
      fetch(healthSheetUrl),
      fetch(goalsSheetUrl)
    ]);

    const healthText = await healthResponse.text();
    const goalsText = await goalsResponse.text();

    // 2. Parse Health Data
    const healthResult = Papa.parse(healthText, { header: true, skipEmptyLines: true });
    const healthData: DailyHealthData[] = healthResult.data.map((row: any) => ({
      date: row['Date'],
      weight: parseFloat(row['Weight (lbs)']) || 0,
      bodyFatPercentage: parseFloat(row['Body Fat (%)']) || 0,
      calories: {
        total: parseInt(row['Total Calories']) || 0,
        protein: parseInt(row['Protein (g)']) || 0,
        carbs: parseInt(row['Carbs (g)']) || 0,
        fats: parseInt(row['Fats (g)']) || 0,
      },
      water: parseInt(row['Water (ml)']) || 0,
      sleep: {
        hours: parseFloat(row['Sleep Hours']) || 0,
        quality: row['Sleep Quality'] || 'Fair',
      },
      vo2Max: parseFloat(row['VO2 Max']) || 0,
      restingHeartRate: parseInt(row['Resting HR']) || 0,
      workout: {
        type: row['Workout Type'] || 'Rest',
        details: {
          strength: parseStrengthDetails(row['Strength Details (Exercise:SetsxReps@Weight)']),
          cardio: parseCardioDetails(row['Cardio Details (Type:Distance:Time)'])
        }
      },
      meals: {
        breakfast: parseMeal(row['Breakfast Time'], row['Breakfast Description']),
        lunch: parseMeal(row['Lunch Time'], row['Lunch Description']),
        dinner: parseMeal(row['Dinner Time'], row['Dinner Description']),
        snacks: row['Snack Details (Time:Description)'] ? [parseMeal(row['Snack Details (Time:Description)'].split(':')[0], row['Snack Details (Time:Description)'].split(':')[1])] : undefined
      },
      supplements: row['Supplements'] ? row['Supplements'].split(',').map((s: string) => s.trim()) : [],
      journalEntry: row['Journal Entry'],
      progressPic: transformDriveImage(row['Progress Pic URL'])
    }));

    // 3. Parse Goals Data
    const goalsResult = Papa.parse(goalsText, { header: true, skipEmptyLines: true });
    const goals: Goal[] = goalsResult.data.map((row: any) => ({
      id: row['ID'],
      title: row['Title'],
      status: row['Status'] as 'active' | 'completed' | 'upcoming',
      startDate: row['Start Date'],
      endDate: row['End Date'],
      description: row['Description'],
      dailyHabits: row['Daily Habits (Habit1|Habit2|Habit3)'] ? row['Daily Habits (Habit1|Habit2|Habit3)'].split('|').map((s: string) => s.trim()) : [],
      // These will be calculated dynamically from healthData in the component
      startWeight: 0, 
      currentWeight: 0,
      targetWeight: 0,
      startBodyFat: 0,
      currentBodyFat: 0,
      targetBodyFat: 0,
      milestones: []
    }));

    return { healthData, goals };

  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return { healthData: [], goals: [] };
  }
};
