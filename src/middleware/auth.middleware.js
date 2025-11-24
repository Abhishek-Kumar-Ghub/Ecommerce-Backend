import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'
dotenv.config()

const verifyToken=async(req,res,next)=>{
try{
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message:"No token provided"})
}
const token=authHeader.split(' ')[1]
const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
const user=await User.findById(decode.id).select("-password")
if(!user){
    return res.status(401).json({message:"User not found"})
}
req.user=user
next();
}catch(error){
    console.log('Token verification error:', error.message)
    res.status(401).json({message:"invalid token"})
}
}
export default verifyToken 