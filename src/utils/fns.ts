export const convertToSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
