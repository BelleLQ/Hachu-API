const mongoose = require('mongoose');
const {Schema} = mongoose;

const promotionSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    promotionName:{
        type : String,
    },
    description:{
        type : String,
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