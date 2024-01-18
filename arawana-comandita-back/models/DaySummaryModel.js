import { Schema, model } from "mongoose";
import { TableSchema } from "./TableModel.js";

const DaySummarySchema = Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  tables: [TableSchema],
});

export const DaySummaryModel = model('DaySummary', DaySummarySchema);
