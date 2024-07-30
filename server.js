// Here is where we import modules
// We begin by loading Express
import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose" 
import Fruit from "./models/fruit.js"

dotenv.config(); // Loads the environment variables from .env file
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: false }));


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


// GET /fruits/new
app.get("/fruits/new", async (req, res) => {
    res.render("fruits/new.ejs");
  });



// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });
  
  

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(4000, () => {
        console.log("Listening on port 3000");
        });
})
