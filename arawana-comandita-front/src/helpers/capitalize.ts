export const capitalizeFirstLetter = (string: string): string => {
  return string.replace(/\b\w/g, function(match) {
    return match.toUpperCase();
  });
};
