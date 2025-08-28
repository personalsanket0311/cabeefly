// routes/cityRideBooking-route.ts
import express from 'express';
import CityRideBookingController from '../controllers/city-ride-booking-controller';

const router = express.Router();


router.post('/', CityRideBookingController.createCityRideBooking); // Create a city ride booking
router.get('/', CityRideBookingController.getAllCityRideBookings); // Get all city ride bookings
router.get('/:id', CityRideBookingController.getCityRideBookingById); // Get a single city ride booking by ID
router.put('/:id', CityRideBookingController.updateCityRideBookingById); // Update a city ride booking by ID
router.delete('/:id', CityRideBookingController.deleteCityRideBookingById); // Soft delete a city ride booking
router.put('/restore/:id', CityRideBookingController.restoreCityRideBooking); // Restore soft-deleted city ride booking
router.post('/multidelete', CityRideBookingController.deleteMultipleCityRideBookings); // Multi delete city ride bookings
router.get('/deleted/all', CityRideBookingController.getAllDeletedCityRideBookings); // Get all soft-deleted city ride bookings


export default router;
