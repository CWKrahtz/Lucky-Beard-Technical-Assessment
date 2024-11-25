import express from "express";
import AppDataSource from "../appDataSource";
import { Article } from "../entity/article";

const articleRouter = express.Router()

articleRouter.use(express.json())

const appDataSource = AppDataSource;

//GET ALL ARTICLES
articleRouter.get("/", async (req, res) => {

    try {
        const articles = await appDataSource.manager.find(Article);
        res.json(articles)

    } catch (error) {
        console.log("[articleRoute]: Something went wrong '/' ")
        res.status(500).json({ message: error })
    }

})

//GET ONE BY ID (SINGLE)
articleRouter.get("/:id", async (req, res) => {

    try {
        var id = parseInt(req.params.id);

        const articles = await appDataSource.getRepository(Article).findOneBy({ id: id });

        //findBy = Array
        //findOneBy = 1

        res.send(articles);

    } catch (error) {
        console.log("[articleRoute]: Something went wrong '/' ")
        res.status(500).json({ message: error })
    }


})

// GET MANY ARTICLES BY CATEGORY
articleRouter.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    let result = await appDataSource.getRepository(Article).findBy({ category: category });
    
    if (result.length === 1) {
        result = await appDataSource.getRepository(Article).find();
    }
    

    res.json(result);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    res.status(500).send('Server error');
  }
});


articleRouter.post("/create", async (req, res) => {
  try {
    const { author, title, category, image, content, published_at } = req.body;

    const articleRepository = appDataSource.getRepository(Article);
    const newArticle = articleRepository.create({
      author,
      title,
      category,
      image: image || "",
      content,
      published_at
    });
    
    const result = await articleRepository.save(newArticle);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ 
      message: "Failed to create article",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default articleRouter;