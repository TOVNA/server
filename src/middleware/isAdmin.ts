import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express';
import { Role } from '../types/roles';

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== Role.Admin ) {
        res.status(403).send('Forbidden: Admins only');
        return;
    }
    next();
};