import React, { useState } from 'react'
import { plants, zones } from './plantData.js'

export default function App() {
  const [selectedZone, setSelectedZone] = useState('')
  const [selectedPlants, setSelectedPlants] = useState([])
  const [step, setStep] = useState('zone') // 'zone', 'plants', 'results'

  const handlePlantToggle = (plantId) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    )
  }

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
          Plan your spring garden in 3 easy steps
        </p>
      </header>

      {/* Step 1: Zone Selection */}
      {step === 'zone' && (
        <div style={{ textAlign: 'center' }}>
          <h2>Step 1: Select Your Hardiness Zone</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Choose your climate zone to get accurate planting dates
          </p>
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
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Click plants to add them to your garden plan
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            marginBottom: '30px'
          }}>
            {plants.map(plant => (
              <div 
                key={plant.id}
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
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{plant.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{plant.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {plant.difficulty}
                </div>
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
                alignItems: 'center',
                padding: '12px',
                background: 'white',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '24px', marginRight: '12px' }}>{plant.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{plant.name}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Plant by: <strong>{plant.plantDate}</strong>
                  </div>
                </div>
              </div>
            ))}
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
