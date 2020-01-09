const mongoose = require('mongoose');
// const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { Schema } = mongoose;

const List = new Schema({
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
    title: String,
    order: { type: Number, default: 1, index: false } 
});

List.statics.findByBoardId = function(boardId) {
    return this.find({ board_id: boardId }).sort({ order: 1 }).exec();
};

List.statics.getLastOrderList = function(boardId) {
    return this.find({ board_id: boardId }).sort({ order: 1 }).limit(1);
};

List.statics.createList = function(params) {
    const newList = new this(params);
    return newList.save();
};

List.statics.reorder = function({ order, listId }) {
    this.findOneAndUpdate({ _id: listId }, {
        $set: { order }
    }, {}, () => {});
};

List.statics.updateList = function(params) {
    const { id, ...rest } = params;
    return this.findOneAndUpdate({ _id: id }, rest, {
        new: true
    });
};

module.exports = mongoose.model('List', List);

