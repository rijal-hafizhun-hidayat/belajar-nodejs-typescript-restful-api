import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { CreateUserRequest, LoginUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

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

    static async login(request: LoginUserRequest): Promise<UserResponse>{
        const loginUserRequest = Validation.validate(UserValidation.loginRequest, request)
        
        const user = await prisma.user.findUnique({
            where: {
                username: loginUserRequest.username
            }
        })

        if(!user){
            throw new ErrorResponse(404, 'username or password is wrong')
        }

        const isUserPasswordValidate = bcrypt.compare(loginUserRequest.password, user.password)

        if(!isUserPasswordValidate){
            throw new ErrorResponse(404, 'username or password is wrong')
        }

        const token = Jwt.sign({
            id: user.id
        }, 'swefijlzc22@#()33vsd', { expiresIn: 60 * 60 });

        const userToken = await prisma.user.update({
            where: {
                username: loginUserRequest.username
            },
            data: {
                token: token
            }
        })
        

        const response = toUserResponse(userToken)
        response.token = userToken.token!

        return response
    }
}