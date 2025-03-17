const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdvantageAdvueSchema = {
    advantageName :{
        type: String,
    },
    advantageDetail:{
        type:String
    }
}
module.exports = mongoose.model("Advantage",AdvantageAdvueSchema)