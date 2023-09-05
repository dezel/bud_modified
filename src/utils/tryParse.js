export const tryParse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
