import {Request, Response, NextFunction } from "express";
import { CreateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest
            const result = await UserService.register(request)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}