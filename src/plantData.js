// Static plant data for Garden Planner 101
export const plants = [
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    emoji: '🍅',
    plantDates: {
      zone4: 'May 15',
      zone5: 'May 1', 
      zone6: 'Apr 15',
      zone7: 'Apr 1'
    },
    difficulty: 'medium'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    emoji: '🥬',
    plantDates: {
      zone4: 'Apr 15',
      zone5: 'Apr 1',
      zone6: 'Mar 15',
      zone7: 'Mar 1'
    },
    difficulty: 'easy'
  },
  {
    id: 'carrots',
    name: 'Carrots',
    emoji: '🥕',
    plantDates: {
      zone4: 'May 1',
      zone5: 'Apr 15',
      zone6: 'Apr 1',
      zone7: 'Mar 15'
    },
    difficulty: 'easy'
  },
  {
    id: 'peppers',
    name: 'Peppers',
    emoji: '🌶️',
    plantDates: {
      zone4: 'May 20',
      zone5: 'May 10',
      zone6: 'Apr 25',
      zone7: 'Apr 10'
    },
    difficulty: 'medium'
  },
  {
    id: 'beans',
    name: 'Green Beans',
    emoji: '🫛',
    plantDates: {
      zone4: 'May 10',
      zone5: 'Apr 25',
      zone6: 'Apr 10',
      zone7: 'Mar 25'
    },
    difficulty: 'easy'
  },
  {
    id: 'corn',
    name: 'Sweet Corn',
    emoji: '🌽',
    plantDates: {
      zone4: 'May 15',
      zone5: 'May 1',
      zone6: 'Apr 15',
      zone7: 'Apr 1'
    },
    difficulty: 'medium'
  },
  {
    id: 'cucumbers',
    name: 'Cucumbers',
    emoji: '🥒',
    plantDates: {
      zone4: 'May 20',
      zone5: 'May 10',
      zone6: 'Apr 25',
      zone7: 'Apr 10'
    },
    difficulty: 'easy'
  },
  {
    id: 'garlic',
    name: 'Garlic',
    emoji: '🧄',
    plantDates: {
      zone4: 'Oct 15',
      zone5: 'Oct 20',
      zone6: 'Nov 1',
      zone7: 'Nov 15'
    },
    difficulty: 'easy'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    emoji: '🥬',
    plantDates: {
      zone4: 'Apr 10',
      zone5: 'Mar 25',
      zone6: 'Mar 10',
      zone7: 'Feb 25'
    },
    difficulty: 'easy'
  },
  {
    id: 'radishes',
    name: 'Radishes',
    emoji: '🌰',
    plantDates: {
      zone4: 'Apr 1',
      zone5: 'Mar 20',
      zone6: 'Mar 5',
      zone7: 'Feb 20'
    },
    difficulty: 'easy'
  }
];

export const zones = [
  { id: 'zone4', name: 'Zone 4 (Cold)', description: '-30°F to -20°F' },
  { id: 'zone5', name: 'Zone 5 (Cool)', description: '-20°F to -10°F' },
  { id: 'zone6', name: 'Zone 6 (Moderate)', description: '-10°F to 0°F' },
  { id: 'zone7', name: 'Zone 7 (Mild)', description: '0°F to 10°F' }
];
