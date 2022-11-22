const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bannerSchema=new Schema({
    name:{
        type:String,    
        required:true
    },
    image:{
        type:Array,
        required:true
    },access:{
        type:Boolean,
        required:true
    }
      
})
module.exports=mongoose.model('banner',bannerSchema) 