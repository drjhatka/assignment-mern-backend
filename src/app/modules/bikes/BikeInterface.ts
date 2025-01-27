import mongoose,{Document} from "mongoose";

enum BikeTypes {
    'Mountain',
    'Road',
    'Hybrid',
    'Electric'
}

interface Bike extends Document {
    name:string;
    brand:string;
    price:number;
    category: BikeTypes;
    description:string;
    quantity:number;
    inStock:boolean;
    image?:string;
}

export default Bike