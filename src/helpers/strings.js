export const titleCase = words =>
  words
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");
