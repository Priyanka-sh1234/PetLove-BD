const AllAppointments = require("../../../models/Appointment.model");
const { appointmentValidation } = require("../../../services/Appointment");
const nodemailer = require("nodemailer");

const appointments = async (req, res, next) => {
    try {
        // Step 1: Validate incoming request
        const validatedValues = await appointmentValidation.validateAsync(req.body);

        const {
            clinicName,
            clinicEmail,
            location,
            parentName,
            petName,
            parentEmail,
            parentContact,
            appointmentDate,
            appointmentTime,
        } = validatedValues;

        const appointmentStatus = validatedValues.appointmentStatus || "Pending";

        // Step 2: Check for duplicate appointment
        const existingAppointment = await AllAppointments.findOne({
            parentEmail,
            clinicEmail,
            petName,
            appointmentDate,
            appointmentTime,
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "You have already booked this slot for your pet.",
            });
        }

        // Step 3: Check slot availability
        const slotLimit = 1;
        const slotBookings = await AllAppointments.countDocuments({
            clinicName,
            appointmentDate,
            appointmentTime,
        });

        if (slotBookings >= slotLimit) {
            return res.status(400).json({
                success: false,
                message: "This slot is already fully booked. Please choose another time.",
            });
        }

        // Step 4: Save new appointment
        const newAppointment = new AllAppointments({
            clinicName,
            clinicEmail,
            location,
            parentName,
            petName,
            parentEmail,
            parentContact,
            appointmentDate,
            appointmentTime,
            appointmentStatus,
        });

        await newAppointment.save();

        // // Step 5: Send confirmation email using Nodemailer
        // const transporter = nodemailer.createTransport({
        //     service: "gmail", // or use any SMTP service
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS,
        //     },
        // });

        // const mailOptions = {
        //     from: `"PetLove Team 🐾" <${process.env.EMAIL_USER}>`,
        //     to: parentEmail,
        //     subject: `Appointment Confirmation for ${petName} 🐶`,
        //     html: `
        //         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fefefe; border-radius: 10px; border: 1px solid #eee;">
        //             <h2 style="color: #ff6f61;">🐾 PetLove Appointment Confirmation</h2>
        //             <p>Dear <strong>${parentName}</strong>,</p>
        //             <p>We’re excited to confirm your appointment for <strong>${petName}</strong> at <strong>${clinicName}</strong>.</p>
                    
        //             <table style="margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 5px; width: 100%; border: 1px solid #ddd;">
        //                 <tr>
        //                     <td><strong>📍 Clinic:</strong></td><td>${clinicName}</td>
        //                 </tr>
        //                 <tr>
        //                     <td><strong>📅 Date:</strong></td><td>${appointmentDate}</td>
        //                 </tr>
        //                 <tr>
        //                     <td><strong>⏰ Time:</strong></td><td>${appointmentTime}</td>
        //                 </tr>
        //                 <tr>
        //                     <td><strong>📍 Location:</strong></td><td>${location}</td>
        //                 </tr>
        //                 <tr>
        //                     <td><strong>📧 Clinic Email:</strong></td><td>${clinicEmail}</td>
        //                 </tr>
        //             </table>

        //             <p style="margin-top: 20px;">If you have any questions or need to reschedule, feel free to contact us.</p>

        //             <p>Thank you for choosing <strong>PetLove</strong> 🐾</p>
        //             <p style="margin-top: 30px;">Warm regards,<br><strong>PetLove Team</strong></p>
        //         </div>
        //     `,
        // };

        // await transporter.sendMail(mailOptions);

        // Step 6: Return success
        return res.status(201).json({
            success: true,
            message: "Appointment Scheduled Successfully",
            data: {
                clinicName,
                clinicEmail,
                location,
                parentName,
                petName,
                parentEmail,
                parentContact,
                appointmentDate,
                appointmentTime,
                appointmentStatus,
            },
        });

    } catch (error) {
        next(error);
    }
};

module.exports = appointments;
