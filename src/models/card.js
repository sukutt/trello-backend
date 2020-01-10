const mongoose = require('mongoose');

const { Schema } = mongoose;

const Card = new Schema({
    list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
    content: String,
    order: { type: Number, default: 1, index: false }
});

Card.statics.findByListsIds = function(listIds) {
    return this.find({
        list_id: listIds
    }).sort({ order: 1 }).exec();
};

Card.statics.getLastOrderCard = function(listId) {
    return this.find({ list_id: listId }).sort({ order: 1 }).limit(1);
};

Card.statics.createCard = function(params) {
    const newCard = new this(params);
    return newCard.save();
};

Card.statics.updateCard = function(params) {
    const { id, ...rest } = params;
    return this.findOneAndUpdate({ _id: id }, rest, {
        returnNewDocument: true
    });
};

Card.statics.reorder = function({ order, cardId, listId }) {
    this.findOneAndUpdate({ _id: cardId }, {
        $set: { 
            list_id: listId,
            order
        }
    }, {}, () => {});
};


module.exports = mongoose.model('Card', Card);

