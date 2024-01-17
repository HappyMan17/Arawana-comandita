import { envs } from "./env.js";


const constants = {
  ACCEPTED_ORIGINS: [
    `http://localhost:${envs.PORT}`,
    'http://localhost:5173' // front origin
  ]
};

export default constants;
