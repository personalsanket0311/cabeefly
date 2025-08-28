import { OutstationModel, IOutstation } from '../../models/mongo/outstation-model';

// Create out station (Outstation Booking)
const createOutstation = async (data: Partial<IOutstation>) => {
  try {
    const outstation = new OutstationModel(data);
    const result = await outstation.save();
    return {
      error: false,
      message: 'Outstation booking created!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error creating outstation booking',
      data: (error as Error).message,
    };
  }
};

// Get all out stations (Active Outstation Bookings)
const getAllOutstations = async () => {
  try {
    const result = await OutstationModel.find({ status: 'Active' });
    return {
      error: false,
      message: 'Active outstation bookings fetched!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error fetching active outstation bookings',
      data: (error as Error).message,
    };
  }
};

// Get single cab-category by ID

const getOutstationById = async (id: string) => {
  try {
    const result = await OutstationModel.findById(id);
    if (!result) {
      return {
        error: true,
        message: 'Outstation booking not found',
        data: null,
      };
    }
    return {
      error: false,
      message: 'Outstation booking fetched!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error fetching outstation booking by ID',
      data: (error as Error).message,
    };
  }
};


// Update out station by ID
const updateOutstation = async (id: string, updateData: Partial<IOutstation>) => {
  try {
    const result = await OutstationModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      return {
        error: true,
        message: 'Update failed or booking not found',
        data: null,
      };
    }
    return {
      error: false,
      message: 'Outstation booking updated!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error updating outstation booking',
      data: (error as Error).message,
    };
  }
};

// Soft delete out station
const softDeleteOutstation = async (id: string) => {
  try {
    const result = await OutstationModel.findByIdAndUpdate(id, { status: 'Inactive' }, { new: true });
    if (!result) {
      return {
        error: true,
        message: 'Soft delete failed or booking not found',
        data: null,
      };
    }
    return {
      error: false,
      message: 'Outstation booking soft-deleted!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error performing soft delete',
      data: (error as Error).message,
    };
  }
};

// Restore soft-deleted out station
const restoreOutstation = async (id: string) => {
  try {
    const result = await OutstationModel.findByIdAndUpdate(id, { status: 'Active' }, { new: true });
    if (!result) {
      return {
        error: true,
        message: 'Restore failed or booking not found',
        data: null,
      };
    }
    return {
      error: false,
      message: 'Outstation booking restored!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error restoring outstation booking',
      data: (error as Error).message,
    };
  }
};

// Multi delete out stations (soft delete multiple by IDs)
const multiSoftDeleteOutstations = async (ids: string[]) => {
  try {
    const result = await OutstationModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status: 'Inactive' } }
    );
    return {
      error: false,
      message: 'Multiple bookings soft-deleted!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error in multi soft-delete',
      data: (error as Error).message,
    };
  }
};

// Get all soft-deleted out stations
const getAllDeletedOutstations = async () => {
  try {
    const result = await OutstationModel.find({ status: 'Inactive' });
    return {
      error: false,
      message: 'Soft-deleted outstation bookings fetched!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: 'Error fetching soft-deleted bookings',
      data: (error as Error).message,
    };
  }
};

export {
  createOutstation,
  getAllOutstations,
  getOutstationById,
  updateOutstation,
  softDeleteOutstation,
  restoreOutstation,
  multiSoftDeleteOutstations,
  getAllDeletedOutstations,
};
