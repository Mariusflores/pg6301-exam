import {Router} from "express";

const dishes = [

    {
        dish : "Bolognese"
    },
    {
        dish: "Carbonara"
    }
]

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/dishes", async (req, res) => {
        const dishes = await mongoDatabase.collection("dishes")
            .find()
            .toArray();
        res.json(dishes);
    });


    router.post("/dishes/new", (req, res) => {
        res.sendStatus(500);
    })
    return router;
}
