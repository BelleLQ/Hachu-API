//import express, router, userService(data)
const express = require('express');
const router = express.Router();
const userService = require('../services/UserService.js');

//create
router.post('/', userService.createAUser);

//read all
router.get('/', userService.readAllUsers);

//read 1
router.get('/:userId', userService.readAUser);

//update
router.put('/:userId', userService.updateAUser);

//delete
router.delete('/:userId', userService.deleteAUser);

module.exports=router;