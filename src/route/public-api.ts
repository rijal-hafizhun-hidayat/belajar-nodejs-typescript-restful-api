import express from "express";
import { UserController } from "../controller/user-controller";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router();

publicRoute.post('/api/register', UserController.register)
publicRoute.post('/api/role', RoleController.store)

export {
    publicRoute
}