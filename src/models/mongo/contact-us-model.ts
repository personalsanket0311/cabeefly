import mongoose, { Schema, Document, CallbackError } from 'mongoose';

export interface IContactUs extends Document {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactUsSchema: Schema = new Schema(
  {
    _id: { type: String },
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    createdBy: { type: String },
    updatedBy: { type: String }
  },
  { timestamps: true }
);

// Auto-generate _id (CU0000000001 format)
contactUsSchema.pre<IContactUs>('validate', async function (next) {
  if (this.isNew && !this._id) {
    try {
      const lastEntry = await mongoose.model<IContactUs>('ContactUs').findOne().sort({ createdAt: -1 });
      let newIdNumber = 1;
      if (lastEntry && lastEntry._id) {
        const lastIdNumber = parseInt(lastEntry._id.substring(2));
        newIdNumber = lastIdNumber + 1;
      }
      this._id = `CU${newIdNumber.toString().padStart(10, '0')}`;
      this.createdBy = this.createdBy || this._id;
    } catch (err) {
      return next(err as CallbackError);
    }
  }
  next();
});

export default mongoose.model<IContactUs>('ContactUs', contactUsSchema);
