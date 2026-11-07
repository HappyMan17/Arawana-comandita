import { Plate } from "../types";

export const normalizePlate = (plate: any): Plate => {
  return {
    ...plate,
    plateGroup: plate.plateGroup ?? null,
    image: plate.image ?? null,
    price: plate.price ?? 0,
    description: plate.description ?? "",
    name: plate.name ?? "",
  };
};
