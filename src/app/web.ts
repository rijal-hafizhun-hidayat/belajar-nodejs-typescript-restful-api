import express from "express";
import { publicRoute } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRoute } from "../route/api";

const web = express()
web.use(express.json())
web.use(publicRoute)
web.use(apiRoute)
web.use(errorMiddleware)

export {
    web
}