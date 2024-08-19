import { Router } from "express";

const userRoute = Router();

userRoute.route("/").get((req, res) => { 
    res.send("Hello World");
});

export default userRoute;