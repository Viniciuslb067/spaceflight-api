import { Router } from "express";
import { CreateArticlesController } from "./controllers/CreateArticlesController";

const router = Router();

const createArticles = new CreateArticlesController();

router.post("/articles", createArticles.handle);

export { router }