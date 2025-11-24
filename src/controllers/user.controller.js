import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const signup=async(req , res)=>{
try{
console.log("Request body:", req.body)
const {name,email,password,role}=req.body

// Input validation
if(!name || typeof name !== 'string' || !email || typeof email !== 'string' || !password || typeof password !== 'string'){
    console.log("Validation failed:", {name: typeof name, email: typeof email, password: typeof password})
    return res.status(400).json({message:"Name, email and password are required"})
}
if(password.length < 6){
    return res.status(400).json({message:"Password must be at least 6 characters"})
}

// Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if(!emailRegex.test(email)){
    return res.status(400).json({message:"Invalid email format"})
}

console.log("data recieved", name , email, password,role);
const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({message:"user exist"})
}
const salt=await bcrypt.genSalt(10)
const hashedPasword=await bcrypt.hash(password,salt);

// Set role - default to 'user', allow 'admin' if specified
const userRole = role === 'admin' ? 'admin' : 'user'

const newuser=new User({name,email,password:hashedPasword,role:userRole});
await newuser.save();
res.status(201).json({message:"user created successfully", user: {name, email, role: userRole}})
}catch(error){
console.log("error during signup", error)
res.status(500).json({message:"internal server error"})
}
}

const login=async(req,res)=>{
try{
const {email,password}=req.body

// Input validation
if(!email || typeof email !== 'string' || !password || typeof password !== 'string'){
    return res.status(400).json({message:"Email and password are required"})
}

// Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if(!emailRegex.test(email)){
    return res.status(400).json({message:"Invalid email format"})
}

const user=await User.findOne({email});
if(!user){
    return res.status(200).json({message:"user not found"})
}
const isPasswordValid=await bcrypt.compare(password, user.password)
if(!isPasswordValid){
    return res.status(400).json({message:"invalid password"})
}

const token=jwt.sign({id:user._id,email:user.email, role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"24h"})

res.status(200).json({message:"login successfully",user,token})
}catch(error){
console.log("error in login ", error.message)
res.status(500).json({message:"internal server error"})
}
}

const createAdmin=async(req,res)=>{
try{
const {name,email,password}=req.body

// Validation
if(!name || !email || !password){
    return res.status(400).json({message:"Name, email and password are required"})
}
if(password.length < 6){
    return res.status(400).json({message:"Password must be at least 6 characters"})
}

const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({message:"user exist"})
}
const salt=await bcrypt.genSalt(10)
const hashedPasword=await bcrypt.hash(password,salt);
const newAdmin=new User({name,email,password:hashedPasword,role:'admin'});
await newAdmin.save();
res.status(201).json({message:"admin created successfully", user: {name, email, role: 'admin'}})
}catch(error){
console.log("error during admin creation", error)
res.status(500).json({message:"internal server error"})
}
}

export {signup , login, createAdmin}