import express from 'express';
import * as OutstationController from '../controllers/outstation-controller';

const router = express.Router();

router.post('/', OutstationController.createOutstationController);// Create Booking
router.get('/', OutstationController.getAllOutstationsController);// Get All Active Bookings
router.get('/get-by-id/:id', OutstationController.getOutstationByIdController);// Get Booking by ID
router.put('/update-by-id/:id', OutstationController.updateOutstationController);// Update Booking
router.delete('/delete/:id', OutstationController.DeleteOutstationController);// Delete Booking
router.put('/restore/:id', OutstationController.restoreOutstationController);// Restore Booking
router.post('/delete-multiple', OutstationController.multipleDeleteOutstationsController);// Multiple Delete
router.get('/get-all-deleted/', OutstationController.getAllDeletedOutstationsController);// Get All Deleted Bookings

export default router;
