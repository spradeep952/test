let mongoose = require('mongoose');
let validator = require('validator')


let userSchema = new mongoose.Schema({
    
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        validate: (value) =>{
            return validator.isEmail(value)
        }
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User', userSchema)
