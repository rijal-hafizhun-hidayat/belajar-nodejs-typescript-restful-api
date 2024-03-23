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

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const id: number = parseInt(req.params.roleId)
            const result = await RoleService.findById(id)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async destroyById(req: Request, res: Response, next: NextFunction){
        try {
            const id: number = parseInt(req.params.roleId)
            const result = await RoleService.destroyById(id)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    

    static async updateDataById(req: Request, res: Response, next: NextFunction){
        try {
            const updateRoleRequest: RoleResponseRequest = req.body as RoleResponseRequest
            const roleId: number = parseInt(req.params.roleId)
            const result = await RoleService.updateDataById(updateRoleRequest, roleId)
            res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }      
    }
}