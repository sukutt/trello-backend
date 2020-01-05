const Router = require('koa-router');

const lists = new Router();

const listCtrl = require('./lists.controller');

lists.post('/', listCtrl.createList);
lists.patch('/', listCtrl.updateList);

module.exports = lists;