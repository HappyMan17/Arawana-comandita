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

export const PlateGroupSchemaId = PlateGroupSchema.clone();
PlateGroupSchemaId.add({
  id: {
    type: String,
    require: true,
  }
});

PlateGroupSchemaId.set('_id', false);

export const PlateGroupModel = model('PlateGroup', PlateGroupSchema);
