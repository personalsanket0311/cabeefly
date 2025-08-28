import CabCategoryModel, { ICabCategory } from '../../models/mongo/cab-category-model';
import { IUser } from '../../types/user';

const createCabCategory = async (cabCategoryData: ICabCategory, userData: IUser) => {
  try {
    const cabCategory = new CabCategoryModel({
      cabCategory: cabCategoryData.cabCategory,
      seatingCapacity: cabCategoryData.seatingCapacity,
      createdBy: userData.userId,
      updatedBy: userData.userId
    });
    let newCabCategory = await cabCategory.save();
    return {
      error: false,
      message: 'Cab category created successfully',
      data: newCabCategory
    }
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
        message: "Cab category creation failed"
      }
    }
  }
};

const findAllCabCategories = async () => {
  try {
    const cabCategories = await CabCategoryModel.find({ status: 'Active' });

    if (!cabCategories || cabCategories.length === 0) {
      throw new Error('No active cab categories found');
    }

    return {
      error: false,
      message: 'Cab categories found successfully',
      data: cabCategories
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
        message: "Failed to fetch all cab categories"
      }
    }
  }
};


const findCabCategoryById = async (cabCategoryId: string) => {
  try {
    const cabCategory = await CabCategoryModel.findOne({
      _id: cabCategoryId,
      status: 'Active'
    });

    if (!cabCategory) {
      throw new Error('Cab category not found or already deleted');
    }

    return {
      error: false,
      message: 'Cab category found successfully',
      data: cabCategory
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
        message: "Failed to find cab category by id"
      }
    }
  }
};

const updateCabCategoryById = async (cabCategoryId: string, cabCategoryData: any, userData: IUser) => {
  try {
    const updatedCabCategory = await CabCategoryModel.findOneAndUpdate(
      {
        _id: cabCategoryId,
        status: 'Active'
      },
      {
        $set: {
          ...cabCategoryData,
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!updatedCabCategory) {
      throw new Error('Cab category not updated or not found');
    }
    return {
      error: false,
      message: 'Cab category updated successfully',
      data: updatedCabCategory
    }
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
        message: "Cab category update failed"
      }
    }
  }
};

const deleteCabCategoryById = async (cabCategoryId: string, userData: IUser) => {
  try {
    const deletedCabCategory = await CabCategoryModel.findOneAndUpdate(
      { _id: cabCategoryId, status: 'Active' },
      {
        $set: {
          status: 'Inactive',
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!deletedCabCategory) {
      throw new Error('Cab category not found or already deleted');
    }
    return {
      error: false,
      message: 'Cab category deleted successfully',
      data: deletedCabCategory
    }
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
        message: "Cab category delete failed"
      }
    }
  }
};

const deleteMultipleCabCategories = async (cabCategoryIds: string[], userData: IUser) => {
  try {
    const deletedCabCategories = await CabCategoryModel.updateMany(
      { _id: { $in: cabCategoryIds }, status: 'Active' },
      {
        $set: {
          status: 'Inactive',
          updatedBy: userData.userId
        }
      }
    );
    if (!deletedCabCategories) {
      throw new Error('No cab categories deleted or already deleted');
    }
    return {
      error: false,
      message: 'Cab categories deleted successfully',
      data: deletedCabCategories
    }
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
        message: "Cab categories delete failed"
      }
    }
  }
};
const findAllDeletedCabCategories = async () => {
  try {
    const deletedCabCategories = await CabCategoryModel.find({ status: 'Inactive' }).sort({ updatedAt: -1 });
    if (!deletedCabCategories) {
      throw new Error('No deleted cab categories found');
    }
    return {
      error: false,
      message: 'Deleted cab categories found successfully',
      data: deletedCabCategories
    }
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
        message: "Deleted cab categories found failed"
      }
    }
  }
};

const restoreCabCategoryById = async (cabCategoryId: string, userData: IUser) => {
  try {
    const restoredCabCategory = await CabCategoryModel.findOneAndUpdate(
      { _id: cabCategoryId, status: 'Inactive' },
      {
        $set: {
          status: 'Active',
          updatedBy: userData.userId
        }
      },
      { new: true }
    );
    if (!restoredCabCategory) {
      throw new Error('Cab category not restored');
    }
    return {
      error: false,
      message: 'Cab category restored successfully',
      data: restoredCabCategory
    }
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
        message: "Cab category restore failed"
      }
    }
  }
};


const CabCategoryRepository = {
  createCabCategory,
  findAllCabCategories,
  findAllDeletedCabCategories,
  findCabCategoryById,
  updateCabCategoryById,
  deleteCabCategoryById,
  deleteMultipleCabCategories,
  restoreCabCategoryById
};

export default CabCategoryRepository;
