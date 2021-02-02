require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = async (id) => {
  const payload = {
    id,
  };

  const option = {
    expiresIn: process.env.JWT_expiresIn,
    issuer: process.env.JWT_Issuer,
    subject: process.env.JWT_Subject,
  };

  return jwt.sign(payload, JWT_SECRET, option);
};

exports.verifyToken = async (token) => {
  return jwt.verify(token, JWT_SECRET);
}