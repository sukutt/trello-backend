const List = require('models/list');

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

exports.updateList = async (ctx) => {
    let updatedList = null;

    try {
        updatedList = await List.updateList(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedList._id;
};