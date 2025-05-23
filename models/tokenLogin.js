 const {model, Schema}= require('mongoose')

const TokenLoginModel = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
    ,token:{
        type: String,
        required: true,
    }
})


module.exports= model('TokenModel', TokenLoginModel)