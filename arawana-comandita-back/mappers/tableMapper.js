import { getTotal } from "../helpers/getTotal";

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
    plates,
  };
};
