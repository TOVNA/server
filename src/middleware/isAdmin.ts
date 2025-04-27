import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express';

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'admin') {
        res.status(403).send('Forbidden: Admins only');
        return;
    }
    next();
};