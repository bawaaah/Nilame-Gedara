const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    pid : {
        type: String,
        require: true
    },
    name : {
        type : String,
        require: true
    },
    pQty : { 
        type : Number,
        require: true
    },
    category : {
        type : String,
    },
    description: {
        type: String,
        required: true
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const item = mongoose.model("item", itemSchema);
module.exports = item;
