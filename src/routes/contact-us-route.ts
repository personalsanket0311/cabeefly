import express from 'express';
import * as ContactUsController from '../controllers/contact-us-controller';

const router = express.Router();

router.post('/', ContactUsController.createContactUsController); //creat contact
router.get('/', ContactUsController.getAllContactUsController); //get all contact
router.get('/get-by-id/:id', ContactUsController.getContactUsByIdController); //get by id contact
router.put('/update-by-id/:id', ContactUsController.updateContactUsController); //update by id contact
router.delete('/delete/:id', ContactUsController.DeleteContactUsController); //delete by id
router.get('/get-all-deleted', ContactUsController.getAllDeletedContactUsController); //get deleted contact
router.post('/multiple-delete', ContactUsController.multipleDeleteContactUsController); //multiple delete contact
router.put('/restore/:id', ContactUsController.restoreContactUsController); //resotre delete by id

export default router;
