/* eslint-disable @typescript-eslint/no-misused-promises */
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { FeedbackResolver } from "./resolvers/FeedbackResolver";

const PORT = 3001;

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const connection = await createConnection();

  const app = express();
  app.use(express.json());

  // must manually drop tables before running
  // await seedFeedback(connection);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CommentResolver, FeedbackResolver],
      validate: false,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`app listening on PORT: ${PORT}`);
  });
};

void main();
