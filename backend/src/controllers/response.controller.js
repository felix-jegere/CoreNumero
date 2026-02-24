import { ai } from '../config/ai_model.js';
import { SYSTEM_PROMPT } from '../config/constants.js';

export const getInsights = async (req, res) => {
    try {
        const { userName, numbers, question } = req.body;

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
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                temperature: 0.1,
                systemInstruction: SYSTEM_PROMPT,
            },
        });

        res.status(200).json({
            success: true,
            userName,
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