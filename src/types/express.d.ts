// express.d.ts
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // You can specify a more specific type instead of 'any'
        }
    }
}
