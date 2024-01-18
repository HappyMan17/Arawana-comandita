import { Schema, model } from "mongoose";
import { PlateSchema } from "./PlateModel";

export const TableSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  total: { 
    type: Number,
    require: true,
  },
  comment: { 
    type: String,
    require: true,
  },
  plates: [PlateSchema],
});

export const TableModel = model('Table', TableSchema);
