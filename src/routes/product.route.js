import express from 'express'
import { createProduct, deleteProduct, getProduct, getSingleProduct, updateProduct } from '../controllers/product.controller.js'
import verifyToken from '../middleware/auth.middleware'
import verifyAdmin from '../middleware/admin.middleware'

const productRouter=express.Router()

productRouter.post('/add',verifyToken,verifyAdmin,createProduct)
productRouter.get('/', getProduct)
productRouter.get('/single',getSingleProduct)
productRouter.put(':/id',verifyToken,verifyAdmin,updateProduct)
productRouter.delete(':/id',verifyToken,verifyAdmin,deleteProduct)

export default productRouter
