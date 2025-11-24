import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/databse.js';

dotenv.config()
import router from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

const app=express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

connectDb();

app.use("/user",router)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)

// Test route
import { testProduct } from './controllers/test.controller.js'
app.get('/test/product/:id', testProduct)


app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})