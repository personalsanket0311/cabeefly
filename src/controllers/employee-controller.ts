import { Request, Response } from 'express';
import EmployeeRepository from '../repositories/mongo/employee-repository';
import Employee from '../models/mongo/employee-model';


const signup = async (req: Request, res: Response) => {
    try {
        const response = await EmployeeRepository.signup(req.body);
        res.status(201).json(response);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const signin = async (req: Request, res: Response) => {
    try {
        const response = await EmployeeRepository.signin(req.body);
        res.status(200).json(response);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}

const refresh = async (req: Request, res: Response) => {
    try {
        const response = await EmployeeRepository.refresh(req.body);
        res.status(200).json(response);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
        else
            res.status(500).json({ error: error });
    }
}


const findAllEmployees = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeRepository.findAllEmployees();
    if (result.error) {
      return res.status(500).json({ message: result.message });
    }
    res.status(200).json({ message: "Employees fetched", data: result.data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


const findEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee fetched", data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



const EmployeeController = {
    signup,
    signin,
    refresh,
    findAllEmployees,
    findEmployeeById
}

export default EmployeeController;