const board = require('express').Router();
const boardCtrl = require('./board.Ctrl');
const auth = require('../../../middleware/auth');

board.get('/', boardCtrl.readBoard);
board.get('/my', auth, boardCtrl.readMyBoard);
board.post('/', auth, boardCtrl.createBoard);
board.put('/:idx', auth, boardCtrl.modifyBoard);
board.delete('/:idx', auth, boardCtrl.deleteBoard);

module.exports = board;