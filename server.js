
const express = require("express");
const app=express();

const mongoose = require("mongoose");

const userController = require('./controllers/UserController.js');
const productController = require('./controllers/ProductController.js');
const categoryController = require('./controllers/CategoryController.js');
const brandController = require('./controllers/BrandController.js');
const promotionController = require('./controllers/PromotionController');

const cors = require('cors');
const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://hachu.bellelqweb.com']
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

if(process.env.NODE_ENV!=="production"){
    require('dotenv').config({path:'config/keys.env'})
}

app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.use("/users", userController);
app.use("/products", productController);
app.use("/categories", categoryController);
app.use("/brands", brandController);
app.use("/promotions", promotionController);


// Non-existing endpoint
app.use((req, res) =>{
    res.json({
        message: 'Invalid Request',
        status: 404
    });
});

// listen to the port & connect to mongoDB
app.listen(process.env.PORT,()=>{
    console.log(`Restful API is up and running on port ${process.env.PORT}.`);

    mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(()=>{
            console.log(`Connected successfully to MongoDB.`)
        })
        .catch(err=>{
            console.log(`Error: ${err}.`);
        })
})


