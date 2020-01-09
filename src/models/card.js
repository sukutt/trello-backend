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
    }).exec();
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

module.exports = mongoose.model('Card', Card);

