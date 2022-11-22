import express from "express"
import request from "supertest";
import bodyParser from "body-parser";
import {DishesApi} from "../restfulApi.js";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json)
let mongoClient;


beforeAll( async () => {
    dotenv.config()
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    const db = mongoClient.db("unit_test")
    await db.collection("dishes").deleteMany({});
    app.use("/api/dishes", DishesApi(db))
})

afterAll( () => {
    mongoClient.close();
})

describe("dishes api test suite", () => {
    it('does something ', async () => {
        const title = "Some dish";
        await request(app)
            .post("/api/dishes")
            .send({title})
            .expect(200)

        expect(
            await request(app).get("/api/dishes").query({title}).expect(200)
        ).body.map(({title}) => title).toContain(title);
    });
})