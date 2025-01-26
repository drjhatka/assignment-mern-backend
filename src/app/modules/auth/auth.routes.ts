import express from 'express';
import { AuthController } from './auth.controller';
import { ValidateRefreshToken, ValidateRequest } from '../../middleware/validate.request';
import { UserValidation } from '../users/user.validation';
import { AuthValidation } from './auth.validation';
import { auth } from '../../middleware/auth.middleware';
const router = express.Router()

router.post('/register', ValidateRequest(UserValidation.createUserValidationSchema), AuthController.createUser)
router.post('/login', ValidateRequest(AuthValidation.loginValidationSchema),AuthController.loginUser)
router.post('/refresh-token',auth('user', 'admin'),ValidateRefreshToken(AuthValidation.refreshTokenValidationSchema),AuthController.refreshToken)

export const AuthRoutes =router;