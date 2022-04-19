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
    } = request.body;  

    try {
      const articles = await prismaClient.articles.create({
        data: {
          title, 
          featured: featured || false, 
          newsSite, 
          summary, 
          url, 
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
          imageUrl,
        }
      })

      return response.json(articles);

    } catch (err) {
      console.log(err)
      return response.status(400).json(err);
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
    const query = request.query;

    try {
      const articles = await prismaClient.articles.findMany({
        where: {
          OR: [
            {
              title: {
                startsWith: query.title as string,
                mode: 'insensitive',
              }
            },
          ]
        }
      });

      return response.json(articles);
    } catch (err) {
      return response.status(400).json(err);
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
        data: newArticle
      })

      return response.json(article);

    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    const idFormated = parseInt(id);
    try {
      await prismaClient.articles.delete({ where: { id: idFormated } })

      return response.json({ message: 'Artigo removido com sucesso!' });

    } catch (err) {
      return response.status(400).json(err);
    }
  }

}