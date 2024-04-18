import { envs } from "./env.js";
import path from 'path';
import process from 'process';

const constants = {
  ACCEPTED_ORIGINS: [
    `http://localhost:${envs.PORT}`,
    'http://localhost:5173', // front origin
    'http://localhost:8080', // front origin
  ],
  BOOKNAME: './public/files/test.xlsx',
  ABSOLUTE_FILE_PATH: path.join(process.cwd(), './public/files/test.xlsx'),
};

export default constants;
