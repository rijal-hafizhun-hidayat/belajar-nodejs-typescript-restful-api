import express, { Express, Request, Response, NextFunction } from "express";

const web = express()

web.use(express.json())
web.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        data: 'hello world'
    })
})

export {
    web
}