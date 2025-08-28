import mongoose, { Schema, Document, CallbackError } from 'mongoose';

export interface IOutstation extends Document {
  _id: string; 
  tripCategory: 'out-station' | 'cab-seat' | 'air-port' |'city-ride';
  tripType: 'one-way' | 'round-trip';
  pickupLocation: string;
  dropLocation: string;
  stops: string[];
  pickupDate: Date;
  pickupTime: string; 
  returnDate?: Date;
  status: 'Active' | 'Inactive';
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const outstationSchema: Schema = new Schema(
  {
    _id: { type: String }, 
    tripCategory: { type: String,enum: ['out-station', 'cab-seat', 'air-port','city-ride'] },
    tripType: { type: String, enum: ['one-way', 'round-trip'], required: true },
    pickupLocation: { type: String },
    dropLocation: { type: String },
    stops: [{ type: String }],
    pickupDate: { type: Date},
    pickupTime: { type: String},
    returnDate: { type: Date },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// Pre-validate hook to auto-generate _id 
outstationSchema.pre<IOutstation>('validate', async function (next) {
  const booking = this;

  if (booking.isNew && !booking._id) {
    try {
      const last = await mongoose
        .model<IOutstation>('Outstation')
        .findOne()
        .sort({ createdAt: -1 });

      let newIdNumber = 1;
      if (last && last._id) {
        const lastIdNumber = parseInt(last._id.substring(2));
        newIdNumber = lastIdNumber + 1;
      }

      booking._id = `OS${newIdNumber.toString().padStart(10, '0')}`;
      booking.createdBy = booking.createdBy || booking._id;
    } catch (err) {
      return next(err as CallbackError);
    }
  }

  next();
});

export const OutstationModel = mongoose.model<IOutstation>('Outstation', outstationSchema);
