import { Request, Response } from 'express';
import CabCategoryRepository from '../repositories/mongo/cab-category-repository';
import { IUser } from '../types/user';
import { ICabCategory } from '../models/mongo/cab-category-model';
import CabCategoryRepositorysitory from '../repositories/mongo/cab-category-repository';

const createCabCategory = async (req: Request, res: Response) => {
  try {
    const cabCategoryData = req.body as ICabCategory;
    const userData = {
      userId: 'webUser'
    };
    const cabCategory = await CabCategoryRepositorysitory.createCabCategory(cabCategoryData, userData);
    if (cabCategory.error) {
      return res.status(400).json({ error: true, message: cabCategory.message });
    }
    res.status(201).json(cabCategory);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: true, message: error.message });
    else
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};


const findAllCabCategories = async (_req: Request, res: Response) => {
  try {
    const allCabCategories = await CabCategoryRepositorysitory.findAllCabCategories();
    res.status(200).json(allCabCategories);
  } catch (error) {
    if (error instanceof Error)
      res.status(404).json({ error: true, message: error.message });
    else
      res.status(404).json({ error: true, message: error });
  }
};


const findCabCategoryById = async (req: Request, res: Response) => {
  try {
    const result = await CabCategoryRepository.findCabCategoryById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: 'Cab category not found', error: String(error) });
  }
};

const updateCabCategoryById = async (req: Request, res: Response) => {
  try {
    const userData = {
      userId: 'webUser'
    };
    const result = await CabCategoryRepository.updateCabCategoryById(req.params.id, req.body, userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cab category', error: String(error) });
  }
};

const deleteCabCategoryById = async (req: Request, res: Response) => {
  try {
    const userData = {
      userId: 'webUser'
    };
    const result = await CabCategoryRepository.deleteCabCategoryById(req.params.id, userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting cab category', error: String(error) });
  }
};

const deleteMultipleCabCategories = async (req: Request, res: Response) => {
  try {
    const userData = {
      userId: 'webUser'
    };
    const { cabCategoryIds } = req.body;
    const result = await CabCategoryRepository.deleteMultipleCabCategories(cabCategoryIds, userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting cab categories', error: String(error) });
  }
};

const restoreCabCategory = async (req: Request, res: Response) => {
  try {
    const userData = {
      userId: 'webUser'
    };
    const result = await CabCategoryRepository.restoreCabCategoryById(req.params.id, userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error restoring cab category', error: String(error) });
  }
};


const findAllDeletedCabCategories = async (req: Request, res: Response) => {
  try {
    const result = await CabCategoryRepository.findAllDeletedCabCategories();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deleted cab categories', error: error instanceof Error ? error.message : String(error) });
  }
};

export default {
  createCabCategory,
  findAllCabCategories,
  findAllDeletedCabCategories,
  findCabCategoryById,
  updateCabCategoryById,
  deleteCabCategoryById,
  deleteMultipleCabCategories,
  restoreCabCategory
};
