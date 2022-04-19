import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class ArticlesController {
  async create(request: Request, response: Response) {
    const {
      title,
      featured,
      newsSite,
      summary,
      url,
      events,
      launches,
      imageUrl,
    } = request.body;

    if (!title) return response.status(400).json({ error: "Título é obrigatório" });
    if (!newsSite) return response.status(400).json({ error: "Site news é obrigatório" });
    if (!summary) return response.status(400).json({ error: "Sumário é obrigatório" });
    if (!url) return response.status(400).json({ error: "Url é obrigatório" });
    if (!imageUrl) return response.status(400).json({ error: "Url da imagem é obrigatório" });

    try {
      const articles = await prismaClient.articles.create({
        data: {
          title,
          featured: featured || false,
          newsSite,
          summary,
          url,
          imageUrl,
          events: {
            createMany: {
              data: events || [],
            },
          },
          launches: {
            createMany: {
              data: launches || [],
            },
          },
  },
      });

      return response.json(articles);
    } catch (err) {
     
      return response.status(400).json({ error: "Não foi possível criar o artigo" });
    }
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const idFormated = parseInt(id);

    try {
      const articles = await prismaClient.articles.findFirst({
        where: {
          id: idFormated,
        },
      });

      return response.json(articles);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async list(request: Request, response: Response) {
    const { title, order_by, take, skip } = request.query;

    try {
      const articles = await prismaClient.articles.findMany({
        where: {
          title: {
            startsWith: title as string,
            mode: "insensitive",
          },
        },
        orderBy: {
          publishedAt: order_by?.toString().trim() as any,
        },
        take: parseInt(take as string) || 10,
        skip: parseInt(skip as string) || 0,
      });

      return response.json(articles);
    } catch (err) {

      return response.status(400).json({ error: "Não foi possível listar os artigos" });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const idFormated = parseInt(id);

    const newArticle = request.body;

    try {
      const article = await prismaClient.articles.update({
        where: {
          id: idFormated,
        },
        data: newArticle,
      });

      return response.json(article);
    } catch (err) {
      return response.status(400).json({  error: "Não foi possível atualizar o artigo" });
    }
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    const idFormated = parseInt(id);
    try {
      await prismaClient.articles.delete({ where: { id: idFormated } });

      return response.json({ message: "Artigo removido com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: "Não foi possível remover o artigo" });
    }
  }
}
