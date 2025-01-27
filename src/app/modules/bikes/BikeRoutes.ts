import express from 'express';
import { BikeController } from './BikeController';

//create express router...
const router = express.Router();

//define bike CRUD routes...

    router.get('/', BikeController.getAllBikes)
    router.get('/:productId', BikeController.getABike)
    router.post('/', BikeController.createBike)
    router.put('/:productId', BikeController.updateABike)
    router.delete('/:productId', BikeController.deleteABike)


export const BikeRoutes = router;