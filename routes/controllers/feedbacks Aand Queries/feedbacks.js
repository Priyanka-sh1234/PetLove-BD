const Feedbacks = require('../../../models/feedback/feedbackModel')
const {feedbackValidation} =require('../../../services/feedbackValidation')



const userfeedback = async(req,res,next)=>{
    try{
        //stpe 1 validation 
        const validatedValues = await feedbackValidation.validateAsync(req.body);
        const {username, email, feedbackAs, feedback} = validatedValues

        if(!username && !email && !feedbackAs && !feedback){
            return res.status(400).json({
                success:false,
                message: "All fields are Required !!"
            })
        }

        //step 2: new Feedback
        const newFeedback = new Feedbacks({username, email, feedbackAs, feedback})
        await newFeedback.save()

        //step 3: response
        res.status(200).json({
            success: true,
            message:"Thank you for your feedback 😊 !!"
        })


    }
    catch(error){
        next(error)
    }
}

module.exports =userfeedback