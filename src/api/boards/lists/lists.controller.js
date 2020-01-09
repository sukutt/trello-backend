const List = require('models/list');
const Card = require('models/card');

exports.createList = async (ctx) => {
    const { title, boardId } = ctx.request.body;

    let newList = null;
    try {
        newList = await List.createList({
            board_id: boardId,
            title,
            order: 3
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newList;
};

exports.createCard = async (ctx) => {
    // 리스트 ID
    const { value } = ctx.params;
    const { content } = ctx.request.body;

    let newCard = null;
    try {
        newCard = await Card.createCard({
            list_id: value,
            content,
            order: 3
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newCard;
};

exports.updateList = async (ctx) => {
    let updatedList = null;

    try {
        updatedList = await List.updateList(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedList._id;
};

exports.reorder = async (ctx) => {
    const { key, value } = ctx.params;
    const { list } = ctx.request.body;

    console.log(key);
    console.log(value);
    console.log(list);

    ctx.body = list;
};