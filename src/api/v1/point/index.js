const point = require('express').Router();
const pointCtrl = require('./point.Ctrl');
const auth = require('../../../middleware/auth');

point.get('/', auth, pointCtrl.getMyScoreByType);
point.get('/all', auth, pointCtrl.getMyScore);
point.get('/rank', pointCtrl.getUserRankingByType);

module.exports = point;