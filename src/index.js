import express from 'express'
import connectDb from './config/databse.js';
import router from './routes/user.route.js';
import productRouter from './routes/product.route.js';

const app=express();
app.use(express.json())

connectDb();

app.use("/user",router)
app.use("/router",productRouter)

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})