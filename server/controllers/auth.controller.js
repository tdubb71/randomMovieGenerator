const User = require('../models/user.model'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');


module.exports = {
    register: (req,res) => {
        User.findOne({email:req.body.email})
            .then(data => {
                if(data){
                    res.status(400).json({email:{message:"Email already taken"}});
                }
                else{
                    User.create(req.body)
                        .then(data => {
                            res.cookie("usertoken",jwt.sign({id:data._id},process.env.JWT_KEY),{
                                httpOnly:true,
                                expires: new Date(Date.now() + 90000000000)
                            }).json({
                                        msg:"success",
                                        userLogged:{
                                            firstName: data.firstName,
                                            lastName:data.lastName,
                                            _id : data._id
                                        }
                                    })
                                    console.log("register successful")
                        })
                        .catch(err => {
                            // console.log(err)
                            res.status(400).json(err.errors)})
                }
            })
            .catch(err => res.json(err.errors))
    },
    login: (req,res) => {
        User.findOne({email:req.body.email})
            .then(data => {
                
                if(data === null){
                    res.json({error:"Invalid login attempt!"})
                }
                else{
                    bcrypt.compare(req.body.password,data.password)
                        .then( isValid => {
                            console.log("In bcrypt", isValid)
                            if(isValid === true){
                                console.log("in true")
                                res.cookie("usertoken",jwt.sign({_id:data._id},process.env.JWT_KEY),{
                                    httpOnly:true,
                                    expires: new Date(Date.now() + 90000000000)
                                }).json({
                                    msg:"success",
                                    userLogged:{
                                        firstName: data.firstName,
                                        lastName:data.lastName,
                                        _id : data._id
                                    }
                                })
                            }
                        })
                        .catch(err => res.status(400).json({error:"Invalid login attempt!"}))
                }
            })
            .catch(err => res.json({error:"Invalid login attempt!"}))
    },
    logout: (req,res) => {
        res.clearCookie('usertoken');
        res.json({msg:"logged out"});
    }
}