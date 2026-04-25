require('dotenv').config({ path: '../.env' }); // Assuming .env is in ROADMAP/
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { education, interests, skills, careerGoal } = req.body;

    if (!careerGoal) {
      return res.status(400).json({ error: 'Career goal is required' });
    }

    const prompt = `
      You are an expert career advisor. Generate a personalized step-by-step career roadmap for a user wanting to become a ${careerGoal}.
      
      User Profile:
      - Education Level: ${education || 'Not specified'}
      - Interests: ${interests || 'Not specified'}
      - Current Skills: ${skills || 'None'}
      
      Create a roadmap with 3 stages: Beginner, Intermediate, and Advanced.
      Also include a "qualifications" section BEFORE the stages that describes the entry requirements for this career.
      
      You MUST respond ONLY with a valid, parsable JSON object, with no markdown formatting, no \`\`\`json wrappers, and no extra text.
      The JSON structure MUST exactly match this format:
      {
        "career": "${careerGoal}",
        "qualifications": {
          "education": "Minimum education requirement (e.g., B.Tech in CS, Any graduate, Self-taught accepted)",
          "prerequisites": ["prerequisite1", "prerequisite2"],
          "certifications": ["recommended cert 1", "recommended cert 2"],
          "soft_skills": ["communication", "problem solving"]
        },
        "stages": [
          {
            "level": "Beginner",
            "skills": ["skill1", "skill2"],
            "tools": ["tool1", "tool2"],
            "projects": ["project1 description"],
            "duration": "e.g., 2-3 months"
          },
          {
            "level": "Intermediate",
            "skills": ["skill1", "skill2"],
            "tools": ["tool1", "tool2"],
            "projects": ["project1 description"],
            "duration": "e.g., 3-6 months"
          },
          {
            "level": "Advanced",
            "skills": ["skill1", "skill2"],
            "tools": ["tool1", "tool2"],
            "projects": ["project1 description"],
            "duration": "e.g., 6+ months"
          }
        ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful JSON-generating API. You only output valid JSON."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const output = chatCompletion.choices[0].message.content;
    const roadmapData = JSON.parse(output);

    res.json(roadmapData);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: 'Failed to generate roadmap', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
