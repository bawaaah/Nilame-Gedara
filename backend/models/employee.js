const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    nic:{
        type:String,
        required : true
    },
    contact:{
        type:Number,
        required : true
    },
    email:{
        type:String,
    
    },
    gender:{
        type:String,
        required : true
    },
    birth:{
        type:Date,
    
    },
   
})

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;