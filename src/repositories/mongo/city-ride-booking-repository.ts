import CityRideBookingModel, { ICityRideBooking } from '../../models/mongo/city-ride-booking-model';
import { IUser } from '../../types/user';



const createBooking = async (bookingData: ICityRideBooking, userData: IUser) => {
  try {
    const booking = new CityRideBookingModel({
      city: bookingData.city,
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime,
      createdBy: userData.userId,
      updatedBy: userData.userId
    });
    const savedBooking = await booking.save();
    return {
      error: false,
      message: 'Booking created successfully',
      data: {
        booking: savedBooking || {}
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      }
    } else {
      console.log("error", error)
      return {
        error: true,
        message: "City Ride Booking Creation failed"
      }
    }
  }
};



const findAllBookings = async () => {
  try {
    const allBookings = await CityRideBookingModel.find({ status: 'Active' }).sort({ createdAt: -1 });
    if (!allBookings || allBookings.length === 0) {
      return {
        error: true,
        message: 'No bookings found',
        data: []
      };
    }
    return {
      error: false,
      message: 'All bookings fetched successfully',
      data: allBookings
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    }
    else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to fetch bookings"
      };
    }
  }
};



const findBookingById = async (bookingId: string) => {
  try {
    const booking = await CityRideBookingModel.findOne({ _id: bookingId, status: 'Active' });

    if (!booking) {
      return {
        error: true,
        message: 'Booking not found',
        data: {}
      };
    }
    return {
      error: false,
      message: 'Booking fetched successfully',
      data: booking
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to find booking"
      };
    }
  }
};



const findAllDeletedBookings = async () => {
  try {
    const allDeletedBookings = await CityRideBookingModel.find({ status: 'Inactive' }).sort({ updatedAt: -1 });

    if (!allDeletedBookings || allDeletedBookings.length === 0) {
      return {
        error: true,
        message: 'No deleted bookings found',
        data: []
      };
    }
    return {
      error: false,
      message: 'All deleted bookings fetched successfully',
      data: allDeletedBookings
    };
  }
  catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to fetch deleted bookings"
      };
    }
  }
};



const updateBookingById = async (bookingId: string, bookingData: any, userData: IUser) => {
  try {
    const updatedBooking = await CityRideBookingModel.findOneAndUpdate(
      { _id: bookingId, status: 'Active' },
      {
        $set: {
          ...bookingData,
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!updatedBooking) {
      return {
        error: true,
        message: 'Booking not found or update failed',
        data: {}
      };
    }
    return {
      error: false,
      message: 'Booking updated successfully',
      data: updatedBooking
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to update booking"
      };
    }
  }
};



const deleteBookingById = async (bookingId: string, userData: IUser) => {
  try {
    const deletedBooking = await CityRideBookingModel.findOneAndUpdate(
      { _id: bookingId, status: 'Active' },
      {
        $set: {
          status: 'Inactive',
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!deletedBooking) {
      return {
        error: true,
        message: 'Booking not found or delete failed',
        data: {}
      };
    }
    return {
      error: false,
      message: 'Booking deleted successfully',
      data: deletedBooking
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to delete booking"
      };
    }
  }
};



const deleteMultipleBookings = async (bookingIds: string[], userData: IUser) => {
  try {
    const deletedBookings = await CityRideBookingModel.updateMany(
      { _id: { $in: bookingIds }, status: 'Active' },
      {
        $set: {
          status: 'Inactive',
          updatedBy: userData.userId
        }
      }
    );
    if (!deletedBookings || deletedBookings.matchedCount === 0) {
      return {
        error: true,
        message: 'No bookings found or delete failed',
        data: {}
      };
    }
    return {
      error: false,
      message: 'Bookings deleted successfully',
      data: deletedBookings
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Bulk delete failed"
      };
    }
  }
};


const restoreBookingById = async (bookingId: string, userData: IUser) => {
  try {
    const restored = await CityRideBookingModel.findOneAndUpdate(
      { _id: bookingId, status: 'Inactive' },
      {
        $set: {
          status: 'Active',
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!restored) {
      return {
        error: true,
        message: 'Booking not found or restore failed',
        data: {}
      };
    }
    return {
      error: false,
      message: 'Booking restored successfully',
      data: restored
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        error: true,
        message: "Failed to restore booking"
      };
    }
  }
};



const CityRideBookingRepository = {
   createBooking,
  findAllBookings,
  findAllDeletedBookings,
  findBookingById,
  updateBookingById,
  deleteBookingById,
  deleteMultipleBookings,
  restoreBookingById
};

export default CityRideBookingRepository;