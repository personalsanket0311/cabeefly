import { Request, Response } from 'express';
import DriverRepository from '../repositories/mongo/driver-repository';


const signup = async (req: Request, res: Response) => {
    try {
        const response = await DriverRepository.signup(req.body);
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
        const response = await DriverRepository.signin(req.body);
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
        const response = await DriverRepository.refresh(req.body);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const refreshWithMobile = async (req: Request, res: Response) => {
    try {
        const response = await DriverRepository.refresh(req.body);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const findAllDrivers = async (req: Request, res: Response) => {
    try {
        const response = await DriverRepository.findAllDrivers();
        if (response.error) {
            return res.status(404).json(response);
        }
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


const findDriverById = async (req: Request, res: Response) => {
    try {
        const driverId = req.params.driverId;
        const response = await DriverRepository.findDriverProfileById(driverId);

        if (response.error) {
            return res.status(404).json(response);
        }

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const updateDriverProfilePhoto = async (req: Request, res: Response) => {
    try {
        const driverId = req.params.driverId;
        const profilePhoto = req.file ? req.file.path : '';

        if (!profilePhoto) {
            return res.status(400).json({ message: 'No profile photo uploaded' });
        }

        const result = await DriverRepository.updateDriverProfilePhoto(driverId, profilePhoto);
                            

        if (result.error) {
            return res.status(404).json({result});
        }

        res.status(200).json({result});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



const DriverController = {
    signup,
    signin,
    refresh,
    refreshWithMobile,
    findAllDrivers,
    findDriverById,
    updateDriverProfilePhoto,
}

export default DriverController;