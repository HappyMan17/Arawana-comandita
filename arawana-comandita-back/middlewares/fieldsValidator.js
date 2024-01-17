import { response } from 'express';
import { validationResult } from "express-validator";

export const validateFields = (req, res = response, next) => {
  // validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: true,
      error: errors.mapped(),
    });
  }
  next();
};
