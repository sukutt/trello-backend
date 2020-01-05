const Router = require('koa-router');

const cards = new Router();

const cardCtrl = require('./cards.controller');

cards.post('/', cardCtrl.createCard);
cards.patch('/', cardCtrl.updateCard);

module.exports = cards;