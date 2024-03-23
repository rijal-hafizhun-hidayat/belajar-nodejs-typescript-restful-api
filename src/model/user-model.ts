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

export type LoginUserRequest = {
    username: string,
    password: string
}

export type LoginUserResponse = {
    token?: string | null
}

export function toUserResponse(user: user): UserResponse {
    return {
        username: user.username,
        role_id: user.role_id
    }
}

export function toLoginUserResponse(user: user): LoginUserResponse{
    return {
        token: user.token
    }
}