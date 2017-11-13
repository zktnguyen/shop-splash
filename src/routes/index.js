import express from 'express';
import bookController from '../controllers/bookController';
import imageController from '../controllers/imageController';

const router = express.Router();

// book routes
router.post('/books', bookController.post);
router.get('/books', bookController.getAll);
router.delete('/books/:_id', bookController.remove);
router.put('/books/:id', bookController.update);

// image routes
router.get('/images', imageController.get);

export default router;
