const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const boards = require('./boards');

api.use('/auth', auth.routes());
api.use('/boards', boards.routes());

module.exports = api;