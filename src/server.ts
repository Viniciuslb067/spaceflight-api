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
  cron.schedule('* * * * * *', async () => {
    // const responde = await fetch("https://api.spaceflightnewsapi.net/v3/articles")
    // const data = await responde.json();
    // try {
    //   // const result = await prismaClient.articles.createMany({ data, skipDuplicates: true });
    //   // c
    // } catch (err) {
    //   console.log(err)
    // }
    // console.log('opa rodou')
    
  });
});