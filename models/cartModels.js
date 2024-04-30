import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    servicename: {
        type: String,
        required: true
    },
    servicePrice: {
        type: Number,
    },
    serviceimage:{
        type: String,
        
    }
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', CartItemSchema);

export default CartItem;
