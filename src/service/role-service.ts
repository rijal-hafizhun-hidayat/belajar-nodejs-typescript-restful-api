import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { RoleResponseRequest, toRoleResponse } from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService {
    static async store(request: RoleResponseRequest): Promise<RoleResponseRequest>{
        const requestRole = Validation.validate(RoleValidation.RoleRequest, request)

        const role = await prisma.role.create({
            data: {
                name: requestRole.name
            }
        })

        return toRoleResponse(role)
    }

    static async findById(roleId: number): Promise<RoleResponseRequest>{
        const isRoleExist = await prisma.role.findUnique({
            where: {
                id: roleId
            }
        })

        if(!isRoleExist){
            throw new ErrorResponse(404, 'role not found')
        }

        return toRoleResponse(isRoleExist)
    }

    static async destroyById(roleId: number): Promise<RoleResponseRequest>{
        const isRoleExist = await prisma.role.findUnique({
            where: {
                id: roleId
            }
        })

        if(!isRoleExist){
            throw new ErrorResponse(404, 'role not found')
        }
        
        const role = await prisma.role.delete({
            where: {
                id: roleId
            }
        })

        return toRoleResponse(role)
    }

    static async updateDataById(request: RoleResponseRequest, roleId: number){
        const updateRoleRequest = Validation.validate(RoleValidation.RoleRequest, request)
        const isRoleExist = await prisma.role.findUnique({
            where: {
                id: roleId
            }
        })

        if(!isRoleExist){
            throw new ErrorResponse(404, 'role not found')
        }

        const role = await prisma.role.update({
            where: {
                id: roleId
            },
            data: {
                name: updateRoleRequest.name
            }
        })

        return toRoleResponse(role)
    }
}