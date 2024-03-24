import { role } from "@prisma/client"

export type RoleResponseRequest = {
    name: string
}

export type RoleIdResponseRequest = {
    id: Number
}

export function toRoleResponse(role: role): RoleResponseRequest{
    return {
        name: role.name
    }
}