export const toPascalCase = (str) => {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|-|_)(\w)/g, (match, p1) => p1.toUpperCase());
};
