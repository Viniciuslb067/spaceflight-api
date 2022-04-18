import { Request, Response } from "express";
import { prismaClient } from '../database/prismaClient';

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
      publishedAt  
    } = request.body;  

    try {
      const articles = await prismaClient.articles.create({
        data: {
          title, 
          featured, 
          newsSite, 
          summary, 
          url, 
          events, 
          launches,
          imageUrl,
          publishedAt
        }
      })

      return response.json(articles);

    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const articles = await prismaClient.articles.findFirst({
        where: {
          id,
        },
      });
  
      return response.json(articles);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async list(_: Request, response: Response) {
    try {
      const articles = await prismaClient.articles.findMany({
        skip: 0,
        take: 10,
      });

      return response.json(articles);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const newArticle = request.body;

    try {
      const article = await prismaClient.articles.update({
        where: {
          id
        },
        data: newArticle
      })

      return response.json(article);

    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prismaClient.articles.delete({ where: { id } })

      return response.json({ message: 'Artigo removido com sucesso!' });

    } catch (err) {
      return response.status(400).json(err);
    }
  }

}