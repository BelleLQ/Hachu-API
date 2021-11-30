const categoryModel = require('../models/categoryModel');

exports.createACategory=(req,res)=>{
    if(req.body.categoryName && req.body.photoUrl) {
        const category = new categoryModel(req.body);
        category.save()
            .then(newCategory => {
                res.json({
                    message: "The new category is created",
                    data: newCategory
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
exports.readAllCategories=(req,res)=>{
    categoryModel.find()
        .sort({'categoryName': 1})
        .then(categories => {
            res.json({
                message: 'A list of all categories',
                data: categories,
                totalCategories: categories.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.readACategory=(req,res)=>{
    categoryModel.findById(req.params.categoryId)
        .then(category=>{
            if(category){
                res.json({
                    message: `The category with id ${req.params.categoryId}`,
                    data: category
                })
            }
            else {
                res.json({
                    message: `There is no category with id ${req.params.categoryId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })

}


exports.updateACategory=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.categoryName) !== "undefined" && req.body.categoryName.length===0) isValid=false;
    else if(typeof(req.body.photoUrl) !== "undefined" && req.body.photoUrl.length===0) isValid=false;

    if(isValid){
        categoryModel.findByIdAndUpdate(req.params.categoryId, req.body, {new: true})
            .then(category=>{
                if(category){
                    res.json({
                        message: `Category with id ${req.params.categoryId} is updated`,
                        data: category
                    })
                }
                else{
                    res.status(404).json({
                        message:`There is no category with id ${req.params.categoryId}`
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

exports.deleteACategory=(req,res)=>{
    categoryModel.findById(req.params.categoryId)
        .then(category=>{
            if(category){
                categoryModel.findByIdAndRemove(req.params.categoryId)
                    .then(()=>{
                        res.json({
                            message:`The category with id ${req.params.categoryId} is deleted`
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
                    message: `There is no category with id ${req.params.categoryId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })

}