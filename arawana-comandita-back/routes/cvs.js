/*
  Auth routes
  host + /api/cvs/
*/

import express from 'express';
import { JWTValidation } from '../middlewares/jwtValidation.js';
import { createCvs } from '../controllers/cvs.js';

const router = express.Router();

router.get('/', JWTValidation, createCvs);

export default router;
