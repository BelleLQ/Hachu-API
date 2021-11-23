const mongoose = require('mongoose');
const {Schema} = mongoose;

const promotionSchema = new Schema({
    promotionName:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    photoUrl:{
        type: String,
        required: true
    },
    detailedUrl:{
        type: String,
        required:true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }
})

const promotionModel = mongoose.model('Promotion', promotionSchema);
module.exports = promotionModel;