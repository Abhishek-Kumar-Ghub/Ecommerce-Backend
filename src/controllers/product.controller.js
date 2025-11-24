import product from "../models/product.js";
import imagekit from '../config/imagekit.js';


const createProduct=async(req,res)=>{
    try{
const {title,description,category,price}=req.body;
let imageUrls = [];

if(req.files && req.files.length > 0){
    for(const file of req.files){
        const result = await imagekit.upload({
            file: file.buffer,
            fileName: `product_${Date.now()}_${file.originalname}`,
            folder: '/products'
        });
        imageUrls.push(result.url);
    }
}

const products=await product.create({title,description,category,price,images:imageUrls})
return res.status(201).json({message:"product is created successfully", product: products})
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
            const singleProduct=await product.findById(id)
            if(!singleProduct){
                return res.status(404).json({message:"Product not found"})
            }
            res.status(200).json({message:"single product fetched successfully",singleProduct})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message:error.message})
        }
    }

    const updateProduct=async(req,res)=>{
        try {
            const {id}=req.params
            const existingProduct=await product.findById(id)
            if(!existingProduct){
                return res.status(404).json({message:"Product not found"})
            }
            // Validate allowed fields for update
    const allowedFields = ['title', 'description', 'category', 'price', 'images']
    const updateData = {}
    for(const field of allowedFields){
        if(req.body[field] !== undefined){
            updateData[field] = req.body[field]
        }
    }
    
    const updatedProduct=await product.findByIdAndUpdate(id,updateData,{new:true})
            res.status(200).json({message:"product data is updated successfully",product:updatedProduct})
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