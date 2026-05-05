import { ai } from '../config/ai_model.js';
import { SYSTEM_PROMPT } from '../config/constants.js';
import markdownit from 'markdown-it'

const md = markdownit({
    html: true,
});

export const getInsights = async (req, res) => {
    console.log('Received request for insights with body:', req.body);
    try {
        const { userName, numbers } = req.body;

        if (!userName || !numbers) {
            return res.status(400).json({
                success: false,
                message: 'Name and numbers are required'
            });
        }

        // Build the prompt with numerology data
        const prompt = `my name is ${userName} and my numerology numbers are ${JSON.stringify(numbers)}. Please provide a detailed numerology insight based on this information.`;

        // Call Gemini API for AI insights
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                temperature: 0.1,
                systemInstruction: SYSTEM_PROMPT,
            },
        });

        const htmlInsight = md.render(response.text);

        res.status(200).json({
            success: true,
            userName,
            numbers,
            insight: htmlInsight,
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