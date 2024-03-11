import { prisma } from "../app/database";
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
}