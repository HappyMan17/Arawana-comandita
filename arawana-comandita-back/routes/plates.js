/*
  Auth routes
  host + /api/plate/
*/

import express from 'express';
import { check } from 'express-validator';
import { JWTValidation, validateFields } from '../middlewares/index.js';
import {
  createPlate,
  deletPlate,
  getPlate,
  updatePlate,
} from '../controllers/index.js';

const router = express.Router();

// get plate
router.get('/:id', JWTValidation, getPlate);

// create plate
router.post('/create',
[ // middleware
  check('name', 'plate name is required').not().isEmpty(),
  check('price', 'plate price is required').not().isEmpty(),
  check('description', 'password is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], createPlate);

// update plate
router.put('/update',
[ // middleware
  check('id', 'plate id is required').not().isEmpty(),
  check('name', 'plate name is required').not().isEmpty(),
  check('price', 'plate price is required').not().isEmpty(),
  check('description', 'password is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], updatePlate);

// delete plate
router.delete('/delete/:id', JWTValidation, deletPlate);

export default router;
