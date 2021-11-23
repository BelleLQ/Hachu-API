const brandModel = require('../models/brandModel');

exports.createABrand=(req,res)=>{
    if(req.body.brandName && req.body.photoUrl) {
        const brand = new brandModel(req.body);
        brand.save()
            .then(newBrand => {
                res.json({
                    message: "The new brand is created",
                    data: newBrand
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
exports.readAllBrands=(req,res)=>{
        brandModel.find()
            .sort({'prodName': 1})
            .then(brands => {
                res.json({
                    message: 'A list of all brands',
                    data: brands,
                    totalBrands: brands.length
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
}

exports.readABrand=(req,res)=>{
    brandModel.findById(req.params.brandId)
        .then(brand=>{
            if(brand){
                res.json({
                    message: `The brand with id ${req.params.brandId}`,
                    data: brand
                })
            }
            else {
                res.json({
                    message: `There is no brand with id ${req.params.brandId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })
}

exports.updateABrand=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.brandName) !== "undefined" && req.body.brandName.length===0) isValid=false;
    else if(typeof(req.body.photoUrl) !== "undefined" && req.body.photoUrl.length===0) isValid=false;

    if(isValid){
        brandModel.findByIdAndUpdate(req.params.brandId, req.body, {new: true})
            .then(brand=>{
                if(brand){
                    res.json({
                        message: `Brand with id ${req.params.brandId} is updated`,
                        data: brand
                    })
                }
                else{
                    res.status(404).json({
                        message:`There is no brand with id ${req.params.brandId}`
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

exports.deleteABrand=(req,res)=>{
    brandModel.findById(req.params.brandId)
        .then(brand=>{
            if(brand){
                brandModel.findByIdAndRemove(req.params.brandId)
                    .then(()=>{
                        res.json({
                            message:`The brand with id ${req.params.brandId} is deleted`
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
                    message: `There is no brand with id ${req.params.brandId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })

}