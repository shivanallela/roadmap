import { useState } from 'react';

const RoadmapForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    education: '',
    interests: '',
    skills: '',
    careerGoal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="careerGoal">
            Target Career Goal *
          </label>
          <input
            type="text"
            id="careerGoal"
            name="careerGoal"
            className="form-control"
            placeholder="e.g. AI Engineer, Full Stack Dev"
            value={formData.careerGoal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="education">
            Education Level
          </label>
          <input
            type="text"
            id="education"
            name="education"
            className="form-control"
            placeholder="e.g. B.Tech, Self-Taught"
            value={formData.education}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="interests">
            Interests & Passions
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            className="form-control"
            placeholder="e.g. Machine Learning, Web Design"
            value={formData.interests}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="skills">
            Current Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            className="form-control"
            placeholder="e.g. Python (Basic), HTML/CSS"
            rows="3"
            value={formData.skills}
            onChange={handleChange}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-full"
          disabled={isLoading || !formData.careerGoal}
        >
          {isLoading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </form>
    </div>
  );
};

export default RoadmapForm;
