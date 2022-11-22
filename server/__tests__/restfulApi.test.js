import express from "express"
import request from "supertest";
import bodyParser from "body-parser";
import {DishesApi} from "../restfulApi.js";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(30000);
const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
    await mongoClient.connect();
    const database = mongoClient.db("unit_test");
    await database.collection("dishes").deleteMany({});
    app.use("/api/dishes", DishesApi(database));
});
afterAll(() => {
    mongoClient.close();
});

describe("rest api", () => {
    it("adds a new dish", async () => {

        const title = "my dish";
        const description = "some dish"
        console.info("adding to db")
        await request(app)
            .post("/api/dishes")
            .send({ title, description })
            .expect(200);
        console.info("added to db")
        expect(
            (
                await request(app).get("/api/dishes").expect(200)
            ).body.map(({ title }) => title)
        ).toContain(title);
    });
});
