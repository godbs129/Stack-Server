require('dotenv').config();

exports.MYSQL = {
  DATABASE: process.env.DATABASE,
  USERNAME: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PW,
  HOST: process.env.DATABASE_HOST,
  Dialect: process.env.DIALECT,
  PORT: 3306,
}