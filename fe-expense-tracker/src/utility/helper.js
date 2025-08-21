export const validateEmail = (email) => {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/;
  return regex.test(email);
};
