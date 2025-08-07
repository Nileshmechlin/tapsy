import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { verifyFirebaseToken } from '../utils/firebase';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userType } = req.body;

    if (!userType) {
      return res.status(400).json({ error: 'userType is required' });
    }

    if (userType !== 'INDIVIDUAL' && userType !== 'BUSINESS') {
        return res.status(400).json({ error: 'Invalid userType' });
    }

    const user = await userService.createUser(userType);
    res.status(201).json(user);
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({
      error: 'User creation failed',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      if (updates.idToken) {
        const decoded = await verifyFirebaseToken(updates.idToken);
  
        if (!decoded.phone_number) {
          return res.status(400).json({ error: 'Invalid Firebase token' });
        }
  
        updates.mobileNumber = decoded.phone_number;
        updates.otpVerified = true;
      }
  
      delete updates.idToken;
  
      delete updates.status;
      delete updates.userType;
  
      const updated = await userService.updateUser(id, updates);
      res.json(updated);
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'User update failed' });
    }
  };
  

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
  } catch {
    res.status(500).json({ error: 'User fetch failed' });
  }
};


export const verifyEmailOtp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;
    const updated = await userService.verifyEmailOtp(id, otp);
    res.json(updated);
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { loginId, deviceId } = req.body;
    if (!loginId || !deviceId) {
      return res.status(400).json({ error: 'loginId and deviceId are required' });
    }
    const result = await userService.login(loginId, deviceId);
    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: (error as Error).message });
  }
};
