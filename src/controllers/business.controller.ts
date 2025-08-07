import { Request, Response } from 'express';
import * as businessService from '../services/business.service';

export const updateBusinessDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const details = req.body;
    const updated = await businessService.updateBusinessDetails(userId, details);
    res.json(updated);
  } catch (error) {
    console.error('Update business details error:', error);
    res.status(500).json({ error: 'Business details update failed' });
  }
};
