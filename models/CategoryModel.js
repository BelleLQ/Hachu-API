const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    photoUrl: [{
        type: String,
        required: true
    }],
    categoryDesc: {
        type: String
    }
})

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;