import {
    prisma
} from '../Databases/prisma'
import {
    z
} from 'zod'

export const getAllCategory = async (req, res) => {
    const categories = await prisma.category.find
}

export const getACategory = async (req, res) => {
    return 'got gim'
}

export const createCategory = async (req, res) => {
  const { name , slug , description , pare }
}