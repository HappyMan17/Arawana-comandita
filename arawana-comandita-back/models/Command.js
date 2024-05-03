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
  expireAt: {
    type: Date,
    expires: 0,
  },
});

CommandSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are included when converting to JSON
CommandSchema.set('toJSON', {
  virtuals: true
});

export const CommandModel = model('Command', CommandSchema);
