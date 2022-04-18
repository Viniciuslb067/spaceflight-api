import cron from "node-cron";
import express from 'express';

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3008, () => {
  console.log('Server is running on port 3008');
  cron.schedule('* * * * *', async () => {
    console.log('cron job running');
  });
});