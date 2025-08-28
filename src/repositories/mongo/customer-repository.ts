import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Customer, { ICustomer } from '../../models/mongo/customer-model';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt-util';
import { IUser } from '../../types/user';

dotenv.config();

const saltRounds = 10;

export const signup = async (signupData: any) => {
    try {
        const hashedPassword = await bcrypt.hash(signupData.emailPassword, saltRounds);

        const newUser = new Customer({
            ...signupData,
            emailPassword: hashedPassword,
        });
        await newUser.save();
        return {
            error: false,
            message: `Customer registered successfully.`
        };
    } catch (error: any) {
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};


export const signin = async (signinData: any) => {
    const { email, password } = signinData;
    try {
        const user = await Customer.findOne({ email });

        if (!user) return { error: true, message: 'User not found.' };

        const isMatch = await bcrypt.compare(password, user.emailPassword || '');
        if (!isMatch) return { error: true, message: 'Invalid credentials.' };

        const payload = {
            userId: user._id,
            email: user.email,
            mobileNumber: user.mobileNumber
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return {
            error: false,
            message: `Customer logged-in successfully.`,
            data: {
                accessToken,
                refreshToken
            }
        };
    } catch (error: any) {
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};


export const refresh = (refreshData: any) => {
    const { refreshToken } = refreshData;
    if (!refreshToken) return { error: true, message: 'Refresh token required.' };
    try {
        const userData: any = verifyRefreshToken(refreshToken) as {
            userId: string;
            email: string;
            iat?: number;
            exp?: number;
        };
        const payload = {
            userId: userData.userId,
            email: userData.email
        };
        const accessToken = generateAccessToken(payload);
        return {
            error: false,
            message: 'Token refreshed',
            data: {
                accessToken
            }
        };
    } catch (err: any) {
        return {
            error: true,
            message: 'Invalid refresh token.'
        };
    }
};


export const refreshWithMobile = (refreshData: any) => {
    const { refreshToken } = refreshData;
    if (!refreshToken) return { error: true, message: 'Refresh token required.' };
    try {
        const userData: any = verifyRefreshToken(refreshToken) as {
            userId: string;
            mobileNumber: number;
            iat?: number;
            exp?: number;
        };
        const payload = {
            userId: userData.userId,
            mobileNumber: userData.mobileNumber
        };
        const accessToken = generateAccessToken(payload);
        return {
            error: false,
            message: 'Token refreshed',
            data: {
                accessToken
            }
        };
    } catch (err: any) {
        return {
            error: true,
            message: 'Invalid refresh token.'
        };
    }
};


export const findAllCustomers = async () => {
    try {
        const customers = await Customer.find({ status: 'Active' }).select(
            '-__v -createdAt -updatedAt -createdBy -updatedBy -emailPassword'
        );
        return {
            error: false,
            message: 'All customers fetched successfully',
            data: customers,
        };
    } catch (error: any) {
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Something went wrong',
        };
    }
};


export const findCustomerProfileById = async (customerId: string, status?: string) => {
    try {
        status = status || "Active";
        const customer = await Customer.findOne({ _id: customerId, status })
            .select('-__v -createdAt -updatedAt -createdBy -updatedBy -emailPassword');
        if (!customer) {
            return {
                error: true,
                message: "No customer found"
            };
        }
        return {
            error: false,
            message: 'Customer profile fetched successfully',
            data: {
                customer: customer || {}
            }
        };
    } catch (error: any) {
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};


export const updateCustomerProfilePhoto = async (customerId: string, profilePhotoPath: string) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { customerProfilePhoto: profilePhotoPath },
            { new: true }
        );
        if (!updatedCustomer) {
            return {
                error: true,
                message: "Customer not found"
            };
        }
        return {
            error: false,
            message: "Customer profile photo updated successfully",
            data: updatedCustomer
        };
    } catch (error: any) {
        return {
            error: true,
            message: error.message || "Something went wrong"
        };
    }
};

const CustomerRepository = {
    signup,
    signin,
    refresh,
    refreshWithMobile,
    findAllCustomers,
    findCustomerProfileById,

    updateCustomerProfilePhoto
};

export default CustomerRepository;
