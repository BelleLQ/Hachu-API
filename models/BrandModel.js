const mongoose = require('mongoose');
const {Schema} = mongoose;

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    photoUrl: [{
        type: String,
        required: true
    }],
    brandDesc: {
        type: String
    }
})

const brandModel = mongoose.model('Brand', brandSchema);
module.exports = brandModel;