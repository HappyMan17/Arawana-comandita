function isValidDate(dateString: string) {
  // Try creating a new Date object with the given string
  if (dateString === '' || !dateString) return false;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }

  return date instanceof Date;
}

export const getInitTimer = (time: string): number | null => {
  if (isValidDate(time)) {
    // returns the difference between the time and the current time
    return new Date().getTime() - new Date(time).getTime() ;
  }
  return null;
};

export const normalizeTable = (table: any) => {
  return {
    ...table,
    commands: table.commands || [],
    plates: table.plates || [],
    total: table.total || 0,
    comments: table.comments || '',
    name: table.name || '',
  }
}
