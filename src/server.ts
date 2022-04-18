import cron from "node-cron";
import express from 'express';
import cors from "cors";

const fetch = require('node-fetch');

import { router } from "./routes";
import { prismaClient } from "./database/prismaClient";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 3008, () => {
  console.log(`Server is running on port ${process.env.PORT || 3008}`);
  cron.schedule('0 9 * * *', async () => {
    const responde = await fetch("https://api.spaceflightnewsapi.net/v3/articles")
    const data: Articles[] = await responde.json();
    try {
      data.map(async (item) => {
        await prismaClient.articles.createMany({
            data: {
              title: item.title,
              featured: item.featured,
              newsSite: item.newsSite,
              summary: item.summary,
              url: item.url,
              imageUrl: item.imageUrl,
              publishedAt: item.publishedAt,
              id: parseInt(item.id),
            },
            skipDuplicates: true,
          })
        });
    } catch (err) {
      console.log(err)
    }
  });
});