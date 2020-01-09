const Router = require('koa-router');

const lists = new Router();

const listCtrl = require('./lists.controller');

lists.post('/:value', listCtrl.createCard);
lists.post('/', listCtrl.createList);
lists.patch('/', listCtrl.updateList);
lists.patch('/:key(list|card)/:value', listCtrl.reorder);

module.exports = lists;