const v1 = require('express').Router();

v1.use('/auth', require('./auth'));
//router.use('/board', require('./board'));

module.exports = v1;