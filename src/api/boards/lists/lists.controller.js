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
    const { listId, boardId } = ctx.params;
    const { content } = ctx.request.body;

    let lastCard = null;
    try {
        lastCard = await Card.getLastOrderCard(listId);
    } catch (e) {
        ctx.throw(500, e);
    }

    const maxOrder = lastCard.length > 0 ? lastCard[0].order + 1 : 1;

    let newCard = null;
    try {
        newCard = await Card.createCard({
            board_id: boardId,
            list_id: listId,
            content,
            order: maxOrder
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newCard;
};

exports.updateList = async (ctx) => {
    const { listId } = ctx.params;
    const props = ctx.request.body;
    let updatedList = null;

    try {
        updatedList = await List.updateList({
            id: listId,
            props
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedList;
};

exports.reorder = async (ctx) => {
    const { key, value } = ctx.params;
    const { list } = ctx.request.body;

    const results = [];
    // 리스트 재정렬
    if (key === 'list') {
        for(let i = 0; i < list.length; i += 1) {
            results.push(List.reorder({
                order: i + 1,
                listId: list[i]
            }));
        }
    } else {
        for(let i = 0; i < list.length; i += 1) {
            results.push(Card.reorder({
                order: i + 1,
                cardId: list[i],
                listId: value
            }));
        }
    }

    await Promise.all(results);

    ctx.status = 200;
};

exports.deleteList = async (ctx) => {
    const { listId } = ctx.params;

    await List.deleteLists({
        id: listId
    });

    await Card.deleteCards({
        key: 'list_id',
        id: listId
    });

    ctx.body = listId;
};

exports.deleteCards = async (ctx) => {
    const { key, id, listId } = ctx.params;

    if (key === 'card') {
        await Card.deleteCards({
            id
        });
    } else {
        await Card.deleteCards({
            key: 'list_id',
            id
        });
    }

    ctx.body = {
        key,
        id,
        listId
    }; 
};

exports.editCard = async (ctx) => {
    const { id } = ctx.params;
    const { text } = ctx.request.body;

    const newCard = await Card.updateCard({
        id,
        content: text
    });

    ctx.body = {
        newCard
    };
};