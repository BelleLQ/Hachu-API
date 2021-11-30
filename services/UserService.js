const userModel = require('../models/UserModel.js');

exports.createAUser=(req,res)=>{
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password ) {
        userModel.findOne()
            .where("email").equals(req.body.email)
            .sort({'firstName':1})
            .then(repeatedUser=>{
                if(!repeatedUser){
                    const user = new userModel(req.body);
                    user.save()
                        .then(newUser=>{
                            res.json({
                                message:"The new user is created",
                                data: newUser
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                message: `Error: ${err}`
                            })
                        })
                }
                else {
                    res.json({
                        message:"Failed. The email has been registered"
                    })
                }

            })
    }
    else {
        res.json({
            message:"Some fields are missing"
        })
    }

}
exports.readAllUsers=(req,res)=>{
    userModel.find()
        .sort({'firstName':1})
        .then(users=>{
            res.json({
                message: 'A list of all users',
                data: users,
                totalUsers: users.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
}

exports.readAUser=(req,res)=>{
    userModel.findById(req.params.userId)
        .then(user=>{
            if(user){
                res.json({
                    message: `The user with id ${req.params.userId}`,
                    data: user
                })
            }
            else {
                res.json({
                    message: `There is no user with id ${req.params.userId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })
}

exports.updateAUser=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.firstName) !== "undefined" && req.body.firstName.length===0) isValid=false;
    else if(typeof(req.body.lastName) !== "undefined" && req.body.lastName.length===0) isValid=false;
    else if(typeof(req.body.email) !== "undefined" && req.body.email.length===0) isValid=false;
    else if(typeof(req.body.password) !== "undefined" && req.body.email.password===0) isValid=false;

    if(isValid){
        userModel.findByIdAndUpdate(req.params.userId, req.body, {new: true})
            .then(user=>{
                if(user){
                    res.json({
                        message: `User with id ${req.params.userId} is updated`,
                        data: user
                    })
                }
                else{
                    res.status(404).json({
                        message:`There is no user with id ${req.params.userId}`
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

exports.deleteAUser=(req,res)=>{
    userModel.findById(req.params.userId)
        .then(user=>{
            if(user){
                userModel.findByIdAndRemove(req.params.userId)
                    .then(()=>{
                        res.json({
                            message:`The user with id ${req.params.userId} is deleted`
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
                    message: `There is no user with id ${req.params.userId}`,
                })
            }
        })
        .catch(err=>{
            res.status(404).json({
                message: `${err}`
            })
        })

}