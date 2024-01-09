const mongoose = require("mongoose")

const commentModel= new mongoose.Schema({
    comment:{
        type:String,

    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    }
},{timestamps:true})


const comment = mongoose.model('comment',commentModel)

module.exports = comment