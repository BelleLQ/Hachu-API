//import express, router, categoryService(data)
const express = require('express');
const router = express.Router();
const categoryService = require('../services/CategoryService');

//create
router.post('/', categoryService.createACategory);

//read all
router.get('/', categoryService.readAllCategories);

//read 1
router.get('/:categoryName', categoryService.readACategory);

//update
router.put('/:categoryId', categoryService.updateACategory);

//delete
router.delete('/:categoryId', categoryService.deleteACategory);

module.exports=router;