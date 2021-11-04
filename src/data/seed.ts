import { Connection } from "typeorm";
import { Category } from "../types/types";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";

const seedUsers = async (connection: Connection) => {
  const userRepo = connection.getRepository(User);

  const user1 = new User();
  user1.password = "Salasana";
  user1.firstName = "Victoria";
  user1.lastName = "Meijia";
  user1.username = "arlen_the_marlin";
  user1.image = "./assets/user-images/image-victoria.jpg";
  await userRepo.save(user1);

  const user2 = new User();
  user2.password = "Salasana";
  user2.firstName = "Jackson";
  user2.lastName = "Barker";
  user2.username = "countryspirit";
  user2.image = "./assets/user-images/image-jackson.jpg";
  await userRepo.save(user2);

  const user3 = new User();
  user3.password = "Salasana";
  user3.firstName = "Zena";
  user3.lastName = "Kelley";
  user3.username = "velvetround";
  user3.image = "./assets/user-images/image-zena.jpg";
  await userRepo.save(user3);
};

const seedFeedback = async (connection: Connection) => {
  await seedUsers(connection);
  const feedbackRepo = connection.getRepository(Feedback);
  const userRepo = connection.getRepository(User);
  const feedback = new Feedback();

  const userSubmits = await userRepo.findOne({ where: { firstName: "Zena" } });

  if (userSubmits) {
    feedback.title = "Ability to follow others";
    feedback.category = Category.FEATURE;
    feedback.description =
      "Stay updated on comments and solutions other people post";
    feedback.user = userSubmits;
    await feedbackRepo.save(feedback);
  }
};

// const seedComment = async (connection: Connection) => {
//   const commentRepo = connection.getRepository(Comment);
//   const comment = new Comment();
//   comment.content;
//   comment.description =
//     "It would help people with light sensitivities and who prefer dark mode";
//   comment.title = "Add a dark theme option";

//   await commentRepo.save(comment);
// };

export { seedUsers, seedFeedback };
