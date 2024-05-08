//payment model
//payment id,itemid,customername,date,amount,userid

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
//in mongodb auto generate object id for each
    orderId : {
        type : String,
        required : true
    },

    customerName : {
        type : String,
        required : true
    },

    userId : {
        type : String,
        required : true
    },
    
    Date : {
        type : Date,
        required : true
    },

    itemId : {
        type : String,
        required : true
    },

    amount : {
        type : Number,
        required : true
    },



})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;