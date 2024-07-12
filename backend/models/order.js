const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        require: true
    },
    unitPrice: {
        type: Number,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    iID: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }
    

})

const order = mongoose.model("order",orderSchema)
module.exports = order;