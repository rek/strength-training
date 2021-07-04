export const isValidBodyWeight = (weight: number) => {
  let result = true;

  if (!weight) {
    result = false;
  }

  if (weight === -1) {
    result = false;
  }

  return result;
};
