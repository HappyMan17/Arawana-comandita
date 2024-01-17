import { response } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/env.js';

export const JWTValidation = (req, res = response, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(403).json({ message: 'Token not provided' });
  }
  if (!authorization.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token not provided' });
  }
  
  const token = authorization.split(' ').at(1) ?? '';

  try {
    const { uid, name } = jwt.verify(
      token,
      envs.SECRET_JWT_SEED,
    );
    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(403).json({ message: 'Not valid token' });
  }
  
  next();
};
