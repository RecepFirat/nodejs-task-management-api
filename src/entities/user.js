const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    createdDate:{
        type:Date,
        default:new Date()
    }
});

module.exports = mongoose.model('users',userSchema);