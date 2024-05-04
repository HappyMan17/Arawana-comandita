import express from "express";
import { envs } from './config/env.js';
import {
  authRouter,
  daySummaryRouter,
  plateGroupRouter,
  plateRouter,
  tableRouter,
  cvsRouter,
  commandRouter,
} from './routes/index.js';
import cors from 'cors';
import { dbConection } from "./database/config.js";
import constants from "./config/constants.js";

const app  = express();
const PORT = envs.PORT;

// db connection
dbConection();

/**
 * middlewares
 */
// public directory
app.use(express.static('public')); // app.use(express.static(path.join(__dirname,)));
// body parser
app.use(express.json());
// cors
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (constants.ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  }
}));

// Rutes
app.get("/api", (req, res) => res.send("Server is running!"));
app.use('/api/auth', authRouter);
app.use('/api/plate', plateRouter);
app.use('/api/plate_group', plateGroupRouter);
app.use('/api/table', tableRouter);
app.use('/api/day_summary', daySummaryRouter);
app.use('/api/command', commandRouter);
app.use('/api/cvs', cvsRouter);

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
