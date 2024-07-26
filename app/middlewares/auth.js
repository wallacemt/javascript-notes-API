require("dotenv").config();
const secret = process.env.JWT_TOKEN;

const jwt = require("jsonwebtoken")

const user = require("../models/user")

const withAuth = (req, res, next) => {
    const token = req.headers["x-acess-token"]
    if(!token){
        res.status(401).json({error: "Unauthorized: no token provied"})
    }else{
        jwt.verify(token, secret, (error, decoded) => {
            if(error){
                res.status(401).json({error: "Unauthorized: token invalid"})
            }else{
                req.email = decoded.email;
                user.findOne({email: decoded.email}).then(user => {
                    req.user = user;
                    next();
                }).catch(error => { 
                    res.status(401).send(error)
                })
            }
        })
    }
}

module.exports = withAuth