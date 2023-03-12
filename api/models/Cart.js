const mongoose = require('mongoose');

// const CartSchema=new mongoose.Schema({
//     userId:{
//         type:String,
//     },
//     products:[{
//         productId:{
//             type:String,
//         },
//         name:String,
//         quantity:{
//             type:Number,
//             required:true,
//             min:[1,"Quantity can not be less than !"],
//             default:1
//         },
//         price:Number
//     }],
//     bill:{
//         type:Number,
//         required:true,
//         default:0
//     }
// })

// module.exports=mongoose.model("Cart",CartSchema)


const cartItemSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    productId: {
        type: String, 
        // required: true
    },
    quantity: {
        type: Number, 
        required: true, 
        min: 1
    },
});

module.exports = mongoose.model('CartItem', cartItemSchema);