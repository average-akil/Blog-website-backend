import {
    stat
} from 'fs';
import {
    prisma
} from '../Databases/prisma.js'
import {
    flattenError,
    z
} from 'zod'
import {
    userInfo
} from 'os';

export const getAllUsers = async (req, res) => {

    const users = await prisma.user.findMany({
        omit: {
            passwordHash: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json({
        status: 'success',
        message: 'Users fetched successfully',
        data: {
            users
        }
    })

}


export const getUserById = async (req, res) => {
    const userid = req.params.id;

    const userGetSchema = z.object({
        id: z.uuid(),
    })

    const {
        success,
        error
    } = userGetSchema.safeParse({
        id: userid,
    })

    if (!success) {
        return res.status(400).json({
            message: 'Validation failed',
            data: flattenError(error)
        })
    }


    const user = await prisma.user.findUnique({
        where: {
            id: userid
        },
        omit: {
            passwordHash: true
        }
    })

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    res.json({
        status: 'success',
        message: 'User fetched successfully',
        data: {
            user
        }
    })

}

export const updateUser = async (req, res) => {
    const userId = req.params.id;

    const userUpdateSchema = z.object({
        id: z.uuid(),
        firstName: z.string().optional(),
        lastName: z.string().optional()
    });

    const {
        success,
        data,
        error
    } = userUpdateSchema.safeParse({
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    if (!success) {
        return res.status(400).json({
            message: 'Validation failed',
            data: z.flattenError(error)
        })
    }

    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: user,
        omit: {
            passwordHash: true
        }
    })

    res.json({
        status: 'success',
        message: 'User Updated Successfully',
        data: {
            user: updatedUser
        }
    })
}

export const deleteUser = async (req, res) => {

    const userId = req.params.id;
    const userDeleteSchema = z.object({
        id: z.uuid(),
    })

    const {
        success,
        error
    } = userDeleteSchema.safeParse({
        id: userId,
    })

    if (!success) {
        return res.status(400).json({
            message: 'Validaton failed',
            data: flattenError(error)
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user){
        return res.status(404).json(
            {
                message : 'Validation failed',
                data : z.flattenError(error)
            }
        )
    }

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            },
            omit: {
                passwordHash: true
            }
        });

    res.json({
        status: 'success',
        message: 'User deleted successfully',
        data: {
            user: deletedUser
        }
    })
}