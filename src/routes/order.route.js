import express from 'express'
import { getOrders, placeOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import verifyAdmin from '../middleware/admin.middleware.js';


const orderRouter=express.Router();

orderRouter.post("/placeorder",verifyToken,placeOrder)
orderRouter.get("/get",verifyToken,getOrders)
orderRouter.get("/admin/all",verifyToken,verifyAdmin,getAllOrders)
orderRouter.put("/admin/:id",verifyToken,verifyAdmin,updateOrderStatus)

export default orderRouter