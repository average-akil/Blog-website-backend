import {
    stat
} from 'fs';
import {
    prisma
} from '../Databases/prisma.js'
import {
    flattenError,
    includes,
    z
} from 'zod'
import {
    userInfo
} from 'os';


export const getAllblogs = async (req, res) => {
    const Blogs = await prisma.blog.findMany();

    res.json({
        status: 'success',
        message: 'Blog fetched successfully',
        data: {
            Blogs
        }
    })

}

export const getABlog = async (req, res) => {
    const blogId = await prisma.params.id;

    const blogSchema = z.object({
        id: z.uuid()
    })

    const {
        success,
        data,
        error
    } = blogSchema.safeParse({
        id: blogId
    })

    if (!success) {
        return res.json(400).json({
            status: 'error',
            message: 'Bad request : Invalid Uuid format',
        })
    }

    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
        include: {
            category: true
        }
    })

    if (!product) {
        return res.status(400).json({
            status: 'error',
            message: 'Blog not found',
        })
    }

    res.json({
        status: 'success',
        message: 'Blog fetched successfully',
        data: {
            Blog
        }
    })

}


export const createBlog = async (req, res) => {
    const blogCreateSchema = z.object({
        title: z.string(),
        slug: z.string(),
        authorName: z.string().min(3),
        blogContent: z.string(),
        isFeatured: z.boolean().optional(),
        isActive: z.boolean().optional(),
        categoryId: z.uuid()

    })


    const {
        success,
        data,
        error
    } = blogCreateSchema.safeParse(req.body)

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request ' + error.errors.mao(e => e.message).join(', '),
        })
    }

    const category = await prisma.category.findUnique({
        where: {
            id: data.categoryId
        }
    })

    if (!category) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad reques : Invalid categoryId',
        })
    }


    const blogPayload = {
        title: data.title,
        slug: data.string,
        authorName: data.authorName,
        blogContent: data.blogContent,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
        categoryId: data.categoryId
    }

    const createBlog = await prisma.blog.create({
        data: blogPayload
    })

    res.json({
        status: 'success',
        message: 'Blog Created Successfully',
        data: {
            product: createBlog
        }
    })
}

export const updateBlog = async (req, res) => {
    const blogId = req.params.id;

    const BlogSchema = z.object({
        id: z.uuid()
    })

    const {
        success: paramSuccess,
        data: paramData,
        error: paramError
    } =
    blogSchema.safeParse({
        id: blogId
    })

    if (!paramSuccess) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request : Invalid UUID format',
        })
    }

    const blogUpdateSchema = z.object({
        title: z.string(),
        slug: z.string(),
        authorName: z.string().min(3),
        blogContent: z.string(),
        isFeatured: z.boolean().optional(),
        isActive: z.boolean().optional(),
        categoryId: z.uuid()
    })

    const {
        success: bodySuccess,
        data: bodyData,
        error: bodyError
    } = blogUpdateSchema.safeParse(req.body)


    if (!bodySuccess) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request: ' + bodyError.errors.map(e => e.message).join(', ')
        })
    }

    const existingBlog = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    })

    if (!existingBlog) {
        return res.status(404).json({
            status: 'error',
            message: 'Blog not found',
        })
    }
    const updatedBlog = await prisma.blog.update({
        where: {
            id: blogId
        },
        data: bodyData
    })

    res.json({
        status: 'success',
        message: 'Blog updated successfully',
        data: {
            blog: updatedBlog
        }
    })
}

export const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    const blogSchema = z.object({
        id: z.uuid()
    })

    const {
        success,
        data,
        error
    } = blogSchema.safeParse({
        id: blogId
    })

    if (!success) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request : Invalid UUID format',
        })
    }

    const existingBlog = await prisma.blog.findUnique({
        where: {
            id: blogId
        }
    })

    if (!existingBlog) {
        return res.status(404).json({
            status: 'error',
            message: 'Blog not found',
        })

    }

    const deletedBlog = await prisma.blog.delete({
        where: {
            id: blogId
        }
    })
    res.json({
        status: 'success',
        message: 'Blog deleted successfully',
        data: {
            blog: deketeProduct
        }
    })
}