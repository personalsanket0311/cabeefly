import { Request, Response } from 'express';
import CabCategoryPriceImageRepository from '../repositories/mongo/cab-category-price-image-repository';
import { IUser } from '../types/user';

const createPriceImage = async (req: Request, res: Response) => {
  try {
    let userData = {
      userId: "webUser" // req.user.userId
    };
    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.createPriceImage(
      { ...req.body, cabImage: req.file?.filename || '' },
      userData
    );
    res.status(201).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : error });
  }
};


 const findAllPriceImage = async (req: Request, res: Response) => {
  try {
    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.findAllPriceImage();
    res.status(200).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : error });
  }
};


 const findPriceImageById = async (req: Request, res: Response) => {
  try {
    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.findPriceImageById(req.params.priceImageId);
    res.status(200).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : error });
  }
};


 const updatePriceImageById = async (req: Request, res: Response) => {
  try {
    let userData = {
      userId: "webUser"
    };

    const updateData = {
      ...req.body,
      ...(req.file?.filename ? { cabImage: req.file.filename } : {})
    };

    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.updatePriceImageById(
      req.params.priceImageId,
      updateData,
      userData
    );

    res.status(200).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : error });
  }
};


const deletePriceImageById = async (req: Request, res: Response) => {
  try {
    let userData = {
      userId: "webUser"
    };

    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.deletePriceImageById(
      req.params.priceImageId,
      userData
    );

    res.status(200).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : error });
  }
};


 const restorePriceImageById = async (req: Request, res: Response) => {
  try {
    let userData = {
      userId: "webUser"
    };

    const result = await CabCategoryPriceImageRepository.restorePriceImageById(
      req.params.priceImageId,
      userData
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : error });
  }
};


 const findAllDeletedPriceImage = async (req: Request, res: Response) => {
  try {
    const cabCategoryPriceImage = await CabCategoryPriceImageRepository.findAllDeletedPriceImage();
    res.status(200).json(cabCategoryPriceImage);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : error });
  }
};


export default {
  createPriceImage,
  findAllPriceImage,
  findPriceImageById,
  updatePriceImageById,
  deletePriceImageById,
  restorePriceImageById,
  findAllDeletedPriceImage
};

