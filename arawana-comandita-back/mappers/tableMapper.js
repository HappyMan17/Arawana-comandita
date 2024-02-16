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
    command,
  } = object;

  // plates list and price key
  const total = getTotal(plates, 'price');

  let finalCommand = command ?? [];
  if (command.length === 0) {
    finalCommand = plates;
  }

  return {
    name,
    comment,
    total,
    uid,
    initCommand,
    platesServed,
    hasPaidService,
    plates,
    command: finalCommand,
  };
};
