const Joi = require('@hapi/joi');
const Account = require('models/account');
const Board = require('models/board');

exports.getBoards = async (ctx) => {
    const { value } = ctx.params;
    let account = null;

    try {
        account = await Account.findByEmail(value);
    } catch(e) {
        ctx.throw(500, e);
    }
    
    let boards = null;
    try {
        boards = await Board.findByAccountId(account._id);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = boards;
};

exports.createBoard = async (ctx) => {
    const { email, title } = ctx.request.body;
    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch(e) {
        ctx.throw(500, e);
    }

    let newBoard = null;
    try {
        newBoard = await Board.createBoard({
            account_id: account._id,
            title,
            thumbnail: '',
            favorite: false
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newBoard;
};