//import express, router, brandService(data)
const express = require('express');
const router = express.Router();
const brandService = require('../services/BrandService');

//create
router.post('/', brandService.createABrand);

//read all
router.get('/', brandService.readAllBrands);

//read 1
router.get('/:brandId', brandService.readABrand);

//update
router.put('/:brandId', brandService.updateABrand);

//delete
router.delete('/:brandId', brandService.deleteABrand);

module.exports=router;