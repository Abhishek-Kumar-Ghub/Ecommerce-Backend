import product from "../models/product.js";


const createProduct=async(req,res)=>{
    try{
const {title,description,category,price}=req.body;
const products=await product.create({title,description,category,price})
return res.status(201).json({message:"product is created successfully"})
    }catch(error){
console.log(error.message)
res.status(500).json({message:error.message})
    }}

    const getProduct=async(req,res)=>{
        try {
            const productss=await product.find()
            res.status(200).json({message:"product data fetched successfully",productss})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message:error.message})
        }
    }

    const getSingleProduct=async(req,res)=>{
        try {
            const {id}=req.params
            const singleProduct=await product.findById({id})
            res.status(200).json({message:"single product fetched successfully",singleProduct})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message:error.message})
        }
    }

    const updateProduct=async(req,res)=>{
        try {
                const {id}=req.params
            const Productt=await product.findById({id})
           
            const updateProduct=await product.findByIdAndUpdate(id,req.body,{new:true})
            res.status(201).json({message:"product data is updated successfully",updateProduct})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message:error.message})
        }
    }

    const deleteProduct=async(req,res)=>{
        try {
            const {id}=req.params;
            const existingProduct=await product.findById(id);
            if(!existingProduct){
                return res.status(404).json({message:"Product not found"});
            }
            
            await product.findByIdAndDelete(id)
            res.status(200).json({message:"product deleted successfully"})
        } catch (error) {
             console.log(error.message)
            res.status(500).json({message:error.message})
        }
    }
    export {createProduct , getProduct , getSingleProduct , updateProduct , deleteProduct}