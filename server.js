// Here is where we import modules
// We begin by loading Express
import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose" 

dotenv.config(); // Loads the environment variables from .env file
const app = express();

mongoose.connect(process.env.MONGODB_URI);


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(3000, () => {
        console.log("Listening on port 3000");
        });
})
