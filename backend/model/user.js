const mongoose = require("mongoose")
const schema = mongoose.Schema
const Users = new schema({
    first_name: {
        type: String,
        required:true
    },
    last_name:{
        type:String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required:true
    },
    password: {
        type: String,
        default: '',
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    pic:{
       type:String,
       default:""
    },
    role:{
        type: Number,
        required:true
    },
    hash_transaction:{
        type:String
    },
    otp:{
        type:Number
    },
    is_delete:{
        type:Boolean,
        default:false
    }  
    
}, {timestamps:true, strict: false });
var User = mongoose.model("Users", Users)
module.exports = User