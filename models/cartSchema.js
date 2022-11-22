const { default: mongoose } = require('mongoose')
// const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({

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
            quantity: Number,
            name: String,
            price: Number,

        },
    ],
    total: {
        type: Number,
        default: 0,
    }





})

module.exports = mongoose.model('cart', cartSchema) 