/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { seedFeedback } from "./data/seed";
import { Feedback } from "./entity/Feedback";
import { User } from "./entity/User";

const PORT = 3001;

const main = async () => {
  const connection: Connection = await createConnection();

  const app = express();
  app.use(express.json());

  // must manually drop tables before running
  // await seedFeedback(connection);

  const userRepo = connection.getRepository(User);
  const feedbackRepo = connection.getRepository(Feedback);

  app.get("/users", async (_request, response) => {
    const allUsers = await userRepo.find();
    return response.send(allUsers);
  });

  app.get("/feedback", async (_request, response) => {
    const feedback = await feedbackRepo.find({ relations: ["user"] });
    return response.send(feedback);
  });

  app.listen(PORT, () => {
    console.log(`app listening on PORT: ${PORT}`);
  });
};

void main();
