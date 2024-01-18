/*
  Auth routes
  host + /api/table/
*/

import express from 'express';
import { check } from 'express-validator';
import { JWTValidation, validateFields } from '../middlewares/index.js';
import { createTable, deletTable, getTables, updateTable } from '../controllers/table.js';

const router = express.Router();

// get table
router.get('/:id', JWTValidation, getTables);

// create table
router.post('/create',
[ // middleware
  check('name', 'Table name is required').not().isEmpty(),
  check('comment', 'Comment is required').not().isEmpty(),
  check('uid', 'User id is required').not().isEmpty(),
  check('plates', 'Plates is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], createTable);

// update table
router.put('/update',
[ // middleware
  check('id', 'Table id is required').not().isEmpty(),
  check('name', 'Table name is required').not().isEmpty(),
  check('comment', 'Comment is required').not().isEmpty(),
  check('uid', 'User id is required').not().isEmpty(),
  check('plates', 'Plates is required').not().isEmpty(),
  validateFields,
  JWTValidation,
], updateTable);

// delete table
router.delete('/delete/:id', JWTValidation, deletTable);

export default router;
