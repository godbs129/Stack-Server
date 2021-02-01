const Sequelize = require('sequelize');
const config = require('../config/db.json');

const sequelize = new Sequelize(
  config.database,
  config.dbUser,
  config.dbPw,
  {
    host: config.host,
    dialect: config.dialect,
    logging: (str) => {
    },
    timezone: '+09:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    port: config.port,
  },
);

const Userdb = require('./User');
const Baorddb = require('./board');

module.exports = {
  User: Userdb(sequelize, Sequelize),
  Board: Baorddb(sequelize, Sequelize),
}

sequelize.sync().then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.log(err.message);
}) 