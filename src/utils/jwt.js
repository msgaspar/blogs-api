const jwt = require('jsonwebtoken');

const generateToken = (email) => {
  const jwtSecret = 'EF8D6AC8B1F8129D7770F94D71749D85';
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email }, jwtSecret, jwtConfig);
  return token;
};

module.exports = { generateToken };