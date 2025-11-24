import mongoose from 'mongoose'
import dotenv from 'dotenv'
import product from './models/product.js'

dotenv.config()

const sampleProducts = [
  {
    title: "EliteShield Performance Men's Jacket",
    description: "Premium quality men's jacket designed for comfort and style.",
    category: "clothing",
    price: 255000,
    images: ["/Jacket.avif"]
  },
  {
    title: "Gentlemen's Summer Gray Hat",
    description: "Premium blend summer hat for gentlemen.",
    category: "accessories",
    price: 99000,
    images: ["/cap.avif"]
  },
  {
    title: "OptiZoom Camera Shoulder Bag",
    description: "Professional camera bag with multiple compartments.",
    category: "bags",
    price: 250000,
    images: ["/Bag.avif"]
  },
  {
    title: "Cloudy Chic Grey Peep Toe Heeled Sandals",
    description: "Stylish grey peep toe heeled sandals.",
    category: "shoes",
    price: 270000,
    images: ["/shoes.avif"]
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB')
    
    // Clear existing products
    await product.deleteMany({})
    console.log('Cleared existing products')
    
    // Insert sample products
    const products = await product.insertMany(sampleProducts)
    console.log('Sample products added:', products.length)
    
    products.forEach(p => {
      console.log(`Product: ${p.title} - ID: ${p._id}`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()