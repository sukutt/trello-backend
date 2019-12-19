const Router = require('koa-router');

const boards = new Router();
const boardsCtrl = require('./boards.controller');

boards.get('/list/:value', boardsCtrl.getBoards);
boards.post('/create', boardsCtrl.createBoard);

module.exports = boards;