const Joi = require('@hapi/joi');
const Account = require('models/account');
const Board = require('models/board');
const BoardImage = require('models/boardImage');

exports.getBoards = async (ctx) => {
    const { value } = ctx.params;
    let account = null;

    try {
        account = await Account.findByEmail(value);
    } catch(e) {
        ctx.throw(500, e);
    }

    let boards = null;
    if(account) {
        try {
            boards = await Board.findByAccountId(account._id);
        } catch (e) {
            ctx.throw(500, e);
        }
    }

    ctx.body = boards || [];
};

exports.getBoardImages = async (ctx) => {
    let boardImages = null;
    try {
        boardImages = await BoardImage.getBoardImages();
    } catch (e) {
        ctx.throw(500, e);
    }

    const backgroundColors = [{
        backgroundColor: 'rgb(0, 121, 191)'
    }, {
        backgroundColor: 'rgb(210, 144, 52)'
    }, {
        backgroundColor: 'rgb(81, 152, 57)'
    }, {
        backgroundColor: 'rgb(176, 70, 50)'
    }, {
        backgroundColor: 'rgb(137, 96, 158)'
    }, {
        backgroundColor: 'rgb(205, 90, 145)'
    }];

    ctx.body = boardImages.concat(backgroundColors) || [];
};

exports.createBoard = async (ctx) => {
    const { email, title, thumbnail } = ctx.request.body;
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
            thumbnail,
            favorite: false
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newBoard;
};

exports.updateBoard = async (ctx) => {
    let updatedBoard = null;
    try {
        updatedBoard = await Board.updateBoard(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedBoard._id;
};