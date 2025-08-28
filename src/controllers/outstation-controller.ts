import { Request, Response } from 'express';
import * as OutstationRepo from '../repositories/mongo/outstation-booking-repository';

// Create Outstation Booking
const createOutstationController = async (req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.createOutstation(req.body);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error while creating booking',
      details: (error as Error).message,
    });
  }
};

// Get All Active Outstations
const getAllOutstationsController = async (_req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.getAllOutstations();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to fetch active outstations',
      details: (error as Error).message,
    });
  }
};

// Get Single Outstation by ID
const getOutstationByIdController = async (req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.getOutstationById(req.params.id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to fetch outstation booking',
      details: (error as Error).message,
    });
  }
};

// Update Outstation Booking
const updateOutstationController = async (req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.updateOutstation(req.params.id, req.body);
    res.status(result.error ? 400 : 200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to update booking',
      details: (error as Error).message,
    });
  }
};

// Delete Booking
const DeleteOutstationController = async (req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.softDeleteOutstation(req.params.id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'delete failed',
      details: (error as Error).message,
    });
  }
};

// Restore Booking
const restoreOutstationController = async (req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.restoreOutstation(req.params.id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to restore booking',
      details: (error as Error).message,
    });
  }
};

// Multi Delete
const multipleDeleteOutstationsController = async (req: Request, res: Response) => {
  try {
    const ids = req.body.ids;
    const result = await OutstationRepo.multiSoftDeleteOutstations(ids);
    res.status(result.error ? 400 : 200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Multiple delete failed',
      details: (error as Error).message,
    });
  }
};

// Get All Deleted
const getAllDeletedOutstationsController = async (_req: Request, res: Response) => {
  try {
    const result = await OutstationRepo.getAllDeletedOutstations();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to fetch deleted bookings',
      details: (error as Error).message,
    });
  }
};

export {
  createOutstationController,
  getAllOutstationsController,
  getOutstationByIdController,
  updateOutstationController,
  DeleteOutstationController,
  restoreOutstationController,
  multipleDeleteOutstationsController,
  getAllDeletedOutstationsController,
};
