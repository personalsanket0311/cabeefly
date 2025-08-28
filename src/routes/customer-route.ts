
import { Router } from 'express';
import CustomerController from '../controllers/customer-controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth-middleware';
import customerPhotoUpload from '../middlewares/customer-photo-upload-middleware';

const customerRouter = Router();

customerRouter.post('/signup', CustomerController.signup);
customerRouter.post('/signin', CustomerController.signin);
customerRouter.post('/refresh', CustomerController.refresh);

customerRouter.get('/', authenticateToken, authorizeRoles('admin', 'superadmin'), CustomerController.findAllCustomers);
customerRouter.get('/:customerId', authenticateToken, authorizeRoles('admin', 'superadmin'), CustomerController.findCustomerById);
customerRouter.put('/upload-profile-photo/:customerId', customerPhotoUpload.single('customerProfilePhoto'), CustomerController.updateCustomerProfilePhoto);

export default customerRouter;
