const Router = require('koa-router');

const boards = new Router();
const boardsCtrl = require('./boards.controller');

boards.get('/:value', boardsCtrl.getBoards);
boards.post('/', boardsCtrl.createBoard);

module.exports = boards;