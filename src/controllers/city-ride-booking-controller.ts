import { Request, Response } from 'express';
import CityRideBookingRepository from '../repositories/mongo/city-ride-booking-repository';
import { IUser } from '../types/user';


// Create City Ride Booking
const createCityRideBooking = async (req: Request, res: Response) => {
  try {
    const userData: IUser = { userId: 'webUser' };
    const result = await CityRideBookingRepository.createBooking(req.body, userData);

    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message
      });
    }
    return res.status(201).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while creating city ride booking:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};



// Get All City Ride Bookings
const getAllCityRideBookings = async (_req: Request, res: Response) => {
  try {
    const result = await CityRideBookingRepository.findAllBookings();

    if (result.error) {
      return res.status(404).json({
        error: true,
        message: result.message,
        data: result.data ?? []
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while fetching bookings:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


// Get All Deleted City Ride Bookings
const getAllDeletedCityRideBookings = async (_req: Request, res: Response) => {
  try {
    const result = await CityRideBookingRepository.findAllDeletedBookings();

    if (result.error) {
      return res.status(404).json({
        error: true,
        message: result.message,
        data: result.data ?? []
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while fetching deleted bookings:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


// Get City Ride Booking By ID
const getCityRideBookingById = async (req: Request, res: Response) => {
  try {
    const result = await CityRideBookingRepository.findBookingById(req.params.id);

    if (result.error) {
      return res.status(404).json({
        error: true,
        message: result.message,
        data: result.data ?? {}
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while fetching booking by ID:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


// Update City Ride Booking By ID
const updateCityRideBookingById = async (req: Request, res: Response) => {
  try {
    const userData: IUser = { userId: 'webUser' };
    const result = await CityRideBookingRepository.updateBookingById(req.params.id, req.body, userData);

    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message,
        data: result.data ?? {}
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while updating booking:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};



// Soft Delete City Ride Booking By ID
const deleteCityRideBookingById = async (req: Request, res: Response) => {
  try {
    const userData: IUser = { userId: 'webUser' };
    const result = await CityRideBookingRepository.deleteBookingById(req.params.id, userData);

    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message,
        data: result.data ?? {}
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while deleting booking:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


// Delete Multiple City Ride Bookings
const deleteMultipleCityRideBookings = async (req: Request, res: Response) => {
  try {
    const userData: IUser = { userId: 'webUser' };
    const { bookingIds } = req.body;

    const result = await CityRideBookingRepository.deleteMultipleBookings(bookingIds, userData);

    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message,
        data: result.data ?? {}
      });
    }
    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Unexpected error while deleting multiple bookings:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


// Restore Deleted City Ride Booking
const restoreCityRideBooking = async (req: Request, res: Response) => {
  try {
    const userData: IUser = { userId: 'webUser' };
    const result = await CityRideBookingRepository.restoreBookingById(req.params.id, userData);

    if (result.error) {
      return res.status(400).json({
        error: true,
        message: result.message,
        data: result.data ?? {}
      });
    }

    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data
    });
    
  } catch (error) {
    console.error('Unexpected error while restoring booking:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: true, message: error.message });
    } else {
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
};


export default {
  createCityRideBooking,
  getAllCityRideBookings,
  getAllDeletedCityRideBookings,
  getCityRideBookingById,
  updateCityRideBookingById,
  deleteCityRideBookingById,
  deleteMultipleCityRideBookings,
  restoreCityRideBooking
};
