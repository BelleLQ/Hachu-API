//import express, router, productService(data)
const express = require('express');
const router = express.Router();
const productService = require('../services/ProductService.js');

//create
router.post('/', productService.createAProduct);

//read all
router.get('/', productService.readAllProducts);

//read 1
router.get('/:productId', productService.readAProduct);

//update
router.put('/:productId', productService.updateAProduct);

//delete
router.delete('/:productId', productService.deleteAProduct);

module.exports=router;