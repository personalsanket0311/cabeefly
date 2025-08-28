import mongoose, { CallbackError, Document, Schema } from 'mongoose';

export interface ICabCategory extends Document {
  _id: string; // cabCategoryId
  cabCategory: string;
  seatingCapacity: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CabCategorySchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    cabCategory: {type: String ,required: true},
    seatingCapacity: { type: String, required: true },
    status: {type: String,enum: ['Active', 'Inactive'], default: 'Active', required: true},
    createdBy: { type: String, required: true },
    updatedBy: { type: String }
  },
  { timestamps: true }
);

CabCategorySchema.pre<ICabCategory>('validate', async function (next) {
  const cabCategory = this;

  if (cabCategory.isNew && !cabCategory._id) {
    try {
      const lastCabCategory = await mongoose
        .model<ICabCategory>('CabCategory')
        .findOne()
        .sort({ createdAt: -1 });

      let newIdNumber = 1;

      if (lastCabCategory && lastCabCategory._id) {
        const lastIdNumber = parseInt(lastCabCategory._id.substring(2));
        newIdNumber = lastIdNumber + 1;
      }

      cabCategory._id = `CC${newIdNumber.toString().padStart(10, '0')}`;
    } catch (err) {
      return next(err as CallbackError);
    }
  }

  next();
});

export default mongoose.model<ICabCategory>('CabCategory', CabCategorySchema);
