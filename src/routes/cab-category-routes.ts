import express from 'express';
import CabCategoryController from '../controllers/cab-category-controller';

const router = express.Router();

router.post('/', CabCategoryController.createCabCategory);
router.get('/', CabCategoryController.findAllCabCategories);
router.get('/:id', CabCategoryController.deleteCabCategoryById);
router.put('/:id', CabCategoryController.updateCabCategoryById);
router.delete('/:id', CabCategoryController.deleteCabCategoryById);
router.put('/restore/:id', CabCategoryController.restoreCabCategory);
router.post('/multidelete', CabCategoryController.deleteMultipleCabCategories);
router.get('/deleted/all', CabCategoryController.findAllDeletedCabCategories);

export default router;
