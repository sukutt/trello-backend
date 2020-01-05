const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const boards = require('./boards');
const lists = require('./boards/lists');
const cards = require('./boards/lists/cards');

api.use('/auth', auth.routes());
api.use('/boards', boards.routes());
api.use('/lists', lists.routes());
api.use('/cards', cards.routes());

module.exports = api;