const Feedbacks = require('../../../models/feedback/feedbackModel')

const Queries = require("../../../models/feedback/QueryModel")

const fetchFeedback =async(req,res,next)=>{
 try{

    const feedbacks = await Feedbacks.find()

    if(!feedbacks || feedbacks.length ===0){
        return res.status(404).json({
            success: false,
            message:"Feedbacks are not present!!"
        })
    }

    res.status(200).json({
        success: true,
        data: feedbacks,
    })
 }
 catch(error){
    next(error)
}
}

const FetchQueries = async(req,res,next)=>{
    try{
        const queries = await Queries.find()

        if(!queries || queries.length ===0){
            return res.status(404).json({
                success: false,
                message:"Queries are not present!!"
            })
        }
    
        res.status(200).json({
            success: true,
            data: queries,
        })
    }
    catch(error){
        next(error)
    }
}

module.exports= {fetchFeedback, FetchQueries}