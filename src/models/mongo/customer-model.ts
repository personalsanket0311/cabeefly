import mongoose, { Schema, Document, CallbackError } from 'mongoose';

export interface ICustomer extends Document {
    _id: string;
    fristName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female';
    mobileNumber: string;
    emergencyContact: string;
    email?: string;
    emailPassword?: string;
    profilePhoto: string;
    status: 'Active' | 'Inactive';
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const customerSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        fristName: { type: String },
        lastName: { type: String },
        dateOfBirth: { type: String },
        gender: { type: String, enum: ['Male','Female']},
        mobileNumber: { type: String },
        emergencyContact: { type: String },
        email: { type: String },
        emailPassword: { type: String },
        profilePhoto: { type: String },
        status: { type: String, enum: ['Active', 'Inactive'], required: true, default: 'Active' },
        createdBy: { type: String, required: true },
        updatedBy: { type: String }
    },
    { timestamps: true }
);

// Pre-validate hook to auto-generate _id (customerId) before validation
customerSchema.pre<ICustomer>('validate', async function (next) {
    const customer = this;
    if (customer.isNew && !customer._id) {
        try {
            const lastCustomer = await mongoose.model<ICustomer>('Customer').findOne().sort({ createdAt: -1 });
            let newIdNumber = 1;
            if (lastCustomer && lastCustomer._id) {
                const lastIdNumber = parseInt(lastCustomer._id.substring(2));
                newIdNumber = lastIdNumber + 1;
            }
            customer._id = `CU${newIdNumber.toString().padStart(10, '0')}`;
            customer.createdBy = customer.createdBy ? customer.createdBy : customer._id;
        } catch (err) {
            return next(err as CallbackError);
        }
    }
    next();
});

// Pre-save middleware for validation
customerSchema.pre('save', async function (next) {
    const customer: any = this;

    // Roles that require mobile only
    const requiredRoles = ['customer'];

    if (requiredRoles.includes(customer.role)) {
        if (!customer.email) {
            return next(new Error('Email is required.'));
        }
    }

    // Check if email already exists
    if (customer.email) {
        const emailExists = await mongoose.model<ICustomer>('Customer').findOne({ email: customer.email });
        if (emailExists) {
            return next(new Error(`Customer already exists with email: ${customer.email}`));
        }
    }

    next();
});

export default mongoose.model<ICustomer>('Customer', customerSchema);
