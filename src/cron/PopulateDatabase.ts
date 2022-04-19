const fetch = require("node-fetch");
import { prismaClient } from "../database/prismaClient";

export async function populateDatabase() {
  const responde = await fetch(
    "https://api.spaceflightnewsapi.net/v3/articles"
  );
  const data: Articles[] = await responde.json();
  try {
    data.map(async (item) => {
      await prismaClient.articles.createMany({
        data: {
          id: parseInt(item.id),
          title: item.title,
          url: item.url,
          featured: item.featured,
          newsSite: item.newsSite,
          summary: item.summary,
          imageUrl: item.imageUrl,
          publishedAt: item.publishedAt,
        },
        skipDuplicates: true,
      });
    });
  } catch (err: any) {
    throw new Error(
      "Ocorreu um erro ao tentar inserir os dados no banco de dados",
      err
    );
  }
}
