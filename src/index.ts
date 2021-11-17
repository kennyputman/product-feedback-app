/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createConnection, getConnection } from "typeorm";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { UserResolver } from "./resolvers/UserResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { FeedbackResolver } from "./resolvers/FeedbackResolver";
// import { seedUsers } from "./data/seed";
// import { seedFeedback } from "./data/seed";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CommentResolver, FeedbackResolver],
      validate: false,
    }),
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  // ------------ must manually drop tables before running --------------- //
  // await seedUsers(connection);
  // await seedFeedback(connection);

  await createConnection();

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3001 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
}

void startApolloServer();
