import { ai } from '../config/ai_model.js';

export const getInsights = async (req, res) => {
    try {
        const { name, numbers, question } = req.body;

        if (!name || !numbers) {
            return res.status(400).json({
                success: false,
                message: 'Name and numbers are required'
            });
        }

        // Build the prompt with numerology data
        const prompt = `
As a numerology expert and spiritual guide, analyze the following numerology profile:

Name: ${name}
Life Path Number: ${numbers.lifePath}
Destiny Number: ${numbers.destiny}
Soul Urge Number: ${numbers.soulUrge}
Personality Number: ${numbers.personality}

${question ? `User's Question: ${question}` : ''}

Provide a detailed, insightful, and personalized numerology reading based on these numbers. Include:
1. What each number means for this person
2. How these numbers interact and influence their life
3. Practical guidance and insights
${question ? '4. Specific answer to their question based on numerology' : ''}

Be warm, encouraging, and provide actionable insights.`;

        // Call Gemini API for AI insights
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
            },
        });

        res.status(200).json({
            success: true,
            name,
            numbers,
            insight: response.text
        });
    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate insights',
            error: error.message
        });
    }
};