const auth = require('express').Router();
const authCtrl = require('./auth.Ctrl');

auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.register);

module.exports = auth;