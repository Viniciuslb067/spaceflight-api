import { Request, Response, Router } from "express";
import { ArticlesController } from "./controllers";

const router = Router();

const articlesController = new ArticlesController();

router.get("/", (_: Request, response: Response) => {
  response.status(200).json({
    message: "Fullstack Challenge 2021 🏅 - Space Flight News"
  });
})

router.get("/articles", articlesController.list);
router.get("/articles/:id", articlesController.findById);
router.post("/articles", articlesController.create);
router.put("/articles/:id", articlesController.update);
router.delete("/articles/:id", articlesController.remove);

export { router }