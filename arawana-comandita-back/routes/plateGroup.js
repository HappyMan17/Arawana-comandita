/*
  Auth routes
  host + /api/plate_group/
*/

import express from 'express';
import { check } from 'express-validator';
import { JWTValidation, validateFields } from '../middlewares/index.js';
import {
  createGroup,
  deletPlateGroup,
  getPlateGroups,
} from '../controllers/index.js';

const router = express.Router();

// create plate group
router.post('/create',
[ // middleware
  check('name', 'plate name is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], createGroup);

// delete plate group
router.delete('/delete/:id', JWTValidation, deletPlateGroup);

// get plate all groups
router.get('/all', JWTValidation, getPlateGroups);

export default router;
