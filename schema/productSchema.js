const { default: mongoose } = require('mongoose')

const Schema = mongoose.Schema

const productSchema  = new Schema({
    Name : {
        type : String,
        required :true
    
    },
    Brand : {
        type : String,
        required :true
    
    },
    Quantity: {
        type : Number,
        required :true
    
    },
    Category : {
        type : String,
        required :true
    
    },
    Price : {
        type : Number,
        required :true
    
    },

})

module.exports = mongoose.model('products',productSchema) 