import express from "express";
import { publicRoute } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express()
web.use(express.json())
web.use(errorMiddleware)
web.use(publicRoute)

export {
    web
}