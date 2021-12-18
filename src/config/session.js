import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

//Noi luu tru session
let sessionStore = new MongoStore({
    //url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    url: `mongodb+srv://tantoan:tantoan147@chataws.wn1ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    autoReconnect: true,
    // autoRemove: "native"
    
});

let config = (app) => {
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }));

};

module.exports = {
    config: config,
    sessionStore: sessionStore
};