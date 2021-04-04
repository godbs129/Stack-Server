const Sequelize = require('sequelize');
const { MYSQL } = require('../config/index');

const sequelize = new Sequelize(
  MYSQL.DATABASE,
  MYSQL.USERNAME,
  MYSQL.PASSWORD,
  {
    host: MYSQL.HOST,
    dialect: MYSQL.Dialect,
    logging: (str) => {
    },
    timezone: '+09:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    port: MYSQL.PORT,
  },
);

const Userdb = require('./User');
const Boarddb = require('./Board');
const Pointdb = require('./Point');
const Authdb = require('./Auth');

module.exports = {
  User: Userdb(sequelize, Sequelize),
  Board: Boarddb(sequelize, Sequelize),
  Point: Pointdb(sequelize, Sequelize),
  Auth: Authdb(sequelize, Sequelize),
}

sequelize.sync().then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.log(err.message);
})