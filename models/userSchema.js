const { default: mongoose } = require('mongoose')
// const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    }

})

module.exports = mongoose.model('user', userSchema) 