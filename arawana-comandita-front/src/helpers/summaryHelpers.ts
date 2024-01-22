export const deepCopy = (object: any) => {
  if (object) {
    return JSON.parse(JSON.stringify(object));
  }
  return object;
};
