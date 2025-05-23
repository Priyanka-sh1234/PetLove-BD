const {Schema, model} = require('mongoose')

const appointmentModel = new Schema({
    clinicName:{
        type:String,
        required:true,
    },
    clinicEmail:{
        type:String,
        required:true,
        unique: true,
    },
    location:{
        type:String,
        required:true,
    },
    petName:{
        type:String,
        required:true,
    },
    parentName:{
        type:String,
        required: true,
    },
    parentEmail:{
        type:String,
        required:true,
    },
    parentContact:{
        type: Number,
        required: true,
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
        default: "Pending",
    },
})

const Appoint= model("AllAppointments", appointmentModel, "Appointments")

module.exports = Appoint;