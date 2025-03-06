import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const key = "0f7e1eeb01e34246a68313ea587af7cb";


// console.log("api key:" , key);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
  });


app.post("/search", async(req,res) =>{
    const {query} = req.body;
    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key}`);
        const recipes = response.data.results;
        res.render("results.ejs", {recipes});
    }catch (error) {
        console.error("Error fetching recipes:", error.response ? error.response.data : error.message);
        res.send("An error occurred while fetching recipes. Please try again later.");
    }

});


app.get("/recipe/:id", async (req, res) => {
    const recipeId = req.params.id;
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${key}`);
      const recipe = response.data;
      res.render("view-recipe.ejs", { recipe });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      res.status(500).send("Error fetching recipe details");
    }
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  