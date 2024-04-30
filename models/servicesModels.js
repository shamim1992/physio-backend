import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    servicename: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
    },
    description: {
        type: String, 
    },
    serviceimage: {
        type: String,
    },
},{timestamps: true})

const Service = mongoose.model('Service', ServiceSchema);

export default Service;