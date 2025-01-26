import  express  from 'express';
import { BlogController } from './blog.controller';
import { ValidateRequest } from '../../middleware/validate.request';
import { auth } from '../../middleware/auth.middleware';
import { BlogValidation } from './blog.validation';
import { USER_ROLE } from '../users/user.constants';
const router = express.Router()

router.post('/',auth(USER_ROLE.user, USER_ROLE.admin),ValidateRequest(BlogValidation.createBlogValidationSchema), BlogController.createBlog )
router.get('/', BlogController.getAllBlogs )
router.get('/:id', BlogController.getSingleBlog )
router.patch('/:id',auth('user'), ValidateRequest(BlogValidation.updateBlogValidationSchema), BlogController.updateBlog )
router.delete('/:id', auth('user'), BlogController.deleteBlog )


export const BlogRoutes =router;