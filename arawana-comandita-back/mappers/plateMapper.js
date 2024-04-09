export const plateMapper = (object, option) => {

  const {
    name,
    plateGroup,
    initQuantity,
    price,
    description,
    image,
    uid,
    id
  } = object;

  switch (option) {
    case 'response':
      return {
        id,
        name,
        price,
        plateGroup,
        uid,
        description,
        image,
      };

    default:
      return {
        name,
        price,
        description,
        plateGroup,
        initQuantity: initQuantity ?? 0,
        uid,
        image,
      };
  }
};
