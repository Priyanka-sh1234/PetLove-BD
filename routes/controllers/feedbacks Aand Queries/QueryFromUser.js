const QueryModel = require('../../../models/feedback/QueryModel')
const {QueryValidation} =require('../../../services/QueryValidation')



const userQuery = async(req,res,next)=>{
    try{
        //stpe 1 validation 
        const validatedValues = await QueryValidation.validateAsync(req.body);
        const {email, yourStatus, enquiry} = validatedValues

        if(!email && !yourStatus && !enquiry){
            return res.status(400).json({
                success:false,
                message: "All fields are Required !!"
            })
        }

        //step 2: new Feedback
        const newQuery = new QueryModel({email, yourStatus, enquiry})
        await newQuery.save()

        //step 3: response
        res.status(200).json({
            success: true,
            message:"We will get connect to you very soon 😊 !!"
        })


    }
    catch(error){
        next(error)
    }
}

module.exports =userQuery