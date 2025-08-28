import express from 'express';
import CabCategoryPriceImageController from '../controllers/cab-category-price-image-controller';
import uploadCabImage from '../middlewares/cab-category-image-price-multer';

const router = express.Router();

router.post('/',uploadCabImage.single('cabImage'),CabCategoryPriceImageController.createPriceImage);

router.get('/', CabCategoryPriceImageController.findAllPriceImage);
router.get('/:priceImageId', CabCategoryPriceImageController.findPriceImageById);
router.put('/update/:priceImageId',uploadCabImage.single('cabImage'),CabCategoryPriceImageController.updatePriceImageById );
router.delete('/delete/:priceImageId', CabCategoryPriceImageController.deletePriceImageById);
router.put('/restore/:priceImageId', CabCategoryPriceImageController.restorePriceImageById);
router.get('/deleted', CabCategoryPriceImageController.findAllDeletedPriceImage);

export default router;
