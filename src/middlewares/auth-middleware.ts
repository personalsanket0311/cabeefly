import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../types/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({
      error: 'Unauthorized! Please login with valid credentials'
    });
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({
        error: 'Session may expired!'
      });
      req.user = user as IUser;
      next();
    });
};

export const authorizeRoles = ( ...allowedRoles: string[] ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let user = req.user as IUser;
        if (!user || !allowedRoles.includes(user.role || "")) {
            return res.status(403).json({ message: 'Access denied. Role not authorized.' });
        }
        next();
    };
};
