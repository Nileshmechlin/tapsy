import { Request, Response } from 'express';

export const getWelcomeData = (_req: Request, res: Response) => {
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
