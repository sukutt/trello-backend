const Card = require('models/card');

exports.getCards = async (ctx) => {
    // value(List ID)
    const { value } = ctx.params;

    let cards = null;
    try {
        cards = await Card.findByListId(value);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = cards || [];
};

exports.createCard = async (ctx) => {
    const { content, listId } = ctx.request.body;

    let newCard = null;
    try {
        newCard = await Card.createCard({
            list_id: listId,
            content 
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = newCard;
};

exports.updateCard = async (ctx) => {
    let updatedCard = null;

    try {
        updatedCard = await Card.updateCard(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = updatedCard._id;
};