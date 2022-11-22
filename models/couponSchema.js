const mongoose = require('mongoose');


const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    couponCode: {
        type: String,
        require: true,
        unique: true
    },
    discount: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    maxlimit: {
        type: Number,
        
    },
    minPurchase: {
        type: Number,
        
    },
    expDate: {
        type: Date,
        require: true
    },
    usedUsers: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ]
})

module.exports=mongoose.model('coupon',couponSchema)
