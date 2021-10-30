import express from "express";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import data from "./data.json";

const main = async () => {
  const PORT = 3001;

  const connection: Connection = await createConnection();
  const app = express();

  app.use(express.json());

  app.get("/all", (reqeust, response) => {
    response.send(data);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

main();
