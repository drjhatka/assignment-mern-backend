import express, { Request, Response } from 'express';
import { ValidateRequest } from '../../middleware/validate.request';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth.middleware';

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Create post test successful'
    })
})

router.post('/create-customer', auth('customer'), ValidateRequest(UserValidation.createUserValidationSchema),UserController.createUser )
router.get('/:email', UserController.getSingleUser)




export const UserRoutes = router