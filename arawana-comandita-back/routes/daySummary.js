/*
  Auth routes
  host + /api/day_summary/
*/

import express from 'express';
import { JWTValidation } from '../middlewares/index.js';
import {
  addToDaySummary,
  getCurrentSummary,
  getSummary,
  getUserSummary,
} from '../controllers/daySummary.js';

const router = express.Router();

//? get user summary need filter in body
router.post('/all', JWTValidation, getUserSummary);

// get current day summary
router.get('/current', JWTValidation, getCurrentSummary);

// add table day summary
// req.body.tables
router.post('/add', JWTValidation, addToDaySummary);

// delete summary
// router.delete('/delete/:id', JWTValidation, deleteSummary);

// get summary
router.get('/:id', JWTValidation, getSummary);

export default router;
