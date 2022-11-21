import express from "express"
import * as path from "path";
import dotenv from "dotenv"
import {MongoClient} from "mongodb";
import {DishesApi, MoviesApi} from "./restfulApi.js";


dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
    console.log("Connected to mongodb")
    app.use("/api/movies", MoviesApi(mongoClient.db("Catering")))

});

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