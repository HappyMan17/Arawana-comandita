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
