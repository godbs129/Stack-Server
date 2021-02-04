const v1 = require('express').Router();

v1.use('/auth', require('./auth'));
v1.use('/board', require('./board'));

module.exports = v1;