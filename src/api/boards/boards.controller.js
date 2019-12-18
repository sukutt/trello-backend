const Joi = require('@hapi/joi');
const Account = require('models/account');
const Board = require('models/Board');

exports.getBoards = async (ctx) => {
    const { value } = ctx.params;
    let account = null;

    try {
        account = await Account.findByEmail(value);
    } catch(e) {
        ctx.throw(500, e);
    }

    console.log(account);
    
    let boards = null;
    try {
        boards = await Board.findByAccountId(account._id);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = boards;
};