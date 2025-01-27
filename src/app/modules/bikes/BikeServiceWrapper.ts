import mongoose from "mongoose"
import { BikeModel } from "./BikeSchema"

const bikeWrapper = async (Id: string) => {
    return await BikeModel.find({ _id: new mongoose.Types.ObjectId(Id) })
    // Promise.resolve()

}

export const BikeServiceWrapper ={
    bikeWrapper
}