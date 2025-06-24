export default {
    port: process.env.PORT || 9000,
    /*
    *Rest Api config
    */
    api:{
        prefix: '/api'
    },
    /*
    * Switch routes on/off
    */
    routes: {
        default: true,
        user: true
    },

    mongo: {
        protocol: process.env.MONGO_PROTOCOL,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        database: process.env.MONGO_DB_NAME,
        url: process.env.MONGO_URL
    }
};