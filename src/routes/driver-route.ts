// src/routes/driver-route.ts

import { Router } from 'express';
import DriverController from '../controllers/driver-controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth-middleware';
import driverPhotoUpload from '../middlewares/driver-photo-upload-middleware';

const driverRouter = Router();

driverRouter.post('/signup', DriverController.signup);
driverRouter.post('/signin', DriverController.signin);
driverRouter.post('/refresh', DriverController.refresh);

driverRouter.get('/', authenticateToken, authorizeRoles('admin', 'superadmin'), DriverController.findAllDrivers);
driverRouter.get('/:driverId', authenticateToken, authorizeRoles('admin', 'superadmin'), DriverController.findDriverById);
driverRouter.put('/upload-profile-photo/:driverId', authenticateToken, authorizeRoles('driver'),  driverPhotoUpload.single('driverProfilePhoto'), DriverController.updateDriverProfilePhoto);

export default driverRouter;
