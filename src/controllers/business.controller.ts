import { Request, Response, NextFunction } from 'express';
import * as businessService from '../services/business.service';

export const updateBusinessDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const details = req.body;
    const updated = await businessService.updateBusinessDetails(userId, details);
    res.json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};
