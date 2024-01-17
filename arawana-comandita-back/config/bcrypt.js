import pkg from 'bcryptjs';

const { compareSync, hashSync, genSaltSync } = pkg;

export const hashPassword = (password) => {
  // encrypting the password with a hash in one direction
    const salt = genSaltSync();
  return hashSync(password, salt);
};

export const comparePassword = (password, hashed) => {
  // Comparing encrypted password with the normal one
  return compareSync(password, hashed);
};
