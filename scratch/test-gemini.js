const fs = require('fs');

async function testFullGeneration(goal) {
  const envText = fs.readFileSync('.env.local', 'utf-8');
  const match = envText.match(/GEMINI_API_KEY=(.*)/);
  const key = match ? match[1].trim() : '';

  const model = 'gemini-flash-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  console.log(`Generating full live Gemini response for goal: "${goal}" using model ${model}...`);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are Google Gemini, an elite AI Career Architect.
Generate a structured JSON for a candidate aiming to become a "${goal}".
Return ONLY JSON with this structure:
{
  "careerGoal": "${goal}",
  "phase1Title": "string",
  "phase1Deliverable": "string",
  "phase2Title": "string",
  "phase2Deliverable": "string"
}`
        }]
      }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  console.log('Status:', res.status);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log(`Result for ${goal}:`, text);
}

async function run() {
  await testFullGeneration('Business Analyst');
  await testFullGeneration('Marine Biologist');
}

run();
