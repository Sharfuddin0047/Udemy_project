import express from "express";

const defaultRouter = express.Router();

export const defaultRoutes = (router) => {

    router.use('/', defaultRouter);

    defaultRouter.get('/ping', (req, res) => {
        console.log(`⬆️ - Hitting ping handler ${req.url} - ${Date.now()}`);
        res.status(200).json({
            code: 200,
            message: '✅ - pong : test Successful'
        });
    });

    defaultRouter.all('/ping', (req, res) => {
        const code = 405;
        res.status(code).json({
            code,
            message: `${req.method} method is not allowed for route ${req.url}`
        });
    });

    defaultRouter.all('*splat', (req, res) => {
        const code = 404;
        res.status(code).json({
            code,
            message: `${req.url} not found`
        });
    });
}