const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    createdDate: {
        type: Date,
        default: new Date()
    },
    finishedDate: {
        type: Date
    }
});
module.exports = mongoose.model('tasks', taskSchema);