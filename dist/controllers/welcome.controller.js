"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelcomeData = void 0;
const getWelcomeData = (_req, res) => {
    const googleKey = process.env.GOOGLE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const videoUrl = process.env.ONBOARDING_VIDEO_URL;
    if (!googleKey || !geminiKey || !videoUrl) {
        return res.status(500).json({ message: 'Internal server error: Missing API keys or video URL' });
    }
    res.status(200).json({
        googleKey,
        geminiKey,
        videoUrl,
    });
};
exports.getWelcomeData = getWelcomeData;
