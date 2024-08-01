// controllers/fruits.js

import Fruit from '../models/fruit.js'

const index = async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
}

export {
    index
}

