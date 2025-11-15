import cart from "../models/cart.js"

const addCart=async(req,res)=>{
try {
    const {productid , quantity}=req.body
    let carts=await cart.findOne({user:req.user._id})
    //cart mera document h,
    if(!carts){
    carts=await cart.create({items:[{product:productid,quantity}],user:req.user._id})
    }
    else{
        const item=carts.items.find(i=>i.product.toString()===productid)
        //itms array field ki h(i=>    find har index pr check kregaa    i.product ek object h jo db se aa rha h(jo product add karna h cart m...pehle se to nhi h cart m)   )
        if(item){
            item.quantity +=quantity;
        } else {
            carts.items.push({product:productid , quantity})
        }
        await carts.save() 
    }
res.status(201).json({message:"cart created successfully"})
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
}}

const getUserCart =async(req,res)=>{
try {
    const cartss=await cart.findOne({user:req.user._id}).populate("items.product")
    res.status(200).json({message:"cart id fetched", cartss})
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}

const removeCartItems=async(req,res)=>{
try{
const {productid}=req.body;
const cartsss=await cart.findOne({user:req.user._id})
if(!cartsss){
    return res.status(404).json({message:"cart not found"})
}
 cartsss.items= cartsss.items.filter(i=>i.product.toString()!==productid)
 //hum unko filter kr rhe h jinko hme cart se nhi hatana h (jinko cart se nhi htana usko rkh le rhe h baaaki ko hta de rhe h )
 await cartsss.save()
 res.status(201).json({message:"item removed successfully"})

}catch(error){
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}

export {addCart , getUserCart , removeCartItems}