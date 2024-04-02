const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({ //object ekak hadanwa wage deyak

    name : {
        type : String,
        require: true
    },
    pid : { //pid = quantity
        type : Number,
        require: true
    },
    category : {
        type : String,
    },
    isDamaged : {
        type: Boolean
    },
    DamagedQty : {
        type: Number
    },
    isDisposed : {
        type: Boolean
    },
    DisposedQty : {
        type: Number
    }

})

const Product = mongoose.model("Product",productSchema); //table name, schema

module.exports = Product; //export