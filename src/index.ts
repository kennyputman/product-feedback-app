import express from "express";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { User } from "./entity/User";
// import data from "./data.json";

const PORT = 3001;

const main = async () => {
  const connection: Connection = await createConnection();

  const app = express();
  app.use(express.json());

  const userRepo = connection.getRepository(User);

  // userRepo.clear();
  // const user = new User();
  // user.firstName = "Suzanne";
  // user.lastName = "Chang";
  // user.username = "upbeat1811";
  // user.image = "./assets/user-images/image-suzanne.jpg";
  // await userRepo.save(user);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get("/users", async (_request, response) => {
    const allUsers = await userRepo.find();
    response.send(allUsers);
  });

  app.listen(PORT, () => {
    console.log(`app listening on PORT: ${PORT}`);
  });
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
