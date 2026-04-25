import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

const CompareModal = ({ baseRoadmap, compareRoadmap, isCompareLoading, onClose, onGenerateCompare }) => {
  const [compareGoal, setCompareGoal] = useState('');

  const handleCompareSubmit = (e) => {
    e.preventDefault();
    if (!compareGoal) return;
    
    // Pass same base info but different goal
    onGenerateCompare({
      careerGoal: compareGoal,
      // We assume other fields would ideally come from the same base profile,
      // but for simplicity we'll just send the new goal.
    });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50, padding: '2rem',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        width: '100%', maxWidth: '1200px', height: '90vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#0a0f1e',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
      }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Compare Career Paths</h2>
          <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="card-body" style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {!compareRoadmap && !isCompareLoading && (
            <form onSubmit={handleCompareSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', maxWidth: '600px', margin: '0 auto' }}>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <label className="form-label" htmlFor="compareGoal">Enter another career goal to compare with <strong>{baseRoadmap.career}</strong></label>
                <input
                  type="text"
                  id="compareGoal"
                  className="form-control"
                  placeholder="e.g. Data Scientist"
                  value={compareGoal}
                  onChange={(e) => setCompareGoal(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={!compareGoal}>
                Compare
              </button>
            </form>
          )}

          {isCompareLoading && (
            <div className="loading-container" style={{ padding: '2rem' }}>
              <div className="spinner"></div>
              <p>Generating comparison roadmap...</p>
            </div>
          )}
        </div>

        {compareRoadmap && (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left side: Base Roadmap */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', borderRight: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>{baseRoadmap.career}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {baseRoadmap.stages.map((stage, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <div className="card-header" style={{ padding: '1rem' }}>
                      <h4 style={{ margin: 0 }}>{stage.level}</h4>
                    </div>
                    <div className="card-body" style={{ padding: '1rem' }}>
                      <p><strong>Skills:</strong> {stage.skills.join(', ')}</p>
                      <p><strong>Tools:</strong> {stage.tools.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Compare Roadmap */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--success)', margin: 0 }}>{compareRoadmap.career}</h3>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} onClick={() => onGenerateCompare(null)}>
                  Clear
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {compareRoadmap.stages.map((stage, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <div className="card-header" style={{ padding: '1rem' }}>
                      <h4 style={{ margin: 0 }}>{stage.level}</h4>
                    </div>
                    <div className="card-body" style={{ padding: '1rem' }}>
                      <p><strong>Skills:</strong> {stage.skills.join(', ')}</p>
                      <p><strong>Tools:</strong> {stage.tools.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;
