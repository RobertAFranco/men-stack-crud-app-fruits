// Here is where we import modules
// We begin by loading Express
import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose" 
import methodOverride from "method-override"
import morgan from "morgan"
import Fruit from "./models/fruit.js"

import * as fruitsCtrl from "./controllers/fruits.js"

dotenv.config(); // Loads the environment variables from .env file
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


// GET /fruits/new
app.get("/fruits/new", fruitsCtrl.newFruits);


// GET /fruits
app.get("/fruits", fruitsCtrl.index);
    
  
// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  });
  
  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", {fruit: foundFruit});
  });

  app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

  app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });

  // server.js

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  
  
  
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(3000, () => {
        console.log("Listening on port 3000");
        });
})
