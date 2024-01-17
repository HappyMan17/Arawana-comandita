import 'dotenv/config';
import pkg from 'env-var';
const { get } = pkg;

export const envs = {
  PORT: get('PORT').required().asInt(),
  DB_CN: get('DB_CN').required().asString(),
  SECRET_JWT_SEED: get('DB_CN').required().asString(),
};
