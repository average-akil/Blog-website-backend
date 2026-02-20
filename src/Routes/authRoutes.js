import {
    Router
} from "express";
import {
    getCurrentUser,
    userSignIn,
    userSignUp
} from '../Controllers/authController.js'


const router = Router();

router.post('/sign-up', userSignUp);
router.post('/sign-in', userSignIn);
router.get('/me', getCurrentUser);


export default router;