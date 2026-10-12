import { Router } from 'express';
import addressController from '../controllers/addressController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createAddressSchema, updateAddressSchema } from '../validators/addressValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', addressController.getAddresses);
router.post('/', validate(createAddressSchema), addressController.createAddress);
router.patch('/:id', validate(updateAddressSchema), addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;
