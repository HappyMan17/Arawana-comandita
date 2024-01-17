export const userMapper = (object) => {
  const { name, email, password } = object;
  
  return {
    name,
    email,
    password,
  };
};
