import express from 'express';
import api from './api/index.js';

var router = express.Router();

router.use('/api', api);

export default router;
