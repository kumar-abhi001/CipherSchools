import express, { json } from "express";
import userRoute from "./src/routes/user.route.js";
import adminRoute from "./src/routes/admin.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));


app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
export default app;