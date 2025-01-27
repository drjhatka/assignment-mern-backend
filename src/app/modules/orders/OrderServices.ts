import mongoose from "mongoose"
import Order from './OrderInterface';
import {OrderModel} from "./OrderSchema"

const create = async (order: Order) => { return await OrderModel.create(order) }

const getOne = async (productId: string) => { return await OrderModel.find({ productId: new mongoose.Types.ObjectId(productId) }) }

const getAll = async () => {return await OrderModel.find({})}


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