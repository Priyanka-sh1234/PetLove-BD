const {Schema, model}= require('mongoose')

const userQuery = new Schema ({
    email:{
        type: String,
        required:true,
    },
    yourStatus:{
        type: String,
        required:true,
    },
    enquiry:{
        type: String,
        required:true,
    }
})

const Query = model("UserQuery", userQuery)
module.exports = Query