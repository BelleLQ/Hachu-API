const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    prodName: {
        type: String,
        required: true
    },
    brandId:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    options:{
        type: [{
            option:{type:String},
            price:{type:Number}
        }]
    },
    description: {
        type: String,
    },
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    quantity: {
        type: Number
    },
    quantitySold: {
        type: Number,
    },
    photoUrl: [{
        type: String,
        required: true
    }]
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;