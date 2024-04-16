/*
  Auth routes
  host + /api/cvs/
*/

import express from 'express';
// import { JWTValidation } from '../middlewares';
import { getCvs } from '../controllers/cvs.js';

const router = express.Router();

// router.get('/', JWTValidation, );
router.get('/', getCvs);

export default router;
