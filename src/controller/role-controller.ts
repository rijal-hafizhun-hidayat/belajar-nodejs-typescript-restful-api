import {Request, Response, NextFunction } from "express";
import { RoleResponseRequest } from "../model/role-model";
import { RoleService } from "../service/role-service";

export class RoleController {
    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RoleResponseRequest = req.body as RoleResponseRequest
            const result = await RoleService.store(request)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}