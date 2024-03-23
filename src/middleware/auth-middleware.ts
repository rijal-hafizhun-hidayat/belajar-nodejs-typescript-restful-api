import {Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken"
import { prisma } from "../app/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token: string = req.get('Authorization')!

    if(!token){
        return res.status(401).json({
            data: 'unauthorized'
        }).end()
    }

    Jwt.verify(token, 'swefijlzc22@#()33vsd', async function(err, decoded) {
        if(err){
            return res.status(401).json({
                errorToken: err.name,
                errorMessage: err.message,
            }).end()
        }
        else{
            const user = await prisma.user.findFirst({
                where: {
                    token: token
                }
            })
    
            if(!user){
                return res.status(401).json({
                    data: 'unauthorized'
                }).end()
            }
            else{
                req.user = user
                return next()
            }
        }
    });
}