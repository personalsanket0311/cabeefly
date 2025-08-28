import mongoose, { CallbackError, Document, Schema } from 'mongoose';

export interface ICityRideBooking extends Document {
  _id: string; // bookingId
  city: string;
  pickupDate: Date;
  pickupTime: string; // stored as "HH:MM"
  status: 'Active' | 'Inactive';
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CityRideBookingSchema: Schema = new Schema(
  {
    _id: { type: String, required: true}, // bookingId
    city: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      required: true,
    },
   
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// Auto-generate bookingId like: CR0000000001-- pre-validate hook use..
CityRideBookingSchema.pre<ICityRideBooking>('validate', async function (next) {
  const booking = this;

  if (booking.isNew && !booking._id) {
    try {
      const lastBooking = await mongoose
        .model<ICityRideBooking>('CityRideBooking')
        .findOne()
        .sort({ createdAt: -1 });

      let newIdNumber = 1;

      if (lastBooking && lastBooking._id) {
        const lastIdNumber = parseInt(lastBooking._id.substring(2)); // skip "CR"
        newIdNumber = lastIdNumber + 1;
      }

      booking._id = `CR${newIdNumber.toString().padStart(10, '0')}`;
    } catch (err) {
      return next(err as CallbackError);
    }
  }

  next();
});

export default mongoose.model<ICityRideBooking>('CityRideBooking', CityRideBookingSchema);
