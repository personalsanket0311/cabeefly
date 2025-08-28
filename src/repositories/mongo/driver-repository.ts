import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Driver, { IDriver } from '../../models/mongo/driver-model';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt-util';
import { IUser } from '../../types/user';

dotenv.config();

const saltRounds = 10;

export const signup = async (signupData: any) => {
    const { role, ...rest } = signupData;
    try {
        const hashedPassword = await bcrypt.hash(rest.emailPassword, saltRounds);

        const newUser = new Driver({
            ...rest,
            role,
            emailPassword: hashedPassword,
        });

        await newUser.save();
        return {
            error: false,
            message: `${role} registered successfully.`
        };
    } catch (error: any) {
        if (error instanceof Error) {
            return {
                error: true,
                message: error.message
            }
        } else {
            console.log("error", error)
            return {
                error: true,
                message: "Something went wrong"
            }
        }
    }
};

export const signin = async (signinData: any) => {
    const { role, email, password } = signinData;

    try {
        const user = await Driver.findOne({ email });

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
            message: `${role} logged-in successfully.`,
            data: {
                accessToken,
                refreshToken
            }
        };
    } catch (error: any) {
        if (error instanceof Error) {
            return {
                error: true,
                message: error.message
            }
        } else {
            console.log("error", error)
            return {
                error: true,
                message: "Something went wrong"
            }
        }
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
            email: userData.email,
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
        console.log(err)
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
            role: string;
            iat?: number;
            exp?: number;
        };
        const payload = {
            userId: userData.userId,
            mobileNumber: userData.mobileNumber,
            role: userData.role
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
        console.log(err)
        return {
            error: true,
            message: 'Invalid refresh token.'
        };
    }
};



export const findAllDrivers = async () => {
    try {
        const drivers = await Driver.find({ status: 'Active' }).select(
            '-__v -createdAt -updatedAt -createdBy -updatedBy -emailPassword'
        );

        return {
            error: false,
            message: 'All drivers fetched successfully',
            data: drivers,
        };
    } catch (error: any) {
        return {
            error: true,
            message: error instanceof Error ? error.message : 'Something went wrong',
        };
    }
};



export const findDriverProfileById = async (driverId: string, status?: string) => {
    try {
        status = status || "Active";
        const driver = await Driver.findOne({ _id: driverId, status })
            .select('-__v -createdAt -updatedAt -createdBy -updatedBy -emailPassword');

        if (!driver) {
            return {
                error: true,
                message: "No driver found"
            }
        }

        return {
            error: false,
            message: 'Driver profile fetched successfully',
            data: {
                driver: driver || {}
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
                message: "Something went wrong"
            }
        }
    }
};

export const updateDriverProfileById = async (driverId: string, driverData: Partial<IDriver>, userData: IUser) => {
    try {
        driverData['updatedBy'] = userData.userId;
        const updatedDriver = await Driver.findOneAndUpdate({ _id: driverId, status: 'Active' }, { $set: driverData }, { new: true })
                                            .select('-__v -createdAt -updatedAt -createdBy -updatedBy -emailPassword');
        if (!updatedDriver) {
            return {
                error: true,
                message: "Driver not updated"
            }
        }

        return {
            error: false,
            message: 'Driver profile updated successfully',
            data: {
                driver: updatedDriver || {}
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
                message: "Something went wrong"
            }
        }
    }
};


export const updateDriverProfilePhoto = async (driverId: string, profilePhotoPath: string) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            { driverProfilePhoto: profilePhotoPath },
            { new: true }
        );

        if (!updatedDriver) {
            return {
                error: true,
                message: "Driver not found"
            };
        }

        return {
            error: false,
            message: "Driver profile photo updated successfully",
            data: updatedDriver
        };
    } catch (error: any) {
        return {
            error: true,
            message: error.message || "Something went wrong"
        };
    }
};

const DriverRepository = {
    signup,
    signin,
    refresh,
    findAllDrivers,
    findDriverProfileById,
    updateDriverProfileById,
    updateDriverProfilePhoto
}

export default DriverRepository;
