import { ZodType, z } from "zod";

export class UserValidation {
    static readonly registerRequest : ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        role_id: z.number()
    })
}