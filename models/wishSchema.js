const { default: mongoose } = require('mongoose')
// const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            productId:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
           
        },
    ]
   




})

module.exports = mongoose.model('wishList', wishSchema) 