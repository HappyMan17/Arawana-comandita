import { getTotal } from "../helpers/getTotal.js";

export const tableMapper = (object) => {
  const {
    name,
    comment,
    uid,
    plates,
    initCommand,
    platesServed,
    hasPaidService,
  } = object;

  // plates list and price key
  const total = getTotal(plates, 'price');

  return {
    name,
    comment,
    total,
    uid,
    initCommand,
    platesServed,
    hasPaidService,
    plates,
  };
};
