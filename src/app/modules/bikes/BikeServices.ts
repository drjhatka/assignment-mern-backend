import mongoose from 'mongoose';
import { BikeModel } from './BikeSchema';
import Bike from './BikeInterface';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create = async (bike: Bike) => { return await BikeModel.create(bike) }

const getOne = async (Id: string) => {
    const bike :Bike|null= await BikeModel.findOne({ _id: new mongoose.Types.ObjectId(Id) })
    //console.log('bike', bike)
    return bike;
}

const getAll = async (query) => {
    let filter: any = {}; // Initialize an empty filter object
    console.log("Q- ",query)
    // 🔍 Apply text search for searchTerm (if provided)
    if (query.searchTerm) {
        const regex = new RegExp(query.searchTerm, "i"); // Case-insensitive search
        filter.$or = [
            { name: regex },
            { category: regex },
            { brand: regex },
        ];
    }

    // 🎯 Apply additional filters based on query parameters
    if (query.brand) {
        filter.brand = query.brand; // Exact match for brand
    }

    if (query.category) {
        filter.category = query.category; // Exact match for category
    }

    if (query.price) {
        const maxPrice = parseFloat(query.price);
        if (!isNaN(maxPrice)) {
            filter.price = { $lte: maxPrice }; // Price filter (≤ maxPrice)
        }
    }

    console.log("Generated Filter:", filter);
    
    const result = await BikeModel.find(filter);
    console.log('filtered bikes ', result)
    return result;
};

const updateOne = async (productId: string, updatedDoc: Bike) => {
    try {
        const result = await BikeModel.updateOne({ _id: new mongoose.Types.ObjectId(productId) }, {
            $set: updatedDoc // using bike interface type on updatedDoc doesn't allow extra fields to be added, but still shows a false flag of modified count
        })
        if ( result.modifiedCount === 1 && result.matchedCount === 1) { return true }
        return false
    } catch (err) {
        console.log('error', err)
    }
}
const deleteOne = async (productId: string) => {
    const result =await  BikeModel.deleteOne({ _id: new mongoose.Types.ObjectId(productId) })
    if (result.deletedCount == 1) {
        return true
    }
    return false
}

export const BikeServices = {
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne,
}