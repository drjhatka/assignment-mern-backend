import express from 'express';
import { OrderController } from './OrderController';
//import { OrderServices } from './OrderServices';

//create express router...
const router = express.Router();

//define bike CRUD routes...

    router.post('/orders', OrderController.createOrder)
    router.get('/orders/revenue', OrderController.calculateRevenue)


export const OrderRoutes = {router};