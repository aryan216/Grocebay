import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{type:String,reqiured:true},
    image:{type:String,reqiured:true},
    price:{type:Number,reqiured:true},
    discountedPrice:{type:Number,},
    quantity:{type:String,reqiured:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },

})

 const Product= mongoose.model("Product",productSchema) 

 export default Product