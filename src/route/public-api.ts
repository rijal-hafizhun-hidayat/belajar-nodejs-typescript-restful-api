import express from "express";
import { UserController } from "../controller/user-controller";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router();

publicRoute.post('/api/register', UserController.register)
publicRoute.post('/api/login', UserController.login)
//role
publicRoute.post('/api/role', RoleController.store)
publicRoute.get('/api/role/:roleId', RoleController.findById)
publicRoute.delete('/api/role/:roleId', RoleController.destroyById)
publicRoute.put('/api/role/:roleId', RoleController.updateDataById)

export {
    publicRoute
}