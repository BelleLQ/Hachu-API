const productModel = require('../models/ProductModel');

exports.createAProduct=(req,res)=>{
    if(req.body.prodName && req.body.brandId && req.body.price && req.body.categoryId && req.body.photoUrl ) {
        const product = new productModel(req.body);
        product.save()
            .then(newProduct => {
                res.json({
                    message: "The new product is created",
                    data: newProduct
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: `Error: ${err}`
                })
            })
    }
    else {
        res.json({
            message:"Some fields are missing"
        })
    }

}
exports.readAllProducts=(req,res)=>{
    if(req.query.categoryId && req.query.categoryId!="619bf5997f4ec5fb37199093"){
        productModel.find({ "categoryId": req.query.categoryId})
            .sort({'prodName':1})
            .then((products)=>{
                res.json({
                    message:`A list of products with category id ${req.query.categoryId}`,
                    data: products,
                    totalProducts: products.length
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                })
            })
    }
    else if(req.query.brandId){
        productModel.find({ "brandId": req.query.brandId})
            .sort({'prodName':1})
            .then((products)=>{
                res.json({
                    message:`A list of products with brand ${req.query.brandId}`,
                    data: products,
                    totalProducts: products.length
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                })
            })
    }
    else {
        productModel.find()
            .sort({'prodName': 1})
            .then(products => {
                res.json({
                    message: 'A list of all products',
                    data: products,
                    totalProducts: products.length
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
    }
}

exports.readAProduct=(req,res)=>{
    productModel.findById(req.params.productId)
        .then(product=>{
            if(product){
                res.json({
                    message: `The product with id ${req.params.productId}`,
                    data: product
                })
            }
            else {
                res.json({
                    message: `There is no product with id ${req.params.productId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })
}

exports.updateAProduct=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.prodName) !== "undefined" && req.body.prodName.length===0) isValid=false;
    else if(typeof(req.body.brandId) !== "undefined" && req.body.brandId.length===0) isValid=false;
    else if(typeof(req.body.categoryId) !== "undefined" && req.body.categoryId.length===0) isValid=false;
    else if(typeof(req.body.photoUrl) !== "undefined" && req.body.photoUrl.length===0) isValid=false;

    if(isValid){
        productModel.findByIdAndUpdate(req.params.productId, req.body, {new: true})
            .then(product=>{
                if(product){
                    res.json({
                        message: `Product with id ${req.params.productId} is updated`,
                        data: product
                    })
                }
                else{
                    res.status(404).json({
                        message:`There is no product with id ${req.params.productId}`
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                })
            })
    }
    else {
        res.json({
            message:"Some fields are missing"
        })
    }
}

exports.deleteAProduct=(req,res)=>{
    productModel.findById(req.params.productId)
        .then(product=>{
            if(product){
                productModel.findByIdAndRemove(req.params.productId)
                    .then(()=>{
                        res.json({
                            message:`The product with id ${req.params.productId} is deleted`
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: err
                        })
                    })
            }
            else {
                res.json({
                    message: `There is no product with id ${req.params.productId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })

}