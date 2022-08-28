import express from 'express';
import userRoutes from './userRoutes.js';
import favoriteRoutes from './favoritesRoutes.js';

var router = express.Router();

router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);

export default router;
