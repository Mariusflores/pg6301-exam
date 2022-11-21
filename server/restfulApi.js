import {Router} from "express";

export function DishesApi(mongoDatabase) {
    const router = new Router();


    router.get("/", async (req, res) => {
        const dishes = await mongoDatabase.collection("dishes")
            .find()
            .toArray();
        res.json(dishes);
    });


    router.post("/", (req, res) => {
        res.sendStatus(500);
    })
    return router;
}
