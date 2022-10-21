const { default: mongoose } = require('mongoose')
// const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({

    adminEmail: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('admin', adminSchema) 