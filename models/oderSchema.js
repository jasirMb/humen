const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    deliveryAddress: {
        type: Object
    },
    date: {
        type: String
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number,
            name: String,
            price: Number
        }
    ],

    total: {
        type: Number
    },
    paymentType: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String,

    },
    razorpayPaymentId: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    }
})
module.exports = mongoose.model("Order", orderSchema)