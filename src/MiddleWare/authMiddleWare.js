import {
    prisma
} from '../Databases/prisma.js';
import jwt from 'jsonwebtoken';



export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }


    const accesstoken = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(accesstoken, secretKey, async (err, decoded) => {

        // this jwt.verify function checks :
        //    if the token is valid 
        //    checks if tokens are expired 
        //    decodes the payload if valid
        if (err) {
            // if token is not valid and there is ane error this if condition returns it
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }

        const userId = decoded.sub;
        // sub diye kaaj kora hcche jwt er ekta standard approach
        // original payload ta hcce decoded e thakee. jwt.sign theke ashe oita
        //         Example decoded payload:
        // javascript{
        //   sub: "123e4567-e89b-12d3-a456-426614174000",
        //   iat: 1700000000,
        //   exp: 1700604800
        // }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            omit: {
                passwordHash: true
            }
        });
        // e function diyee amra j user e login korte chacchi okee khujee ber kori ar ki.( Fetch User from Database )

        console.log('Authentic User: ', user)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        req.user = user; // Attach User to Request
        // jakee khujee ber korsi takee request er shathe lagai dilam


        next();
    })

}