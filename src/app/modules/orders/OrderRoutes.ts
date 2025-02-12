import express from 'express';
import { OrderController } from './OrderController';
import { auth } from '../../middleware/auth.middleware';
//import { OrderServices } from './OrderServices';

//create express router...
const router = express.Router();

//define bike CRUD routes...

    router.post('/', auth('customer'),OrderController.createOrder)
    router.get('/orders/revenue', OrderController.calculateRevenue)


export const OrderRoutes = router;