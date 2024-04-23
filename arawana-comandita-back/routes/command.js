/*
  Auth routes
  host + /api/command/
*/

import express from 'express';
import { JWTValidation, validateFields } from '../middlewares/index.js';
import {
  createCommand,
  deleteCommand,
  getCommands,
  getTableCommands,
  updateCommand,
} from '../controllers/command.js';
import { check } from 'express-validator';

const router = express.Router();


router.get('/all', JWTValidation, getCommands);

router.get('/:table_id', JWTValidation, getTableCommands);

router.post('/create',
[
  check('table_id', 'Table id is required').not().isEmpty(),
  check('platesServed', 'Plate served boolean is required').not().isEmpty(),
  validateFields,
  JWTValidation
], createCommand);

router.post('/update',
[
  check('table_id', 'Table id is required').not().isEmpty(),
  check('platesServed', 'Plate served boolean is required').not().isEmpty(),
  validateFields,
  JWTValidation
], updateCommand);

router.delete('/delete/:id', JWTValidation, deleteCommand);

export default router;
