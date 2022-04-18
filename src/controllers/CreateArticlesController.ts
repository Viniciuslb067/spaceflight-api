import { Request, Response } from "express";
import { prismaClient } from '../database/prismaClient';
const fetch = require('node-fetch');

export class CreateArticlesController {
  async handle(request: Request, response: Response) {

    const { title, featured, newsSite, summary, url, events, launches, imageUrl, publishedAt  } = request.body;  

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
  }
}