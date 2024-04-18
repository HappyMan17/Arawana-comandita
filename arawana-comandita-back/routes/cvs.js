/*
  Auth routes
  host + /api/cvs/
*/

import express from 'express';
import { JWTValidation } from '../middlewares/jwtValidation.js';
import { createCvs, updateCvsFile, getSummaryFile } from '../controllers/cvs.js';

const router = express.Router();

router.get('/', JWTValidation, createCvs);

router.get('/update', JWTValidation, updateCvsFile);

router.get('/file', getSummaryFile);

export default router;
