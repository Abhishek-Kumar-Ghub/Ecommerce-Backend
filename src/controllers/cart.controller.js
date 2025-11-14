import cart from "../models/cart.js"

const addCart=async(req,res)=>{
try {
    const {productid , quantity}=req.body
    let carts=await cart.findOne({user:req.user._id})
    if(!carts){
    carts=await cart.create({items:[{product:productid,quantity}],user:req.user._id})
    }
    else{
        const item=carts.items.find(i=>i.product.toString()===productid)
        if(item){
            item.quantity +=quantity;
        } else{
            carts.items.push({product:productid , quantity})
        }
        await carts.save() 
    }
res.status(201).json({message:"cart created successfully"})
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}

const getUserCart =async(req,res)=>{
try {
    const cartss=await cart.findOne({user:req.user._id}).populate("items.products")
    res.status(200).json({message:"cart id fetched", cartss})
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}

const removeCartItems=async(req,res)=>{
try{




}catch(error){

    

}


}