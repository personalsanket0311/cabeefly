import mongoose, { Schema, Document, CallbackError } from 'mongoose';

export interface IEmployee extends Document {
    _id: string;
    role: 'admin' | 'superadmin';
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    qualification: string;
    gender: 'Male' | 'Female';
    email?: string;
    emailPassword?: string;
    status: 'Active' | 'Inactive';
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const employeeSchema: Schema = new Schema(
    {
        _id: {type: String,required: true},
        role: {type: String,enum: [ 'admin', 'superadmin'],required: true,default: 'trainer'},
        firstName: {type: String,},
        lastName: {type: String,},
        dateOfBirth: {type: Date,},
        qualification: {type: String,},
        gender: {type: String,enum: ['Male', 'Female'],required: true,default: 'Male'},
        email: {type: String,required: true},
        emailPassword: {type: String,required: true},
        status: { type: String, enum: ['Active', 'Inactive'], required: true, default: 'Active' },
        createdBy: { type: String, required: true },
        updatedBy: { type: String }
    },
    { timestamps: true }
);

// Pre-validate hook to auto-generate _id (employeeId) before validation
employeeSchema.pre<IEmployee>('validate', async function (next) {
    const employee = this;
    if (employee.isNew && !employee._id) {
        try {
            const lastEmployee = await mongoose.model<IEmployee>('Employee').findOne().sort({ createdAt: -1 });
            let newIdNumber = 1;
            if (lastEmployee && lastEmployee._id) {
                const lastIdNumber = parseInt(lastEmployee._id.substring(2));
                newIdNumber = lastIdNumber + 1;
            }
            employee._id = `EM${newIdNumber.toString().padStart(10, '0')}`;
            employee.createdBy = employee.createdBy ? employee.createdBy : employee._id;
        } catch (err) {
            return next(err as CallbackError);
        }
    }
    next();
});

// Pre-save middleware for validation
employeeSchema.pre('save', async function(next) {
    const employee: any = this;

    // Roles that require mobile only
    const requiredRoles = ['trainer', 'admin'];

    if (requiredRoles.includes(employee.role)) {
        if (!employee.email) {
            return next(new Error('Email is required.'));
        }
    }

    // Check if email already exists
    if (employee.email) {
        const emailExists = await mongoose.model<IEmployee>('Employee').findOne({ email: employee.email });
        if (emailExists) {
            return next(new Error(`Employee already exists with email: ${employee.email}`));
        }
    }

    next();
});

export default mongoose.model<IEmployee>('Employee', employeeSchema);
