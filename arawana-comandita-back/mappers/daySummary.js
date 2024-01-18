export const daySummaryMapper = (object) => {
  const {
    date,
    total,
    comment,
    uid,
    tables,
  } = object;

  return {
    date,
    total,
    comment,
    uid,
    tables,
  };
};
