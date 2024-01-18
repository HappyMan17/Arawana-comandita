export const plateMapper = (object) => {
  const { name, price, description, image } = object;

  return {
    name,
    price,
    description,
    image,
  };
};
