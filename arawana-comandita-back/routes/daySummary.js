/*
  Auth routes
  host + /api/day_summary/
*/

import express from 'express';
import { check } from 'express-validator';
import { JWTValidation, validateFields } from '../middlewares/index.js';

const router = express.Router();

// get summary
router.get('/:id', JWTValidation, () => null);

// create summary
router.post('/create',
[ // middleware
  check('date', 'Summary date is required').not().isEmpty(),
  check('total', 'total price is required').not().isEmpty(),
  check('comment', 'A comment is required').not().isEmpty(),
  check('uid', 'User id is required').not().isEmpty(),
  check('tables', 'Tables are required').not().isEmpty(),
  validateFields,
  JWTValidation,
], () => null);

// update summary
router.put('/update',
[ // middleware
  check('date', 'Summary date is required').not().isEmpty(),
  check('total', 'total price is required').not().isEmpty(),
  check('comment', 'A comment is required').not().isEmpty(),
  check('uid', 'User id is required').not().isEmpty(),
  check('tables', 'Tables are required').not().isEmpty(),
  validateFields,
  JWTValidation,
], () => null);

// delete summary
router.delete('/delete/:id', JWTValidation, () => null);

export default router;
