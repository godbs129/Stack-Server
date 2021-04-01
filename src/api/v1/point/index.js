const point = require('express').Router();
const pointCtrl = require('./point.Ctrl');
const auth = require('../../../middleware/auth');

point.post('/', auth, pointCtrl.givePoint);
point.get('/', auth, pointCtrl.getMyScoreByType);
point.get('/all', auth, pointCtrl.getMyScore);

module.exports = point;