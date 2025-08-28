import ContactUsModel, { IContactUs } from '../../models/mongo/contact-us-model';

// Create ContactUs
const createContactUs = async (data: Partial<IContactUs>) => {
  try {
    const contact = new ContactUsModel(data);
    const result = await contact.save();
    return {
      error: false,
      message: 'Contact Us created successfully!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
};

//  Get All Active ContactUs
const getAllContactUs = async () => {
  try {
    const result = await ContactUsModel.find({ status: 'Active' });
    console.log(result)
    return {
      error: false,
      message: 'Active Contact Us list fetched!',
      data: result,
    };
  } catch (error: unknown) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
};

//  Get ContactUs by ID
const getContactUsById = async (_id: string) => {
  try {
    const result = await ContactUsModel.findById(_id);
    if (!result) {
      return { error: true, message: 'Contact Us not found!' };
    }
    return {
      error: false,
      message: 'Contact Us fetched by ID!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

//  Update ContactUs by ID
const updateContactUs = async (_id: string, data: Partial<IContactUs>) => {
  try {
    const result = await ContactUsModel.findByIdAndUpdate(_id, data, { new: true });
    if (!result) {
      return { error: true, message: 'ContactUs not found!' };
    }
    return {
      error: false,
      message: 'Contact Us updated successfully!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

//  Delete set status Inactive
const deleteContactUs = async (_id: string) => {
  try {
    const result = await ContactUsModel.findByIdAndUpdate(
      _id,
      { status: 'Inactive' },
      { new: true }
    );
    if (!result) {
      return { error: true, message: 'Contact Us not found!' };
    }
    return {
      error: false,
      message: 'Contact Us Deleted successfully!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

//  Restore Deleted ContactUs Set status Active
const restoreContactUs = async (_id: string) => {
  try {
    const result = await ContactUsModel.findByIdAndUpdate(
      _id,
      { status: 'Active' },
      { new: true }
    );
    if (!result) {
      return { error: true, message: 'Contact Us not found or not inactive!' };
    }
    return {
      error: false,
      message: 'Contact Us restored successfully!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

//  Multi Delete ContactUs
const multipleDeleteContactUs = async (_ids: string[]) => {
  try {
    const result = await ContactUsModel.updateMany(
      { _id: { $in: _ids } },
      { $set: { status: 'Inactive' } }
    );
    return {
      error: false,
      message: 'Multiple Contact Us Deleted!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

//  Get All Deleted ContactUs
const getAllDeletedContactUs = async () => {
  try {
    const result = await ContactUsModel.find({ status: 'Inactive' });
    console.log(result)
    return {
      error: false,
      message: 'Deleted Contact Us list fetched!',
      data: result,
    };
  } catch (error: unknown) {
    return { error: true, message: (error as Error).message };
  }
};

export {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs, 
  restoreContactUs,
  multipleDeleteContactUs,
  getAllDeletedContactUs,
};
