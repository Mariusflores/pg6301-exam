import express, {Router} from "express";

export function DishesApi(mongoDatabase) {
    const router = new Router();


    router.get("/", async (req, res) => {
        const dishes = await mongoDatabase.collection("dishes")
            .find()
            .toArray();
        res.json(dishes);
    });


    router.post("/", (req, res) => {
            const {title} = req.body;

            mongoDatabase.collection("dishes").insertOne({title})
            res.sendStatus(204);
            console.log("dish added to database")
    })
    return router;
}

export function LoginApi(){

   return null;
}
