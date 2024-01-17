import mongoose from "mongoose";
import { envs } from "../config/env.js";

export const dbConection = async () => {
  try {
    mongoose.connect(envs.DB_CN);
    // console.log({ms: 'db online'});

  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to db');
  
  }
};
