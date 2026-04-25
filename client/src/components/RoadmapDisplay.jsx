import { useState } from 'react';
import { Download, GitCompare, Edit3 } from 'lucide-react';

const RoadmapDisplay = ({ roadmap, onCompare, onSimulate }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState({
    careerGoal: roadmap?.career || '',
    skills: '',
  });

  if (!roadmap || !roadmap.stages) return null;

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmap, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${roadmap.career.replace(/\s+/g, '_')}_roadmap.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    onSimulate(simulationData);
    setIsSimulating(false);
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
            {roadmap.career}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Your personalized path to success</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => setIsSimulating(!isSimulating)}>
            <Edit3 size={18} /> What If?
          </button>
          <button className="btn btn-secondary" onClick={onCompare}>
            <GitCompare size={18} /> Compare
          </button>
          <button className="btn btn-primary" onClick={downloadJSON}>
            <Download size={18} /> Download
          </button>
        </div>
      </div>

      {/* Qualifications Section */}
      {roadmap.qualifications && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
          <div className="card-header">
            <h3 className="card-title">📋 Qualifications Required</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              What you need before starting this career path
            </p>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>

              {roadmap.qualifications.education && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🎓 Education</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{roadmap.qualifications.education}</p>
                </div>
              )}

              {roadmap.qualifications.prerequisites?.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✅ Prerequisites</h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    {roadmap.qualifications.prerequisites.map((item, i) => (
                      <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {roadmap.qualifications.certifications?.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🏆 Certifications</h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    {roadmap.qualifications.certifications.map((cert, i) => (
                      <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {roadmap.qualifications.soft_skills?.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🧠 Soft Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {roadmap.qualifications.soft_skills.map((skill, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary-hover)', border: '1px solid rgba(59,130,246,0.3)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {isSimulating && (
        <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
          <div className="card-body">
            <h3 style={{ marginBottom: '1rem' }}>"What If" Simulation</h3>
            <form onSubmit={handleSimulateSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <label className="form-label" htmlFor="sim-career">Change Goal</label>
                <input
                  type="text"
                  id="sim-career"
                  className="form-control"
                  value={simulationData.careerGoal}
                  onChange={(e) => setSimulationData({...simulationData, careerGoal: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <label className="form-label" htmlFor="sim-skills">Add/Remove Skill</label>
                <input
                  type="text"
                  id="sim-skills"
                  className="form-control"
                  placeholder="e.g. Mastered React"
                  value={simulationData.skills}
                  onChange={(e) => setSimulationData({...simulationData, skills: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary">Simulate</button>
            </form>
          </div>
        </div>
      )}

      <div className="timeline" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
        {/* Timeline connector line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: '20px',
          width: '2px',
          backgroundColor: 'var(--border)',
          zIndex: 0
        }}></div>

        {roadmap.stages.map((stage, index) => (
          <div key={index} className="timeline-item card" style={{ position: 'relative', zIndex: 1, marginLeft: '3rem' }}>
            {/* Timeline node */}
            <div style={{
              position: 'absolute',
              left: '-3rem',
              top: '1.5rem',
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              border: '4px solid var(--bg-main)',
              transform: 'translateX(2px)'
            }}></div>

            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="card-title" style={{ color: 'var(--primary)' }}>{stage.level}</h3>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'var(--bg-glass)', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                {stage.duration}
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Skills to Learn</h4>
                  <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    {stage.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Tools & Technologies</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {stage.tools.map((tool, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Recommended Projects</h4>
                  <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    {stage.projects.map((project, i) => <li key={i}>{project}</li>)}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapDisplay;
