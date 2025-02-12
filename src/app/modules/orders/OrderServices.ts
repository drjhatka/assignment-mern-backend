import mongoose from "mongoose"
import Order, { Product } from './OrderInterface';
import OrderSchema from "./OrderSchema";
import { BikeModel } from "../bikes/BikeSchema";
import { TUser } from "../users/user.interface";
import { orderUtils } from "./order.utils";
import { Response } from "express";

const create = async (user:TUser, 
    product:Product[],
    client_ip:string,
    res:Response
) => { 
            let totalPrice = 0;
            //calculate total Price of all ordered products...
            const productDetails = await Promise.all(
                product.map(async (item: Product) => {
                    const bike = await BikeModel.findById(item.product);
                    if (bike) {
                        const subtotal = bike ? (bike.price || 0) * item.quantity : 0;
                        totalPrice += subtotal;
                        return item;
                    }
                })
            );

            //create order...
            let order = await OrderSchema.create({
                user: user,
                products: productDetails,
                totalPrice: totalPrice.toFixed(2),
            });
            //deduct each product quantity from the original bike quantity...
            productDetails.forEach(async(product)=>{
                //fetch the bike with product id
                const bike = await BikeModel.findById(product.product)
                //deduct ordered quantity from the bike quantity
                if( bike.quantity-product.quantity==0){
                    bike.quantity = bike.quantity-product.quantity
                    bike.inStock=false; // set in stock to false
                    await BikeModel.updateOne({_id:new mongoose.Types.ObjectId(product.product)}, bike)
                }
                else{
                    bike.quantity = bike.quantity-product.quantity
                    await BikeModel.updateOne({_id:new mongoose.Types.ObjectId(product.product)}, bike)
                }
            })
            //integrate shurjoPayment... 
            const shurjoPayload = {
                amount: totalPrice,
                order_id: order._id,
                currency:"BDT",
                customer_name:user.name ,
                customer_address:user.address,
                customer_email:user.email,
                customer_phone:user.phone,
                customer_city:user.city,
                client_ip,
            }
            const payment = await orderUtils.makePayment(shurjoPayload)
            return {order, payment}
}

const getOne = async (productId: string) => { return await OrderSchema.find({ productId: new mongoose.Types.ObjectId(productId) }) }

const getAll = async () => {return await OrderSchema.find({})}


const calculateTotalRevenue= async()=> {
    try {
        const res = await OrderModel.aggregate([
            // Step 1: Join `Order` with `Product`
            {
                $addFields: {
                    productId: { $toObjectId: "$productId" }, // Convert string to ObjectId
                },
            },
            {
                $lookup: {
                    from: 'bikes',
                    localField: 'productId',      // Field in Order
                    foreignField: '_id',          // Field in Product
                    as: 'productDetails',         // Alias for the joined data
                },
            },
            // Step 2: Unwind the `productDetails` array (since `$lookup` returns an array)
            {
                $unwind: '$productDetails',
            },
            //Step 3: Calculate revenue for each order
            {
                $project: {
                    productId: 1,
                    quantity: 1,
                    price: '$productDetails.price',
                    revenue: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            // Step 4: Group by product or calculate total revenue
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$revenue' }, // Sum up all revenues
                },
            },
        ]);
        return res[0].totalRevenue;
    } catch (err) {
        console.error(err);
    }
}
export const OrderServices ={
    create,
    getOne,
    getAll,
    calculateTotalRevenue
}