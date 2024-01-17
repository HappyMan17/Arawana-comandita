/*
  Auth routes
  host + /api/auth/
*/

import express from "express";
import { createUser, loginUser, checkUserToken } from "../controllers/auth.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fieldsValidator.js";
import { JWTValidation } from "../middlewares/jwtValidation.js";

const authRouter = express.Router();

// create user
authRouter.post('/create', 
  [ // middleware
    check('name', 'userName is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password most have more that 5 characteres').isLength({ min: 8 }),
    validateFields,
  ],
  createUser);

// update user
authRouter.post('/login',
  [ // middleware
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password most have more that 5 characteres').isLength({ min: 8 }),
    validateFields,
  ],
  loginUser);

// renew user token
authRouter.get('/verify', JWTValidation, checkUserToken);

export default authRouter;
