import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { verifyFirebaseToken } from '../utils/firebase';
import AppError from '../utils/AppError';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userType } = req.body;

    if (!userType) {
      return next(new AppError('userType is required', 400));
    }

    if (userType !== 'INDIVIDUAL' && userType !== 'BUSINESS') {
      return next(new AppError('Invalid userType', 400));
    }

    const user = await userService.createUser(userType);
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.idToken) {
      const decoded = await verifyFirebaseToken(updates.idToken);

      if (!decoded.phone_number) {
        return next(new AppError('Invalid Firebase token', 400));
      }

      updates.mobileNumber = decoded.phone_number;
      updates.otpVerified = true;
    }

    delete updates.idToken;
    delete updates.status;
    delete updates.userType;

    const updated = await userService.updateUser(id, updates);
    res.json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;
    const updated = await userService.verifyEmailOtp(id, otp);
    res.json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loginId, deviceId } = req.body;
    if (!loginId || !deviceId) {
      return next(new AppError('loginId and deviceId are required', 400));
    }
    const result = await userService.login(loginId, deviceId);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};
