const advantageDetailSchema = require("../Models/AdvantagesAdvue")

const getAdvantage = async (req,res) => {
    const advantage = await advantageDetailSchema.find();
    if (advantage) {
        res.status(201).json({
            data: advantage,
            message: "Successfully got all the Advantage"
        })
    }
    else{
        res.status(404).json({
            message: "No Advantage found"
            })
    }
}
const insertAdvantage = async (req,res) => {

    const insert = {
        advantageName :req.body.advantageName,
        advantageDetail : req.body.advantageDetail
    }
    const advantage = await advantageDetailSchema.create(insert);
    if(advantage){
    res.status(201).json({
        data: advantage,
        message: "Successfully insert all"
    })}
    else{
        res.status(400).json({
            message: "Failed to insert"
            })
    }
}
module.exports ={
    getAdvantage,
    insertAdvantage
}