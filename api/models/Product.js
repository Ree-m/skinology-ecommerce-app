const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    //     default: mongoose.Types.ObjectId
    // },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }, 
    use:{
        type:String,
        required:true
    }, 
    ingredients:{
        type:String,
        required:true
    }, 
    quantity:{
        type:Number,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})




module.exports = mongoose.model("Product", ProductSchema)