export const tableMapper = (object) => {
  const {
    name,
    total,
    comment,
    uid,
    plates,
  } = object;

  return {
    name,
    total,
    comment,
    uid,
    plates,
  };
};
