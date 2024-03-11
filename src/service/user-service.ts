import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { CreateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class UserService {
    static async register(request: CreateUserRequest) : Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.registerRequest, request)

        const totalUserWithSameUsername = await prisma.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if(totalUserWithSameUsername != 0){
            throw new ErrorResponse(400, 'username already exist')
        }

        const user = await prisma.user.create({
            data: {
                username: registerRequest.username,
                password: bcrypt.hashSync(registerRequest.password, 10),
                role_id: registerRequest.role_id
            }
        })

        return toUserResponse(user)
    }
}