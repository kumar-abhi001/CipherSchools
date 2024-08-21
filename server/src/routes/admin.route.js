import { Router } from "express";
import { addQuestion, createTest } from "../controllers/admin/admin.controller.js";

const adminRoute = Router();

adminRoute.route("/").get((req, res) => {
    res.send("Hello World");
});

adminRoute.route("/addquestion").post(addQuestion);
adminRoute.route("/createtest").post(createTest);

export default adminRoute;