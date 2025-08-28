import { Request, Response } from 'express';
import CustomerRepository from '../repositories/mongo/customer-repository';


const signup = async (req: Request, res: Response) => {
    try {
        const response = await CustomerRepository.signup(req.body);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const signin = async (req: Request, res: Response) => {
    try {
        const response = await CustomerRepository.signin(req.body);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const refresh = async (req: Request, res: Response) => {
    try {
        const response = await CustomerRepository.refresh(req.body);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}


const findAllCustomers = async (req: Request, res: Response) => {
    try {
        const response = await CustomerRepository.findAllCustomers();
        if (response.error) {
            return res.status(404).json(response);
        }
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


const findCustomerById = async (req: Request, res: Response) => {
    try {
        const customerId = req.params.customerId;
        const response = await CustomerRepository.findCustomerProfileById(customerId);

        if (response.error) {
            return res.status(404).json(response);
        }

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



const updateCustomerProfilePhoto = async (req: Request, res: Response) => {
    try {
        const customerId = req.params.customerId;
        const profilePhoto = req.file ? req.file.path : '';

        if (!profilePhoto) {
            return res.status(400).json({ message: 'No profile photo uploaded' });
        }

        const result = await CustomerRepository.updateCustomerProfilePhoto(customerId, profilePhoto);
                            

        if (result.error) {
            return res.status(404).json({result});
        }

        res.status(200).json({result});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



const CustomerController = {
    signup,
    signin,
    refresh,
    findAllCustomers,
    findCustomerById,
    updateCustomerProfilePhoto,
}

export default CustomerController;