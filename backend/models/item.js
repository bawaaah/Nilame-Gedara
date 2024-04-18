const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itemName: {
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
        type: Boolean,
        required: true
    }
})

const item = mongoose.model("item", itemSchema);
module.exports = item;
