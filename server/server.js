import express from "express"
import * as path from "path";
import dotenv from "dotenv"
import {MongoClient} from "mongodb";
import {DishesApi, LoginApi} from "./restfulApi.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


dotenv.config();

const app = express();


//Login
/*
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

 */

//Database connection
const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
    console.log("Connected to mongodb")
    app.use("/api/dishes", DishesApi(mongoClient.db("Catering")))
});

// login
/*
app.use((req, res, next) => {
    const {username} = req.signedCookies;
    req.user = users.find(u => u.username === username);
    //console.log("before")
    next();
    //console.log("after")
});
const users = [

    {
        username:"admin", password : "admin", fullName: "mr. admin"
    }
]

app.get("/login", (req, res) => {
    //console.log("inside")
    if (!req.user) {
        return res.sendStatus(401);
    }
    const {fullName, username} = req.user;
    res.json({ username, fullName });
})


app.post("/login", (req, res) => {
    // set a cookie
    // read the cookie in /login

    const { password, username } = req.body;

    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        res.cookie("username", username, {signed: true});
        res.sendStatus(200)
    } else {
        res.send(401);
    }
})

app.get("/users", (req, res) => {
    const cookieUsername = req.signedCookies.username;
    const user = users.find(u => u.username === cookieUsername);
    if (!req.user){
        return res.sendStatus(401)
    }
    res.json(users.map(({fullName, username}) => ({username, fullName}) ));
})

 */

app.use(express.static("../client/dist"))

app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"))
    }else{
        next();
    }
})


const server = app.listen(process.env.PORT || 3000, () => {

    console.log("server started at http://localhost:" + server.address().port)

})