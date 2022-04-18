import cron from "node-cron";
import express from 'express';

import { router } from "./routes";

const port = process.env.API_PORT || 3008;

const app = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  cron.schedule('* * * * *', async () => {
    console.log('cron job running');
  });
});