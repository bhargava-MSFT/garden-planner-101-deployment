// Location and weather services for Garden Planner
export class LocationService {
  // ZIP code to hardiness zone mapping (simplified for demo)
  static zipToZoneMapping = {
    // Northeast
    '10001': 'zone7', // NYC
    '02101': 'zone6', // Boston
    '19101': 'zone7', // Philadelphia
    '04101': 'zone5', // Portland, ME
    
    // Southeast
    '30301': 'zone8', // Atlanta
    '33101': 'zone10', // Miami
    '28201': 'zone7', // Charlotte
    '23219': 'zone7', // Richmond
    
    // Midwest
    '60601': 'zone6', // Chicago
    '48201': 'zone6', // Detroit
    '55401': 'zone4', // Minneapolis
    '63101': 'zone6', // St. Louis
    
    // Southwest
    '75201': 'zone8', // Dallas
    '78701': 'zone8', // Austin
    '85001': 'zone9', // Phoenix
    '87101': 'zone7', // Albuquerque
    
    // West Coast
    '90210': 'zone10', // Los Angeles
    '94101': 'zone10', // San Francisco
    '97201': 'zone9', // Portland, OR
    '98101': 'zone9', // Seattle
    
    // Mountain States
    '80201': 'zone5', // Denver
    '84101': 'zone6', // Salt Lake City
    '59101': 'zone4', // Billings
    '83001': 'zone4', // Jackson, WY
  };

  // Get hardiness zone from ZIP code
  static async getZoneFromZip(zipCode) {
    // First check our local mapping
    const zone = this.zipToZoneMapping[zipCode];
    if (zone) {
      return { zone, source: 'local' };
    }

    // For unknown ZIP codes, try to use a free geocoding service
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        const lat = parseFloat(data.places[0].latitude);
        
        // Simple latitude-based zone estimation
        let estimatedZone;
        if (lat >= 40) estimatedZone = 'zone4';
        else if (lat >= 35) estimatedZone = 'zone5';
        else if (lat >= 30) estimatedZone = 'zone6';
        else if (lat >= 25) estimatedZone = 'zone7';
        else estimatedZone = 'zone8';
        
        return { 
          zone: estimatedZone, 
          source: 'estimated',
          location: `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`,
          coordinates: { lat, lon: parseFloat(data.places[0].longitude) }
        };
      }
    } catch (error) {
      console.log('ZIP lookup failed, using default zone');
    }
    
    return { zone: 'zone6', source: 'default' };
  }

  // Get current weather for location
  static async getWeatherFromZip(zipCode) {
    try {
      // First get coordinates from ZIP
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      const lat = data.places[0].latitude;
      const lon = data.places[0].longitude;
      
      // Use OpenWeatherMap-like free service (Note: In production, you'd need an API key)
      // For demo, we'll simulate weather data
      const weatherData = this.getSimulatedWeather(lat, lon);
      
      return {
        location: `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`,
        temperature: weatherData.temp,
        condition: weatherData.condition,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
        icon: weatherData.icon,
        lastFrost: weatherData.lastFrost,
        firstFrost: weatherData.firstFrost,
        growingSeason: weatherData.growingSeason
      };
    } catch (error) {
      console.log('Weather lookup failed');
      return null;
    }
  }

  // Simulate weather data (in production, use real weather API)
  static getSimulatedWeather(lat, lon) {
    const now = new Date();
    const month = now.getMonth();
    
    // Simulate temperature based on latitude and season
    let baseTemp = 70 - (Math.abs(lat - 40) * 1.5);
    if (month < 3 || month > 10) baseTemp -= 20; // Winter
    else if (month >= 6 && month <= 8) baseTemp += 10; // Summer
    
    const temp = Math.round(baseTemp + (Math.random() - 0.5) * 20);
    
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    const icons = ['☀️', '⛅', '☁️', '🌦️', '🌤️'];
    const conditionIndex = Math.floor(Math.random() * conditions.length);
    
    // Estimate frost dates based on latitude
    let lastFrost, firstFrost, growingSeason;
    if (lat >= 45) {
      lastFrost = 'May 15';
      firstFrost = 'September 15';
      growingSeason = '120 days';
    } else if (lat >= 40) {
      lastFrost = 'April 15';
      firstFrost = 'October 15';
      growingSeason = '180 days';
    } else if (lat >= 35) {
      lastFrost = 'March 15';
      firstFrost = 'November 15';
      growingSeason = '240 days';
    } else {
      lastFrost = 'February 15';
      firstFrost = 'December 15';
      growingSeason = '300+ days';
    }
    
    return {
      temp,
      condition: conditions[conditionIndex],
      icon: icons[conditionIndex],
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(5 + Math.random() * 15),
      lastFrost,
      firstFrost,
      growingSeason
    };
  }

  // Get city suggestions as user types
  static getCitySuggestions(input) {
    const cities = [
      { name: 'New York, NY', zip: '10001', zone: 'zone7' },
      { name: 'Los Angeles, CA', zip: '90210', zone: 'zone10' },
      { name: 'Chicago, IL', zip: '60601', zone: 'zone6' },
      { name: 'Boston, MA', zip: '02101', zone: 'zone6' },
      { name: 'Miami, FL', zip: '33101', zone: 'zone10' },
      { name: 'Atlanta, GA', zip: '30301', zone: 'zone8' },
      { name: 'Dallas, TX', zip: '75201', zone: 'zone8' },
      { name: 'Denver, CO', zip: '80201', zone: 'zone5' },
      { name: 'Seattle, WA', zip: '98101', zone: 'zone9' },
      { name: 'Portland, OR', zip: '97201', zone: 'zone9' },
      { name: 'Austin, TX', zip: '78701', zone: 'zone8' },
      { name: 'Phoenix, AZ', zip: '85001', zone: 'zone9' },
      { name: 'San Francisco, CA', zip: '94101', zone: 'zone10' },
      { name: 'Minneapolis, MN', zip: '55401', zone: 'zone4' },
      { name: 'Philadelphia, PA', zip: '19101', zone: 'zone7' }
    ];
    
    return cities.filter(city => 
      city.name.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  }
}
