// routes/api/Auth_route.js
const express = require("express");
const backend = express.Router();
const path = require("path")



const registerController = require("../controllers/auth/register");
const loginController = require("../controllers/auth/login");
const webRegisterController = require("../controllers/auth/webRegister");
const PetOwnerLoginController = require('../controllers/auth/PetOwnersLogin');
const ClinicRegisterController = require('../controllers/auth/ClinicRegisters');
const ClinicLoginController = require('../controllers/auth/cliniclogin');
const { googleAuth } = require('../controllers/auth/google');
const { clinicLoginGoogleAuth } = require('../controllers/auth/ClinicGoogle');
const { ParentLoginGoogleAuth } = require('../controllers/auth/ParentGoogle');
const { ParentGoogleRegAuth } = require("../controllers/auth/ParentgoogleRegister")
const { ParentProfile } = require('../controllers/auth/getParentProfile')
const { ClinicProfile } = require('../controllers/auth/clinicProfile')
const { getPetOwners } = require('../controllers/Admin/GetPetOwners')
const { getClinics } = require('../controllers/Admin/GetClinics')
const appointments = require("../controllers/Appointments/AllAppointments")
const getAppoint = require('../controllers/Appointments/getAppoint.byemail')
const { getAppointments } = require("../controllers/Admin/getAppointments")
const { getAppointmentByDateandclinicEmail } = require("../controllers/Appointments/getAppointmentByDateandclinicEmail")
const { getAllAppointForClinic } = require("../controllers/Appointments/getAllapointmentsForClinic")
const userfeedback = require("../controllers/feedbacks Aand Queries/feedbacks");
const userQuery = require("../controllers/feedbacks Aand Queries/QueryFromUser");
const UserReport = require("../controllers/Reports/AddReports");
const { updateParentProfile } = require("../controllers/updateProfiles/UpdateParentProfile");
const { updateClinicProfile } = require("../controllers/updateProfiles/ClinicProfileUpdation");
const { ClinicDeleteAccount } = require('../controllers/deleteAccount/ClinicDeleteAccount')
const { ParentDeleteAccount } = require("../controllers/deleteAccount/ParentDeleteAccount")
const { getReportsByParentEmail } = require("../controllers/Reports/yourPetReports")
const updateAppointmentStatus = require('../controllers/Appointments/updateAppointStatus');
const { getClinicDetails } = require('../controllers/extras/clinicDetailsGet')
const { setClinicDetails } = require("../controllers/extras/clinicdetailsPost")
const getReportsByClinic = require("../controllers/Reports/ReportsSentByClinic")
const FetchRecords = require("../controllers/Admin/SAMedicalRecords");
const { fetchFeedback, FetchQueries } = require("../controllers/Admin/fetchFeedbacks");
const { forgotPass, otpStore, ParentForgotPass }= require("../../utils/forgotpass")
const  {resetPassword, resetParentPassword} = require("../../utils/resetPassword")






//Multer
const upload = require('../../services/multer/Multer');







//Middlewares Imports

const ProfileMiddleware = require('../../Middleware/parentProfileMiddleware');















//Routes to controllers



// register route
backend.post("/register", registerController);

// login route
backend.post("/login", loginController);

//webRegister route 
backend.post("/webRegister", webRegisterController);

//PetOwnerLogin route
backend.post('/PetOwnersLogin', PetOwnerLoginController);

//ClinicRegisterRegister Route
backend.post('/clinicregister', ClinicRegisterController)


//ClinicLogin route
backend.post('/clinicLogin', ClinicLoginController);


//clinic google register route
backend.post('/google', googleAuth);

//clinic Login Route
backend.post('/ClinicGoogleLogin', clinicLoginGoogleAuth)

// Parent Google Login
backend.post("/parentGoogleLogin", ParentLoginGoogleAuth);

// Parent Google Register
backend.post('/ParentGoogleRegister', ParentGoogleRegAuth);


//parentProfile
backend.get('/parentProfile', ProfileMiddleware, ParentProfile)

//ClinicProfile
backend.get('/ClinicProfile', ProfileMiddleware, ClinicProfile)


//add Appointments
backend.post('/addappointment', ProfileMiddleware, appointments)

//getAppointments
backend.get('/getAppointmentsByEmail', getAppoint);

//getAppointmentByDateandclinicEmail for clinics
backend.get('/getAppointmentByDateandclinicEmail', getAppointmentByDateandclinicEmail)

//getAllAppointForClinic
backend.get('/getAllAppointForClinic', getAllAppointForClinic)

//add reports by clinics
backend.post('/AddReportsbyClinic', ProfileMiddleware, upload.single('reportFile'), UserReport)

//update Parent Profile
backend.post('/UpdateParentProfile', ProfileMiddleware, updateParentProfile)

//update ClinicProfile
backend.post('/UpdateClinicProfile', ProfileMiddleware, updateClinicProfile)

//ClinicDeleteAccount
backend.delete('/ClinicDeleteAccount/:id', ClinicDeleteAccount);


//ClinicDeleteAccount
backend.delete('/ParentDeleteAccount/:id', ProfileMiddleware, ParentDeleteAccount);

//get User Pet Reports
backend.get("/YourPetReports/:parentEmail", ProfileMiddleware, getReportsByParentEmail);

//getReportsSentByClinic
backend.get('/getReportsByClinic', ProfileMiddleware, getReportsByClinic);

//updateAppointmentStatus
backend.patch('/updateAppointmentStatus/:id', ProfileMiddleware, updateAppointmentStatus);






//Admin

backend.get('/FetchPetOwners', getPetOwners)

backend.get('/FetchClinics', getClinics)

backend.get('/FetchAppointments', getAppointments)

backend.get('/SAMedicalRecords', FetchRecords)

backend.get('/FetchFeedback', fetchFeedback)

backend.get("/FetchQueries", FetchQueries)











//feedback and query

backend.post("/feedback", userfeedback)

backend.post("/QueryFromUser", ProfileMiddleware, userQuery)

backend.post("/QueryFromcontactPage", userQuery)

backend.post("/send-clinic-otp",forgotPass)

backend.post("/reset-clinic-password", resetPassword)

backend.post("/send-Parent-otp",ParentForgotPass)

backend.post("/reset-Parent-password", resetParentPassword)






//Extras

// Route to save or update clinic details
backend.post('/addClinicMoreDetails', ProfileMiddleware, setClinicDetails);

// Route to fetch clinic details by clinicId
backend.get('/getClinicDetails/:clinicId', ProfileMiddleware, getClinicDetails);





module.exports = backend;