import Bike from '../modules/bikes/BikeInterface';
import { BikeModel } from '../modules/bikes/BikeSchema';
import { Product } from '../modules/orders/OrderInterface';
import { sendErrorResponse } from './sendErrorResponse';
export const checkStockAvailability = async(idArray:Product[])=>{
    let bikesArray:Bike[]=[];
    const bikePromise =idArray.map(async(product:Product) => {
        const bike = await BikeModel.findById(product.product)
        //check if the bike quantity exceeds available stock
        if(product.quantity>bike.quantity){
            return false;
        }
        //check if stock goes to zero
        else if(bike.quantity-product.quantity==0){
            console.log('zero', bike.quantity-product.quantity==0)
            bike.quantity -=product.quantity
            bike.inStock=false;
            bikesArray.push(bike)
        }
        else{
            bike.quantity -= product.quantity
            bikesArray.push(bike)
        }
    });
    //await Promise.all(bikePromise)
    //console.log('bike array', bikesArray.length)
    return bikesArray;
}