const Router = require('koa-router');

const lists = new Router();

const listCtrl = require('./lists.controller');

lists.post('/:boardId/:listId', listCtrl.createCard);
lists.post('/', listCtrl.createList);
lists.patch('/:listId', listCtrl.updateList);
lists.patch('/:key(list|card)/:value', listCtrl.reorder);
lists.delete('/:listId', listCtrl.deleteList);
lists.delete('/:key(list|card)/:listId/:id', listCtrl.deleteCards);
lists.patch('/:listId/:id', listCtrl.editCard);

module.exports = lists;