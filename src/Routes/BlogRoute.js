import {
    Router
} from "express";
import {
    getAllblogs,
    getABlog,
    createBlog,
    updateBlog,
    deleteBlog
} from '../Controllers/blogController.js'
import {
    authmiddleWare
} from '../MiddleWare/authMiddleWare.js'
const router = Router();

router.get('/', getAllblogs);
router.get(':/id', getABlog)
router.post('/', createBlog)
router.patch('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router;