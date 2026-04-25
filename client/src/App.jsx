import { useState } from 'react';
import { Compass } from 'lucide-react';
import RoadmapForm from './components/RoadmapForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import CompareModal from './components/CompareModal';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For Comparison
  const [isComparing, setIsComparing] = useState(false);
  const [compareRoadmap, setCompareRoadmap] = useState(null);
  const [isCompareLoading, setIsCompareLoading] = useState(false);

  const generateRoadmap = async (formData, isCompare = false) => {
    if (isCompare) {
      setIsCompareLoading(true);
    } else {
      setIsLoading(true);
      setError(null);
    }

    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap. Please try again.');
      }

      const data = await response.json();
      
      if (isCompare) {
        setCompareRoadmap(data);
      } else {
        setRoadmap(data);
      }
    } catch (err) {
      if (!isCompare) {
        setError(err.message);
      } else {
        alert("Failed to generate comparison: " + err.message);
      }
    } finally {
      if (isCompare) {
        setIsCompareLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleSimulate = (modifiedData) => {
    // Re-generate the main roadmap with the new simulated data
    generateRoadmap(modifiedData);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Compass className="logo-icon" size={28} />
          Career Compass
        </div>
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <RoadmapForm 
            onSubmit={(data) => generateRoadmap(data, false)} 
            isLoading={isLoading} 
          />
        </aside>

        <section className="content-area">
          {isLoading ? (
            <div className="loading-container card">
              <div className="spinner"></div>
              <h3>Generating your personalized roadmap...</h3>
              <p>Our AI is analyzing your profile and creating a step-by-step plan.</p>
            </div>
          ) : error ? (
            <div className="card">
              <div className="card-body">
                <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
                  <strong>Error:</strong> {error}
                </div>
                <button className="btn btn-primary" onClick={() => setError(null)}>
                  Try Again
                </button>
              </div>
            </div>
          ) : roadmap ? (
            <RoadmapDisplay 
              roadmap={roadmap} 
              onCompare={() => setIsComparing(true)}
              onSimulate={handleSimulate}
            />
          ) : (
            <div className="empty-state">
              <Compass className="empty-state-icon" size={64} />
              <h2>Your Career Journey Starts Here</h2>
              <p>Fill out the form on the left to generate a personalized step-by-step career roadmap powered by AI.</p>
            </div>
          )}
        </section>
      </main>

      {isComparing && (
        <CompareModal 
          baseRoadmap={roadmap}
          compareRoadmap={compareRoadmap}
          isCompareLoading={isCompareLoading}
          onClose={() => {
            setIsComparing(false);
            setCompareRoadmap(null);
          }}
          onGenerateCompare={(data) => generateRoadmap(data, true)}
        />
      )}
    </div>
  );
}

export default App;
