import Employee from '../../models/mongo/employee-model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt-util';

const saltRounds = 10;

export const signup = async (signupData: any) => {
    const { role, ...rest } = signupData;
    try {
        const hashedPassword = await bcrypt.hash(rest.emailPassword, saltRounds);

        const newUser = new Employee({
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
        if(error instanceof Error) {
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
        const user = await Employee.findOne({ email, role });

        if (!user) return { error: true, message: 'User not found.' };

        const isMatch = await bcrypt.compare(password, user.emailPassword || '');
        if (!isMatch) return { error: true, message: 'Invalid credentials.' };

        const payload = {
            userId: user._id,
            role: user.role,
            email: user.email,
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
        if(error instanceof Error) {
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
            role: string;
            iat?: number;
            exp?: number;
        };
        const payload = {
            userId: userData.userId,
            email: userData.email,
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


export const findEmployeeById = async (employeeId: string) => {
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return {
                error: true,
                message: "Employee not found."
            };
        }

        return {
            error: false,
            data: employee
        };
    } catch (error: any) {
        return {
            error: true,
            message: error.message || "Something went wrong"
        };
    }
};


export const findAllEmployees = async () => {
  try {
    const employees = await Employee.find({});
    return {
      error: false,
      data: employees
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message || "Something went wrong"
    };
  }
};



const EmployeeRepository = {
    signup,
    signin,
    refresh,
    findAllEmployees,
    findEmployeeById,
}

export default EmployeeRepository;
