import { Plate } from "../types";

export const deepCopy = (object: any) => {
  if (object) {
    return JSON.parse(JSON.stringify(object));
  }
  return object;
};

/**
 * Gets this format "YYYY-MM-DD" from Date object
 * @param date Date
 * @returns "YYYY-MM-DD"
 */
export const getDateFormat = (date: Date): string => {
  // console.log(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  // Create the desired format "YYYY-MM-DD"
  return `${year}-${month}-${day}`;
};

type Operation = '+' | '-';

export const getDate = (days: number = 5, operation: Operation = '-') => {
  const date = new Date();
  if (operation === '+') {
    date.setDate(date.getDate() + days);
  } else {
    date.setDate(date.getDate() - days);
  }
  return date;
};

export const duplicateValuesSum = (
  currentPlates: Plate[],
  newPlates: Plate[]
) => {
  const currentPlatesIds = new Set(currentPlates.map(plate => plate.id));
  const updatedPlates: Plate[] = [];

  currentPlates.forEach(currentPlate => {
    const matchingPlate = newPlates.find(plate => plate.id === currentPlate.id);

    if (matchingPlate) {
      const updatedPlate = {
        ...currentPlate,
        quantity: (currentPlate.quantity || 0) + (matchingPlate.quantity || 0),
      };
      updatedPlates.push(updatedPlate);
    } else {
      updatedPlates.push(currentPlate);
    }
  });

  // Add new plates that are not present in the current plates
  const newPlatesToAdd = newPlates.filter(plate =>
    !currentPlatesIds.has(plate.id),
  );
  const resultPlates = updatedPlates.concat(newPlatesToAdd);

  // You may want to return or use resultPlates here
  return resultPlates;
};
