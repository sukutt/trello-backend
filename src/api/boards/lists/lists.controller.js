const List = require('models/list');
const Card = require('models/card');

exports.createList = async (ctx) => {
    const { title, boardId } = ctx.request.body;

    let lastList = null;
    try {
        lastList = await List.getLastOrderList(boardId);
    } catch (e) {
        ctx.throw(500, e);
    }

    const maxOrder = lastList.length > 0 ? lastList[0].order + 1 : 1;

    let newList = null;
    try {
        newList = await List.createList({
            board_id: boardId,
            title,
            order: maxOrder
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

    let lastCard = null;
    try {
        lastCard = await Card.getLastOrderCard(value);
    } catch (e) {
        ctx.throw(500, e);
    }

    const maxOrder = lastCard.length > 0 ? lastCard[0].order + 1 : 1;

    let newCard = null;
    try {
        newCard = await Card.createCard({
            list_id: value,
            content,
            order: maxOrder
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

    // 리스트 재정렬
    if (key === 'list') {
        for(let i = 0; i < list.length; ++i) {
            await List.reorder({
                order: i + 1,
                listId: list[i]
            });
        }
    } else {
        for(let i = 0; i < list.length; ++i) {
            await Card.reorder({
                order: i + 1,
                cardId: list[i],
                listId: value
            });
        }
    }

    ctx.status = 200;
};