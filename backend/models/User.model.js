const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required: [true, "Please provide a unique Name"],
        unique: [true, "Name Exist"]
    },

    email : {
        type : String,
        required: [true,"Please provide a unique Email"],
        unique: true
    },

    password : {
        type : String,
        required: [true,"Please provide a password"],
        unique: false
    },


    phone : {
        type : Number,
        required: true
    }

  

});

const Users = mongoose.model('User', UserSchema);

module.exports = Users;