import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const apiRoute = express.Router()
apiRoute.use(authMiddleware)

apiRoute.get('/api/current-login', UserController.currentUserLogin)

export {
    apiRoute
}