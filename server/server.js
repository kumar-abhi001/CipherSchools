import express from "express";
import { ConnectDB } from "./src/db/connect.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

ConnectDB()
    .then(() => {
        app.listen(process.env.PORT, (error) => {
            if (error) {
                return console.log("Error while starting the server:", error);
            }
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }).catch((error) => {
        return console.log("Error while connecting to DB:", error);
    });