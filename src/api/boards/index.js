const Router = require('koa-router');

const boards = new Router();

const boardsCtrl = require('./boards.controller');

boards.get('/images', boardsCtrl.getBoardImages);
boards.post('/', boardsCtrl.createBoard);
boards.patch('/', boardsCtrl.updateBoard);
boards.get('/:value', boardsCtrl.getBoards);

module.exports = boards;