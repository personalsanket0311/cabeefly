import mongoose, { CallbackError, Document, Schema } from 'mongoose';

export interface ICabCategoryPriceAndImage extends Document {
  _id: string;
  cabCategoryId: string;
  cabImage: string[];
  pricePerKm: number;
  status: 'Active' | 'Inactive';
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CabCategoryPriceAndImageSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    cabCategoryId: { type: String, ref: 'CabCategory', required: true },
    cabImage: { type: [String], required: true },
    pricePerKm: { type: Number, required: true },
    status: {type: String,enum: ['Active', 'Inactive'],default: 'Active',required: true},
    createdBy: { type: String, required: true },
    updatedBy: { type: String }
  },
  { timestamps: true }
);

CabCategoryPriceAndImageSchema.pre<ICabCategoryPriceAndImage>('validate', async function (next) {
  if (this.isNew && !this._id) {
    try {
      const lastRecord = await mongoose
        .model<ICabCategoryPriceAndImage>('CabCategoryPriceAndImage')
        .findOne()
        .sort({ createdAt: -1 });

      let newIdNumber = 1;
      if (lastRecord && lastRecord._id) {
        const lastIdNumber = parseInt(lastRecord._id.substring(3));
        newIdNumber = lastIdNumber + 1;
      }

      this._id = `CPI${newIdNumber.toString().padStart(10, '0')}`;
    } catch (err) {
      return next(err as CallbackError);
    }
  }

  next();
});

export default mongoose.model<ICabCategoryPriceAndImage>(
  'CabCategoryPriceAndImage',
  CabCategoryPriceAndImageSchema
);
