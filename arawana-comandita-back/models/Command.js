import { Schema, model } from "mongoose";
import { PlateSchemaId } from "./PlateModel.js";

export const CommandSchema = Schema({
  table_id: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  initCommand: {
    type: Date,
  },
  endCommand: {
    type: Date,
  },
  platesServed: {
    type: Boolean,
  },
  plates: [PlateSchemaId],
});

export const CommandModel = model('Command', CommandSchema);
