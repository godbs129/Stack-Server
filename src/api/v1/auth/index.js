const auth = require('express').Router();
const authCtrl = require('./auth.Ctrl');

auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.register);
auth.get('/bonus', authCtrl.getUserRankBonusPoint);
auth.get('/minus', authCtrl.getUserRankMinusPoint);
auth.post('/password', authCtrl.emailAuthentication);

module.exports = auth;