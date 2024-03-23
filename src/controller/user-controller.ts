import {Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body
            const result = await UserService.register(request)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body
            const result = await UserService.login(request)
            res.status(200).json({
                data: result.token
            })
        } catch (error) {
            next(error)
        }
    }
}