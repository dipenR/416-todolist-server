const { model, Schema } = require('mongoose');

const taskSchema = new Schema({
    title: String,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Task', taskSchema);