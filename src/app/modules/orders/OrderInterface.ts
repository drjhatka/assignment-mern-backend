import { ObjectId } from "mongoose";
import Bike from "../bikes/BikeInterface";
import status from 'statuses';

 export interface Product {
    product:string;
    quantity:number;
 }
export interface Order {
    user: string;
    products:Product[];
    totalPrice:number;
    status:'Pending'|'Progress'| 'Completed'
}

export default Order;