let mongoose = require('mongoose');
let validator = require('validator')
const ObjectId =require('mongoose').Types.ObjectId;

let addressSchema = new mongoose.Schema({
    user_id:{type:ObjectId},
    address : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Addresses', addressSchema)
