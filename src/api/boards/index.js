const Router = require('koa-router');

const boards = new Router();
const boardsCtrl = require('./boards.controller');

// auth.get('/exists/:key(email|userId)/:value', authCtrl.exists);
boards.get('/list/:value', boardsCtrl.getBoards);

module.exports = boards;