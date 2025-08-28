import { Router } from 'express';
import EmployeeController from '../controllers/employee-controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth-middleware';

const employeeRouter = Router();

employeeRouter.post('/signup', authenticateToken, authorizeRoles('superadmin'), EmployeeController.signup);
employeeRouter.post('/signin', EmployeeController.signin);
employeeRouter.post('/refresh', EmployeeController.refresh);
employeeRouter.get('/',authenticateToken,authorizeRoles('superadmin'),EmployeeController.findAllEmployees);
employeeRouter.get('/:employeeId', authenticateToken, authorizeRoles('superadmin'), EmployeeController.findEmployeeById);

export default employeeRouter;


