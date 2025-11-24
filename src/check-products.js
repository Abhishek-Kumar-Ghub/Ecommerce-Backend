import mongoose from 'mongoose'
import dotenv from 'dotenv'
import product from './models/product.js'

dotenv.config()

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB')
    
    const products = await product.find({})
    console.log('Found products:', products.length)
    
    products.forEach(p => {
      console.log(`ID: ${p._id} (${typeof p._id}) - Title: ${p.title}`)
      console.log(`Is valid ObjectId: ${mongoose.Types.ObjectId.isValid(p._id)}`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

checkProducts()