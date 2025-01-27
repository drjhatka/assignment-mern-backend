import express from 'express';
import { UserRoutes } from "../modules/users/user.routes";
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blogs/blog.routes';
import { AdminRoutes } from '../modules/admins/admin.routes';
import { BikeRoutes } from '../modules/bikes/BikeRoutes';

const router = express.Router()
const routes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/bikes',
        route:BikeRoutes
    },
]
routes.forEach(route => router.use(route.path, route.route))

export default router