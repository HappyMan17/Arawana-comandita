export const plateMapper = (object) => {
  const { name, plateGroup, initQuantity, price, description, image, uid } = object;

  return {
    name,
    price,
    description,
    plateGroup,
    initQuantity: initQuantity ?? 0,
    uid,
    image,
  };
};
