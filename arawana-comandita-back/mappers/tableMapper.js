import { getTotal } from "../helpers/getTotal.js";

export const tableMapper = (object) => {
  const {
    name,
    comment,
    uid,
    plates,
  } = object;

  // plates list and price key
  const total = getTotal(plates, 'price');

  return {
    name,
    comment,
    total,
    uid,
    initCommand: object.initCommand ?? null,
    platesServed: object.platesServed ?? null,
    hasPaidService: object.hasPaidService ?? false,
    plates,
  };
};
