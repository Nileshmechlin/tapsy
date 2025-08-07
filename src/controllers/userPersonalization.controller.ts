import { Request, Response } from 'express';
import * as userPersonalizationService from '../services/userPersonalization.service';

export const createUserPersonalization = async (req: Request, res: Response) => {
    try {
        const userPersonalization = await userPersonalizationService.createUserPersonalization(req.body);
        res.status(201).json(userPersonalization);
    } catch (error) {
        res.status(500).json({ error: 'User personalization creation failed' });
    }
};

export const getUserPersonalizations = async (req: Request, res: Response) => {
    try {
        const userPersonalizations = await userPersonalizationService.getAllUserPersonalizations();
        res.json(userPersonalizations);
    } catch (error) {
        res.status(500).json({ error: 'User personalizations fetch failed' });
    }
};

export const getUserPersonalization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userPersonalization = await userPersonalizationService.getUserPersonalizationById(id);
        res.json(userPersonalization);
    } catch (error) {
        res.status(500).json({ error: 'User personalization fetch failed' });
    }
};

export const updateUserPersonalization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUserPersonalization = await userPersonalizationService.updateUserPersonalization(id, updates);
        res.json(updatedUserPersonalization);
    } catch (error) {
        res.status(500).json({ error: 'User personalization update failed' });
    }
};

export const deleteUserPersonalization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userPersonalizationService.deleteUserPersonalization(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'User personalization deletion failed' });
    }
};
