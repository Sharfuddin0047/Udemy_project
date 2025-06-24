import config from "../config.js";
import routes from "../../routes/index.js"

export const setupRoutes = (app) => {
    const router = routes();
    app.use(config.api.prefix, router);

};