const promotionsModel = require('../models/PromotionModel');

exports.createAPromotion=(req,res)=>{
    if(req.body.startDate && req.body.endDate){
        const promotion = new promotionsModel({
            productId : req.body.productId,
            promotionName : req.body.promotionName,
            description: req.body.description,
            startDate : new Date(req.body.startDate),
            endDate : new Date(req.body.endDate)
        });
        promotion.save()
            .then(newPromotion=>{
                res.json({
                    message: `A new promotion is created`,
                    data: newPromotion
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:err
                })
            })
    }
    else {
        res.json({
            message:"Some fields are missing or empty"
        })
    }
}

exports.readAllPromotions=(req,res)=>{
    const todayDate = new Date().toISOString();
    promotionsModel.find({
        'startDate':{$lte:todayDate},
        "endDate":{$gte: todayDate}
    })
        .sort({'startDate':1})
        .then(promotions=>{
            if(promotions.length){
                res.json({
                    message: `A list of all promotion items that are now on sale`,
                    data: promotions,
                    totalPromotions: promotions.length
                })
            }
            else{
                res.json({
                    message: `There is no promotion`,
                    totalPromotions: promotions.length
                })
            }

        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })

}

exports.readPromotionsHistory=(req,res)=>{
    promotionsModel.find()
        .sort({'startDate':1})
        .then(promotions=>{
            if(promotions){
                res.json({
                    message: `A list of all promotion items in promotion history`,
                    data: promotions,
                    totalPromotions: promotions.length
                })
            }
            else{
                res.json({
                    message: `There is no promotion in promotion history`,
                    totalPromotions: promotions.length
                })
            }

        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })

}

exports.readAPromotion=(req,res)=>{
    promotionsModel.findById(req.params.promotionId)
        .then(promotion=>{
            res.json({
                message: `The promotion with id ${req.params.promotionId}`,
                data: promotion
            })
        })
        .catch(()=>{
            res.status(404).json({
                message: `There is no promotion with id ${req.params.promotionId}`
            })
        })
}

exports.updateAPromotion=(req,res)=>{
    let isValid = true;
    if(req.body.productId !== "undefined" && req.body.productId.length===0) isValid=false;
    else if(typeof(req.body.startDate) !== "undefined" && req.body.startDate.length===0) isValid=false;
    else if(typeof(req.body.endDate) !== "undefined" && req.body.endDate.length===0) isValid=false;

    if(isValid){
        promotionsModel.findByIdAndUpdate(req.params.promotionId, req.body, {new: true})
            .then(promotion=>{
                if(promotion){
                    res.json({
                        message: `Promotion with id ${req.params.promotionId} is updated`,
                        data: promotion
                    })
                }
                else{
                    res.status(404).json({
                        message:`There is no promotion with id ${req.params.promotionId}`
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
            message:"Fields cannot be empty"
        })
    }
}



exports.deleteAPromotion=(req,res)=>{
    promotionsModel.findById(req.params.promotionId)
        .then(promotion=>{
            if(promotion){
                promotionsModel.findByIdAndRemove(req.params.promotionId)
                    .then(()=>{
                        res.json({
                            message: `Promotion with id ${req.params.promotionId} is deleted`
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
                    message: `There is no promotion with id ${req.params.promotionId}`,
                })
            }
        })
        .catch(()=>{
            res.status(404).json({
                message: `There is no promotion with id ${req.params.promotionId}`
            })
        })
}