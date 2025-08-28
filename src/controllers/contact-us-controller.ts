import { Request, Response } from 'express';
import * as ContactUsRepository from '../repositories/mongo/contact-us-repository';

//  Create ContactUs
const createContactUsController = async (req: Request, res: Response) => {
  try {
    const result = await ContactUsRepository.createContactUs(req.body);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

//  Get All Active ContactUs
const getAllContactUsController = async (_req: Request, res: Response) => {
  try {
    const result = await ContactUsRepository.getAllContactUs();
    res.status(result.error ? 400 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

//  Get ContactUs by ID
const getContactUsByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactUsRepository.getContactUsById(id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

// Update ContactUs by ID
const updateContactUsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactUsRepository.updateContactUs(id, req.body);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

// Delete 
const DeleteContactUsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactUsRepository.deleteContactUs(id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

//  Restore deleted
const restoreContactUsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactUsRepository.restoreContactUs(id);
    res.status(result.error ? 404 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

//  Multi Soft Delete
const multipleDeleteContactUsController = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: true, message: 'IDs must be an array' });
    }
    const result = await ContactUsRepository.multipleDeleteContactUs(ids);
    res.status(result.error ? 400 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

// get all soft delete
const getAllDeletedContactUsController = async (_req: Request, res: Response) => {
  try {
    const result = await ContactUsRepository.getAllDeletedContactUs();
    res.status(result.error ? 400 : 200).json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Server Error' });
  }
};

export {
  createContactUsController,
  getAllContactUsController,
  getContactUsByIdController,
  updateContactUsController,
  DeleteContactUsController,   
  restoreContactUsController,
  multipleDeleteContactUsController,
  getAllDeletedContactUsController,
};
