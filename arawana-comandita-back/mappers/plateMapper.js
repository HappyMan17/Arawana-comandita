export const plateMapper = (object) => {
  const { name, price, description } = object;

  return {
    name,
    price,
    description,
  };
};
