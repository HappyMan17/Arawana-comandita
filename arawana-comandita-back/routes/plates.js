import express from 'express';
import { check } from 'express-validator';
import { JWTValidation, validateFields } from '../middlewares';

const router = express.Router();

// get plate
router.get('/:id', JWTValidation, () => null);

// create plate
router.post('/create',
[ // middleware
  check('name', 'plate name is required').not().isEmpty(),
  check('price', 'plate price is required').not().isEmpty(),
  check('description', 'password is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], () => null);

// update plate
router.put('/update',
[ // middleware
  check('name', 'plate name is required').not().isEmpty(),
  check('price', 'plate price is required').not().isEmpty(),
  check('description', 'password is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], () => null);

// delete plate
router.put('/delete/:id', JWTValidation, () => null);
