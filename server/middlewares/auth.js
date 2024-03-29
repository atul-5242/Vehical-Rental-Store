const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// auth
exports.auth = async (req,res,next)=>{
    try {
        // extract token 
        const token = req.cookies.token
                                || req.body.token 
                                || req.header("Authorization").replace("Bearer ","");
        // if token is missing , then retuen the response
        console.log("token",token)
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }
        // verify the token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        } catch (error) {
            // verification -issue
            return res.status(401).json({
                success:false,
                message:`Token is invalid :${error.message}`,
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:`Something went wrong while valdating the token.${error.message}`,
        });
    }
}
// isStudent

exports.isCustomer = async (req,res,next) =>{
    try {
        if (req.user.accountType!=="Customer") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student Only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again.",
        });
    }
}


// isAdmin
exports.isAdmin = async (req,res,next) =>{
    try {
        if (req.user.accountType!=="Admin") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin Only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again.",
        });
    }
}
