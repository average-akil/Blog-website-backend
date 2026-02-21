import {
    Router
} from "express";
import {
    getCurrentUser,
    userSignIn,
    userSignUp
} from '../Controllers/authController.js'
import {
    authMiddleware
} from "../MiddleWare/authMiddleWare.js";


const router = Router();

router.post('/sign-up', userSignUp);
router.post('/sign-in', userSignIn);
router.get('/me', authMiddleware, getCurrentUser);


export default router;