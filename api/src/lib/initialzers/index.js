import { setupMongo } from "./mongo.js";
import { setupRoutes } from "./setupRoutes.js";


export const initializeApp = async (app, config) => {

    setupMongo(config);

    console.log(`\n ✅ - MongoDB setup and connected...`);

    setupRoutes(app);
    console.log(`\n ✅ - Express router and app routes complete...`)
};