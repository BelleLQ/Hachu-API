//import express, router, promotionService(data)
const express = require('express');
const router = express.Router();
const promotionService = require('../services/PromotionService');

//create
router.post('/', promotionService.createAPromotion);

//read all
router.get('/', promotionService.readPromotionsHistory);

//read 1
router.get('/:promotionId', promotionService.readAPromotion);

//update
router.put('/:promotionId', promotionService.updateAPromotion);

//delete
router.delete('/:promotionId', promotionService.deleteAPromotion);

module.exports=router;