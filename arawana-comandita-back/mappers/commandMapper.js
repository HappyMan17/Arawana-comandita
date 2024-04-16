export const commandMapper = (object) => {
  const {
    table_id,
    initCommand,
    endCommand,
    platesServed,
    plates,
  } = object;

  if (table_id === undefined) return null;
  if (plates === undefined) return null;

  return {
    table_id,
    initCommand: initCommand ?? new Date(),
    endCommand,
    platesServed,
    plates: plates ?? [],
  };
};
