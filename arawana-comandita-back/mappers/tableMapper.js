import { getTotal } from "../helpers/getTotal.js";

export const tableMapper = (object) => {
  const {
    name,
    comment,
    uid,
    plates,
    command,
  } = object;

  // plates list and price key
  const total = getTotal(plates, 'price');

  let finalCommand = command ?? [];
  if (command?.length === 0) {
    finalCommand = plates;
  }

  return {
    name,
    comment,
    total,
    uid,
    initCommand: object.initCommand ?? null,
    platesServed: object.platesServed ?? null,
    hasPaidService: object.hasPaidService ?? false,
    plates,
    command: finalCommand,
  };
};
