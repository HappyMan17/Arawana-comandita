import { Schema, model } from "mongoose";
import { PlateSchemaId } from "./PlateModel.js";

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
  uid: {
    type: String,
    require: true,
  },
  plates: [PlateSchemaId],
});

export const TableModel = model('Table', TableSchema);
