const score = require('express').Router();
const scoreCtrl = require('./score.Ctrl');
const auth = require('../../../middleware/auth');

score.get('/', auth, scoreCtrl.getMyScoreByType);
score.get('/all', auth, scoreCtrl.getMyScore);

module.exports = score;