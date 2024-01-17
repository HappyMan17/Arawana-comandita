import jwt from 'jsonwebtoken';
import { envs } from '../config/env.js';

export const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    // payload, seed, callback
    jwt.sign( payload,  envs.SECRET_JWT_SEED, {
      expiresIn: '2h',
    }, (err, token) => {

      if (err) {
        console.log(err);
        reject('JWT not generated');
      }

      resolve(token);
    
    });

  });

};
