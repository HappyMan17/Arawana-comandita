export const plateMapper = (object) => {
  const { name, price, description, image, uid } = object;

  return {
    name,
    price,
    description,
    uid,
    image,
  };
};
