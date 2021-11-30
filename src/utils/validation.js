const { AppError } = require('../errors/AppError');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email === undefined) {
    throw new AppError(400, '"email" is required');
  }
  if (email === '') {
    throw new AppError(400, '"email" is not allowed to be empty');
  }
  if (!regex.test(email)) {
    throw new AppError(400, '"email" must be a valid email');
  }
};

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    throw new AppError(400, '"displayName" length must be at least 8 characters long');
  }
};

const validatePassword = (password) => {
  if (password === undefined) {
    throw new AppError(400, '"password" is required');
  }
  if (password === '') {
    throw new AppError(400, '"password" is not allowed to be empty');
  }
  if (password.length < 6) {
    throw new AppError(400, '"password" length must be 6 characters long');
  }
};

const validateUpdatePostInputs = ({ title, content, categoryIds }) => {
  if (!title) throw new AppError(400, '"title" is required');
  if (!content) throw new AppError(400, '"content" is required');
  if (categoryIds) throw new AppError(400, 'Categories cannot be edited');
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUpdatePostInputs,
};
