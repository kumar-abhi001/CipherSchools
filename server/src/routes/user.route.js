import { Router } from "express";
import { registerUser, loginUser, logoutUser, allQuestions, allTests, submitTest, testQuestion} from "../controllers/users/user.controller.js";
const userRoute = Router();

userRoute.route("/").get((req, res) => { 
    res.send("Hello World");
});

userRoute.route("/register").post(registerUser);
userRoute.route("/login").post(loginUser);
userRoute.route("/logout").post(logoutUser);
userRoute.route("/questions").get(allQuestions);
userRoute.route("/alltest").get(allTests);
userRoute.route("/test/start").get(testQuestion);
userRoute.route("/submit").post(submitTest);

export default userRoute;