import CabCategoryPriceImage, { ICabCategoryPriceAndImage } from '../../models/mongo/cab-category-price-image-model';
import { IUser } from '../../types/user';
import CabCategoryModel from '../../models/mongo/cab-category-model';

 const createPriceImage = async (data: ICabCategoryPriceAndImage, userData: IUser) => {
  try {
    if (!data.cabCategoryId) {
      throw new Error('cabCategoryId is required');
    }
    const categoryExists = await CabCategoryModel.findOne({_id: data.cabCategoryId,status: 'Active', });

    if (!categoryExists) {
      throw new Error('Provided cabCategoryId is invalid or inactive');
    }

    const newData = new CabCategoryPriceImage({
      cabCategoryId: data.cabCategoryId,
      pricePerKm: data.pricePerKm,
      cabImage: data.cabImage,
      status: 'Active',
      createdBy: userData.userId,
      updatedBy: userData.userId,
    });

    await newData.save();

    const saved = await CabCategoryPriceImage.findById(newData._id).populate('cabCategoryId');

    return {
      message: 'Cab image and price created successfully',
      data: {
        cabCategoryPriceImage: saved || {},
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const findAllPriceImage = async (status?: string) => {
  try {
    const data = await CabCategoryPriceImage.find({
      status: status || 'Active'
    });

    if (!data || data.length === 0) {
      throw new Error('No cab category price/image data found');
    }

    return {
      message: 'Cab image and price fetched successfully',
      data: {
        cabCategoryPriceImage: data
      }
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


 const findPriceImageById = async (id: string) => {
  try {
    const result = await CabCategoryPriceImage.findOne({ _id: id, status: 'Active' });

    if (!result) {
      throw new Error('Cab image and price not found');
    }

    return {
      message: 'Cab image and price fetched successfully',
      data: {
        cabCategoryPriceImage: result || {},
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


 const updatePriceImageById = async (
  id: string,updateData: Partial<ICabCategoryPriceAndImage>,
  userData: IUser
) => {
  try {
    updateData.updatedBy = userData.userId;

    const updated = await CabCategoryPriceImage.findOneAndUpdate(
      { _id: id, status: 'Active'},
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      throw new Error('Cab image and price not updated');
    }

    return {
      message: 'Cab image and price updated successfully',
      data: {
        cabCategoryPriceImage: updated || {},
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


 const deletePriceImageById = async (id: string, userData: IUser) => {
  try {
    const updateData = {
      status: 'Inactive',
      updatedBy: userData.userId,
    };

    const deleted = await CabCategoryPriceImage.findOneAndUpdate({ _id: id, status: 'Active' },{ $set: updateData },{ new: true });
    if (!deleted) {
      throw new Error('Cab image and price not deleted');
    }
    
    const populatedDeleted = await CabCategoryPriceImage.findById(deleted._id).populate('cabCategoryId');
    return {
      message: 'Cab image and price deleted successfully',
      data: {
        cabCategoryPriceImageId: populatedDeleted ||'',
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


const restorePriceImageById = async (id: string, userData: IUser) => {
  try {
    const updateData = {
      status: 'Active',
      updatedBy: userData.userId,
    };

    const restored = await CabCategoryPriceImage.findOneAndUpdate(
      { _id: id, status: 'Inactive' },
      { $set: updateData },
      { new: true }
    );

    if (!restored) {
      throw new Error('Cab image and price not restored');
    }

    return {
      message: 'Cab image and price restored successfully',
      data: {
        cabCategoryPriceImage: restored,
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


 const findAllDeletedPriceImage = async () => {
  try {
    const result = await CabCategoryPriceImage.find({
         status: 'Inactive'         
    });

    if (!result || result.length === 0) {
      throw new Error('No soft-deleted cab category price/image data found');
    }

    return {
      message: 'Soft deleted cab image and price fetched successfully',
      data: {
        cabCategoryPriceImage: result,
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unexpected error occurred');
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
