const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema({
//in mongodb auto generate object id for each
    discountcode : {
        type : String,
        required : true
    },

    discountpercentage : {
        type : Number,
        required : true
    },

    employeeid : {
        type : String,
        required : true
    },

    points : {
        type : String,
        required : true
    },
    

})

const Discount = mongoose.model("Discount",discountSchema);

module.exports = Discount;