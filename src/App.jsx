import React, { useState, useEffect } from 'react'
import { plants, zones, sunExposureGuide } from './plantData.js'
import { LocationService } from './locationService.js'

export default function App() {
  const [selectedZone, setSelectedZone] = useState('')
  const [selectedPlants, setSelectedPlants] = useState([])
  const [step, setStep] = useState('zone') // 'zone', 'plants', 'results'
  const [searchTerm, setSearchTerm] = useState('')
  const [sunFilter, setSunFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  
  // Location-based features
  const [locationInput, setLocationInput] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationData, setLocationData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [citySuggestions, setCitySuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handlePlantToggle = (plantId) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    )
  }

  // Location lookup functions
  const handleLocationLookup = async () => {
    if (!locationInput.trim()) return;
    
    setIsLoadingLocation(true);
    try {
      // Check if input is a ZIP code (5 digits)
      const isZipCode = /^\d{5}$/.test(locationInput.trim());
      let zipCode = locationInput.trim();
      
      // If it's a city selection from suggestions, extract ZIP
      const selectedCity = citySuggestions.find(city => 
        city.name === locationInput
      );
      if (selectedCity) {
        zipCode = selectedCity.zip;
      }
      
      if (isZipCode || selectedCity) {
        // Get zone and weather data
        const [zoneResult, weather] = await Promise.all([
          LocationService.getZoneFromZip(zipCode),
          LocationService.getWeatherFromZip(zipCode)
        ]);
        
        setLocationData({
          zipCode,
          zone: zoneResult.zone,
          source: zoneResult.source,
          location: zoneResult.location || weather?.location
        });
        setWeatherData(weather);
        setSelectedZone(zoneResult.zone);
        
        // Auto-advance to plant selection if zone was found
        if (zoneResult.zone) {
          setTimeout(() => setStep('plants'), 1000);
        }
      }
    } catch (error) {
      console.error('Location lookup failed:', error);
    } finally {
      setIsLoadingLocation(false);
      setShowSuggestions(false);
    }
  };

  const handleLocationInputChange = (value) => {
    setLocationInput(value);
    if (value.length > 2) {
      const suggestions = LocationService.getCitySuggestions(value);
      setCitySuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCitySuggestion = (city) => {
    setLocationInput(city.name);
    setShowSuggestions(false);
    // Auto-lookup when city is selected
    setTimeout(() => handleLocationLookup(), 100);
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSun = sunFilter === 'all' || plant.sunExposure === sunFilter
    const matchesType = typeFilter === 'all' || plant.type === typeFilter
    return matchesSearch && matchesSun && matchesType
  })

  const getPlantingInfo = () => {
    return selectedPlants.map(plantId => {
      const plant = plants.find(p => p.id === plantId)
      const plantDate = plant.plantDates[selectedZone]
      return { ...plant, plantDate }
    })
  }

  return (
    <main style={{ 
      maxWidth: 600, 
      margin: '20px auto', 
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#2d5f3f' }}>🌱 Garden Planner 101</h1>
        <p style={{ margin: '10px 0', color: '#666' }}>
          Plan your garden with sun exposure guidance and optimal plant placement
        </p>
      </header>

      {/* Step 1: Zone Selection */}
      {step === 'zone' && (
        <div style={{ textAlign: 'center' }}>
          <h2>Step 1: Find Your Hardiness Zone</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Enter your ZIP code or city to automatically detect your zone, or select manually
          </p>
          
          {/* Location Input Section */}
          <div style={{ marginBottom: '30px', position: 'relative' }}>
            <h3 style={{ color: '#2d5f3f', marginBottom: '15px' }}>🗺️ Auto-Detect Zone</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Enter ZIP code (e.g., 90210) or city (e.g., New York)"
                value={locationInput}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationLookup()}
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                  width: '100%',
                  maxWidth: '300px'
                }}
              />
              <button
                onClick={handleLocationLookup}
                disabled={isLoadingLocation || !locationInput.trim()}
                style={{
                  padding: '12px 20px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isLoadingLocation ? '#ccc' : '#4CAF50',
                  color: 'white',
                  cursor: isLoadingLocation ? 'not-allowed' : 'pointer',
                  minWidth: '100px'
                }}
              >
                {isLoadingLocation ? '🔍...' : '🔍 Find Zone'}
              </button>
            </div>
            
            {/* City Suggestions Dropdown */}
            {showSuggestions && citySuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                border: '2px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                width: '100%',
                maxWidth: '300px'
              }}>
                {citySuggestions.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => selectCitySuggestion(city)}
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      borderBottom: index < citySuggestions.length - 1 ? '1px solid #eee' : 'none',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      ':hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div style={{ fontWeight: 'bold' }}>{city.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Zone {city.zone.replace('zone', '')}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Location Results */}
            {locationData && (
              <div style={{
                backgroundColor: '#f8fff8',
                border: '2px solid #4CAF50',
                borderRadius: '8px',
                padding: '15px',
                margin: '15px 0',
                textAlign: 'left'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#2d5f3f' }}>📍 Location Found!</h4>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Location:</strong> {locationData.location || `ZIP ${locationData.zipCode}`}
                </div>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Hardiness Zone:</strong> {locationData.zone.replace('zone', 'Zone ')}
                  {locationData.source === 'estimated' && ' (estimated)'}
                </div>
                {weatherData && (
                  <div style={{ fontSize: '14px', marginTop: '10px' }}>
                    <strong>Current Weather:</strong> {weatherData.icon} {weatherData.temperature}°F, {weatherData.condition}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Manual Zone Selection */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3 style={{ color: '#2d5f3f', marginBottom: '15px' }}>📋 Or Select Manually</h3>
            <select 
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                width: '100%',
                maxWidth: '300px',
                marginBottom: '20px'
              }}
            >
              <option value="">Select your zone...</option>
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>
                  {zone.name} - {zone.description}
                </option>
              ))}
            </select>
          </div>
          {selectedZone && (
            <div>
              <button 
                onClick={() => setStep('plants')}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Choose Plants →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Plant Selection */}
      {step === 'plants' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Step 2: Choose Your Plants</h2>
            <button 
              onClick={() => setStep('zone')}
              style={{ background: 'none', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              ← Back
            </button>
          </div>
          <input
            type="text"
            placeholder="Search plants... (e.g., tomatoes, easy)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              marginBottom: '15px',
              boxSizing: 'border-box'
            }}
          />
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '2px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="all">All Types</option>
              <option value="vegetable">Vegetables</option>
              <option value="ornamental">Ornamentals</option>
            </select>
            
            <select
              value={sunFilter}
              onChange={(e) => setSunFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '2px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="all">All Sun Exposures</option>
              <option value="full-sun">☀️ Full Sun</option>
              <option value="partial-shade">⛅ Partial Shade</option>
              <option value="shade">🌳 Shade</option>
            </select>
          </div>
          
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Click plants to add them to your garden plan ({filteredPlants.length} of {plants.length} plants shown)
          </p>
          <div className="plant-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '10px',
            marginBottom: '30px',
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #eee',
            borderRadius: '12px',
            backgroundColor: '#fafafa'
          }}>
            {filteredPlants.map(plant => (
              <div 
                key={plant.id}
                className="plant-card"
                onClick={() => handlePlantToggle(plant.id)}
                style={{
                  padding: '16px',
                  border: selectedPlants.includes(plant.id) 
                    ? '3px solid #4CAF50' 
                    : '2px solid #ddd',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: selectedPlants.includes(plant.id) ? '#f8fff8' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div className="plant-emoji" style={{ fontSize: '32px', marginBottom: '8px' }}>{plant.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{plant.name}</div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {plant.difficulty}
                </div>
                {plant.sunExposure && (
                  <div style={{ fontSize: '11px', color: '#2d5f3f', marginBottom: '2px' }}>
                    {plant.sunExposure === 'full-sun' && '☀️ Full Sun'}
                    {plant.sunExposure === 'partial-shade' && '⛅ Partial Shade'}
                    {plant.sunExposure === 'shade' && '🌳 Shade'}
                  </div>
                )}
                {plant.type && (
                  <div style={{ fontSize: '10px', color: '#888', backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                    {plant.type}
                  </div>
                )}
              </div>
            ))}
          </div>
          {selectedPlants.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setStep('results')}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                See My Garden Plan ({selectedPlants.length} plants) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Results */}
      {step === 'results' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>🎉 Your Garden Plan</h2>
            <button 
              onClick={() => setStep('plants')}
              style={{ background: 'none', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              ← Edit
            </button>
          </div>
          
          {/* Weather Widget */}
          {weatherData && (
            <div style={{ 
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '2px solid #2196F3',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>
                🌤️ Current Weather & Growing Conditions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Current Weather</div>
                  <div style={{ fontSize: '24px', marginBottom: '5px' }}>{weatherData.icon} {weatherData.temperature}°F</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>{weatherData.condition}</div>
                </div>
                <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Growing Season</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{weatherData.growingSeason}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Last Frost: {weatherData.lastFrost}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>First Frost: {weatherData.firstFrost}</div>
                </div>
                <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Conditions</div>
                  <div style={{ fontSize: '14px', marginBottom: '3px' }}>💧 Humidity: {weatherData.humidity}%</div>
                  <div style={{ fontSize: '14px' }}>💨 Wind: {weatherData.windSpeed} mph</div>
                </div>
              </div>
              {locationData && (
                <div style={{ marginTop: '15px', fontSize: '14px', color: '#1565c0' }}>
                  📍 <strong>{locationData.location}</strong> - Zone {locationData.zone.replace('zone', '')}
                </div>
              )}
            </div>
          )}
          <div style={{ 
            background: '#f8fff8', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '2px solid #4CAF50',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0' }}>
              {zones.find(z => z.id === selectedZone)?.name} Planting Schedule
            </h3>
            {getPlantingInfo().map(plant => (
              <div key={plant.id} style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                background: 'white',
                borderRadius: '8px',
                marginBottom: '12px',
                border: plant.warning ? '2px solid #ff9800' : '1px solid #e0e0e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', marginRight: '12px' }}>{plant.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{plant.name}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Plant by: <strong>{plant.plantDate}</strong>
                    </div>
                  </div>
                </div>
                
                {plant.sunExposure && (
                  <div style={{ 
                    background: '#f5f5f5', 
                    padding: '12px', 
                    borderRadius: '6px',
                    marginTop: '8px'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#2d5f3f' }}>
                      🌞 Sun Requirements & Placement:
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                      <strong>Sun Exposure:</strong> {plant.sunRequirement}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                      <strong>Best Direction:</strong> {plant.idealDirection}
                    </div>
                    {plant.warning && (
                      <div style={{ 
                        color: '#ff9800', 
                        fontSize: '13px', 
                        marginTop: '8px',
                        fontWeight: 'bold'
                      }}>
                        {plant.warning}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Sun Exposure Guide */}
          <div style={{ 
            background: '#fff8e1', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '2px solid #ffb74d',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#ef6c00' }}>
              🌞 Sun Exposure Guide for Better Garden Planning
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {Object.entries(sunExposureGuide).map(([key, guide]) => (
                <div key={key} style={{
                  background: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                    {key === 'full-sun' && '☀️ Full Sun'}
                    {key === 'partial-shade' && '⛅ Partial Shade'}
                    {key === 'shade' && '🌳 Shade'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    {guide.hours} of sunlight
                  </div>
                  <div style={{ fontSize: '13px', color: '#2d5f3f' }}>
                    <strong>Best directions:</strong> {guide.bestDirections.join(', ')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                    {guide.tips}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              background: '#ffe0b2', 
              borderRadius: '8px',
              fontSize: '14px',
              color: '#ef6c00'
            }}>
              <strong>💡 Pro Tip:</strong> Consider your yard's orientation when planning. South-facing areas get the most sun, 
              while north-facing spots stay cooler. Morning sun (east-facing) is gentler than hot afternoon sun (west-facing).
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={() => {
                setStep('zone')
                setSelectedZone('')
                setSelectedPlants([])
              }}
              style={{
                background: '#2d5f3f',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Plan Another Garden
            </button>
            <button 
              onClick={() => window.print()}
              style={{
                background: 'white',
                color: '#2d5f3f',
                padding: '12px 24px',
                border: '2px solid #2d5f3f',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Print Plan
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
