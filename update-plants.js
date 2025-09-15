// Script to add missing sun exposure data to remaining plants
const fs = require('fs');

// Read the current plant data
let content = fs.readFileSync('src/plantData.js', 'utf8');

// Define sun exposure data for the remaining plants
const sunExposureData = {
  'cucumbers': {
    sunExposure: 'full-sun',
    sunRequirement: '6-8 hours direct sunlight',
    idealDirection: 'South or West facing',
    type: 'vegetable'
  },
  'garlic': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours direct sunlight',
    idealDirection: 'South facing',
    type: 'vegetable'
  },
  'spinach': {
    sunExposure: 'partial-shade',
    sunRequirement: '4-6 hours, prefers cool conditions',
    idealDirection: 'East facing or morning sun',
    type: 'vegetable'
  },
  'radishes': {
    sunExposure: 'partial-shade',
    sunRequirement: '4-6 hours, tolerates some shade',
    idealDirection: 'East or North facing',
    type: 'vegetable'
  },
  'broccoli': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours, prefers cooler weather',
    idealDirection: 'South or East facing',
    type: 'vegetable'
  },
  'cabbage': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours, cool season crop',
    idealDirection: 'South or East facing',
    type: 'vegetable'
  },
  'zucchini': {
    sunExposure: 'full-sun',
    sunRequirement: '6-8 hours direct sunlight',
    idealDirection: 'South or West facing',
    type: 'vegetable'
  },
  'onions': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours direct sunlight',
    idealDirection: 'South facing',
    type: 'vegetable'
  },
  'basil': {
    sunExposure: 'full-sun',
    sunRequirement: '6-8 hours, loves heat',
    idealDirection: 'South facing, warm location',
    type: 'vegetable'
  },
  'kale': {
    sunExposure: 'partial-shade',
    sunRequirement: '4-6 hours, cool season crop',
    idealDirection: 'East facing or morning sun',
    type: 'vegetable'
  },
  'beets': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours direct sunlight',
    idealDirection: 'South or West facing',
    type: 'vegetable'
  },
  'peas': {
    sunExposure: 'full-sun',
    sunRequirement: '6+ hours, cool season crop',
    idealDirection: 'South facing, can tolerate light shade',
    type: 'vegetable'
  },
  'squash': {
    sunExposure: 'full-sun',
    sunRequirement: '6-8 hours direct sunlight',
    idealDirection: 'South or West facing',
    type: 'vegetable'
  },
  'cilantro': {
    sunExposure: 'partial-shade',
    sunRequirement: '4-6 hours, bolts in too much heat',
    idealDirection: 'East facing or afternoon shade',
    type: 'vegetable'
  }
};

// Function to add sun exposure data to a plant entry
for (const [plantId, data] of Object.entries(sunExposureData)) {
  const regex = new RegExp(`(\\s+id: '${plantId}',[\\s\\S]*?difficulty: '[^']*')`, 'g');
  content = content.replace(regex, (match) => {
    return match + `,
    sunExposure: '${data.sunExposure}',
    sunRequirement: '${data.sunRequirement}',
    idealDirection: '${data.idealDirection}',
    type: '${data.type}'`;
  });
}

// Write the updated content back to the file
fs.writeFileSync('src/plantData.js', content);
console.log('Successfully updated plant data with sun exposure information!');
