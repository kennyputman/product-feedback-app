import { Connection } from "typeorm";
import { Category } from "../types/types";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const seedUsers = async (connection: Connection) => {
  const userRepo = connection.getRepository(User);
  const password = typeof String(process.env.SEED_DB_PASSWORD);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUsers = [
    {
      password: hashedPassword,
      firstName: "Victoria",
      lastName: "Meijia",
      username: "arlen_the_marlin",
    },
    {
      password: hashedPassword,
      firstName: "Suzanne",
      lastName: "Chang",
      username: "upbeat1811",
    },
    {
      password: hashedPassword,
      firstName: "Zena",
      lastName: "Kelly",
      username: "velvetround",
    },
  ];

  await Promise.all(
    newUsers.map(async (user) => {
      await userRepo.create(user).save();
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
