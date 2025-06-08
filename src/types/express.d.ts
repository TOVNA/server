import { Request } from 'express';
import { Role } from './roles';

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: Role;
  };
}
