import { Connection } from "typeorm";
import { Category } from "../types/types";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userData } from "../data/userData";

dotenv.config();

const seedUsers = async (connection: Connection) => {
  const userRepo = connection.getRepository(User);
  const password = String(process.env.SEED_DB_PASSWORD);

  const hashedPassword = await bcrypt.hash(password, 10);

  const users = userData;

  await Promise.all(
    users.map(async (user) => {
      const userSplit = user.name.split(" ");

      const newUser = {
        username: user.username,
        image: user.image,
        firstName: userSplit[0],
        lastName: userSplit[1],
        password: hashedPassword,
      };

      await userRepo.create(newUser).save();
    })
  );
};

const seedFeedback = async (connection: Connection) => {
  await seedUsers(connection);

  const feedbackRepo = connection.getRepository(Feedback);
  const userRepo = connection.getRepository(User);

  const user = await userRepo.findOne({
    where: { username: "arlen_the_marlin" },
  });

  const newFeedback = {
    title: "Add a dark theme option",
    category: Category.FEATURE,
    description: "Stay updated on comments and solutions other people post",
    user: user,
  };

  await feedbackRepo.create(newFeedback).save();
};

export { seedUsers, seedFeedback };
