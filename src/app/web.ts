import express from "express";
import { publicRoute } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRoute } from "../route/api";
import cors from 'cors';

const web = express()

const corsOrigin = {
    origin:'http://localhost:5173', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}

web.use(cors(corsOrigin))
web.use(express.json())
web.use(publicRoute)
web.use(apiRoute)
web.use(errorMiddleware)

export {
    web
}