const mongoose = require('mongoose');

const { Schema } = mongoose;

const Board = new Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    title: String,
    thumbnail: String,
    favorite: Boolean
});

Board.statics.findByAccountId = function(accountId) {
    return this.find({ account_id: accountId }).exec();
};

Board.statics.createBoard = function(params) {
    const collection = this; 
    const newBoard = new this(params);
    newBoard.save()
    .then(() => {
        return collection.find({});
    })
    .catch((err) => {
        console.error(err);
    });
};

module.exports = mongoose.model('Board', Board);