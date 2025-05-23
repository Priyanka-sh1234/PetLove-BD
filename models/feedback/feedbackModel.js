const {Schema, model}= require('mongoose')

const userfeedback = new Schema ({
    username:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    feedbackAs:{
        type: String,
        required:true,
    },
    feedback:{
        type: String,
        required:true,
    }
})

const feedback = model("Feedbacks", userfeedback)
module.exports = feedback