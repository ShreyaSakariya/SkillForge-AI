const fs = require('fs');

async function testFullRoute() {
  const envText = fs.readFileSync('.env.local', 'utf-8');
  const match = envText.match(/GEMINI_API_KEY=(.*)/);
  const key = match ? match[1].trim() : '';

  process.env.GEMINI_API_KEY = key;

  const { generateGeminiAnalysis } = require('../lib/ai/gemini');

  console.log('Testing generateGeminiAnalysis for "Business Analyst"...');
  const baResult = await generateGeminiAnalysis(
    'Experienced in SQL, Excel, and stakeholder management.',
    'Business Analyst'
  );
  console.log('BA Phase 1 Title:', baResult.roadmap.phases[0].title);
  console.log('BA Phase 1 Deliverable:', baResult.roadmap.phases[0].steps[0].keyDeliverable);

  console.log('\nTesting generateGeminiAnalysis for "Marine Biologist"...');
  const mbResult = await generateGeminiAnalysis(
    'Biology degree background with lab experience and environmental science coursework.',
    'Marine Biologist'
  );
  console.log('MB Phase 1 Title:', mbResult.roadmap.phases[0].title);
  console.log('MB Phase 1 Deliverable:', mbResult.roadmap.phases[0].steps[0].keyDeliverable);
}

testFullRoute().catch(console.error);
