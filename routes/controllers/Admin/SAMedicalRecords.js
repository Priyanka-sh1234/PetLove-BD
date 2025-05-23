const Records = require("../../../models/Reports/ReportsModel")

const FetchRecords = async(req,res,next)=>{
    try{

        const records = await Records.find()

        if (!records || records.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'No Appointments found.',
            });
          }

        res.status(200).json({
            success: true,
            data: records,
        })
    }
    catch{
        next(error)
    }
}

module.exports= FetchRecords