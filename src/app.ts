import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());

app.use("/api/users", userRoutes)


app.get("/" , (_req, res) => {
    res.send("Welcome to the Package Traker API")
})

//Connection to MongoDB

mongoose
.connect(process.env.MONGO_URI || "")
.then(() =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>{
        console.log(`Server running on http://localhost:${PORT}`)
    }
    )
}).catch((err) => {
    console.error ("Error connecting to MongoDB : " , err);
})