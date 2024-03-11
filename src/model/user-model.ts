import { user } from "@prisma/client"


export type UserResponse = {
    username: string,
    role_id: number,
    token?: string
}

export type CreateUserRequest = {
    username: string,
    password: string,
    role_id: number
}

export function toUserResponse(user: user): UserResponse {
    return {
        username: user.username,
        role_id: user.role_id
    }
}