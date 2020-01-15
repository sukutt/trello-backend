const mongoose = require('mongoose');

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

List.statics.deleteLists = function(params) {
    const { 
        key = '_id',
        id
    } = params;
    return this.deleteMany({
        [key]: id
    });
};

List.statics.reorder = function({ order, listId }) {
    this.findOneAndUpdate({ _id: listId }, {
        $set: { order }
    }, {}, () => {});
};

List.statics.updateList = function(params) {
    const { id, props } = params;
    return this.findOneAndUpdate({ _id: id }, props, {
        new: true
    });
};

module.exports = mongoose.model('List', List);

