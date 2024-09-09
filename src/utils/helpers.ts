// utils/stringHelpers.ts
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ""; // Handle cases where the string is empty or undefined
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
