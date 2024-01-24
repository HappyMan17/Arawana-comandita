import { Schema, model } from "mongoose";

const PlateGroupSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
});

export const PlateGroupModel = model('PlateGroup', PlateGroupSchema);
