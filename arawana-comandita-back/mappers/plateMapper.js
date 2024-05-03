export const plateMapper = (object, option) => {

  const {
    name,
    plateGroup,
    initQuantity,
    price,
    description,
    image,
    uid,
    id,
    expireAt,
  } = object;

  switch (option) {
    case 'response':
      return {
        id,
        name,
        price,
        plateGroup: plateGroupMapper(plateGroup),
        uid,
        description,
        image,
      };

    default:
      return {
        name,
        price,
        description,
        plateGroup: plateGroupMapper(plateGroup) ?? null,
        initQuantity: initQuantity ?? 0,
        uid,
        image,
        expireAt,
      };
  }
};

const plateGroupMapper = (object) => {
  try {
    return {
      id: object.id,
      name: object.name,
    };
  } catch (error) {
    return null;
  }
};
