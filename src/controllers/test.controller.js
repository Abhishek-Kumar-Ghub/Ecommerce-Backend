import product from '../models/product.js'
import mongoose from 'mongoose'

const testProduct = async (req, res) => {
  try {
    const { id } = req.params
    console.log('Testing product ID:', id)
    console.log('Is valid ObjectId:', mongoose.Types.ObjectId.isValid(id))
    
    const foundProduct = await product.findById(id)
    console.log('Found product:', foundProduct)
    
    res.json({
      id,
      isValidObjectId: mongoose.Types.ObjectId.isValid(id),
      productExists: !!foundProduct,
      product: foundProduct
    })
  } catch (error) {
    console.error('Test error:', error)
    res.status(500).json({ error: error.message })
  }
}

export { testProduct }