import mongoose, { Schema, Document, CallbackError } from 'mongoose';

export interface IDriver extends Document {
    _id: string;
    fristName: string;
    lastname: string;
    mobileNumber: number;
    emergencyContact: string;
    email: string;
    emailPassword: string;
    license: string;
    aadharCard: string;
    profilePhoto: string;
    status: 'Active' | 'Inactive';
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const driverSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        fristName: { type: String },
        lastName: { type: String },
        mobileNumber: { type: Number },
        emergencyContact: { type: Number },
        email: { type: String },
        emailPassword: { type: String },
        license: { type: String },
        aadharCard: { type: String },
        profilePhoto: { type: String },
        status: { type: String, enum: ['Active', 'Inactive'], required: true, default: 'Active' },
        createdBy: { type: String, required: true },
        updatedBy: { type: String }
    },
    { timestamps: true }
);

// Pre-validate hook to auto-generate _id (driverId) before validation
driverSchema.pre<IDriver>('validate', async function (next) {
    const driver = this;
    if (driver.isNew && !driver._id) {
        try {
            const lastDriver = await mongoose.model<IDriver>('Driver').findOne().sort({ createdAt: -1 });
            let newIdNumber = 1;
            if (lastDriver && lastDriver._id) {
                const lastIdNumber = parseInt(lastDriver._id.substring(2));
                newIdNumber = lastIdNumber + 1;
            }
            driver._id = `DR${newIdNumber.toString().padStart(10, '0')}`;
            driver.createdBy = driver.createdBy ? driver.createdBy : driver._id;
        } catch (err) {
            return next(err as CallbackError);
        }
    }
    next();
});

// Pre-save middleware for validation
driverSchema.pre('save', async function (next) {
    const driver: any = this;

    // Roles that require mobile only
    const requiredRoles = ['driver'];

    if (requiredRoles.includes(driver.role)) {
        if (!driver.email) {
            return next(new Error('Email is required.'));
        }
    }

    // Check if email already exists
    if (driver.email) {
        const emailExists = await mongoose.model<IDriver>('Driver').findOne({ email: driver.email });
        if (emailExists) {
            return next(new Error(`Driver already exists with email: ${driver.email}`));
        }
    }

    next();
});

export default mongoose.model<IDriver>('Driver', driverSchema);
