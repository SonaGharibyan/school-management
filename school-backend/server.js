require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const app = express();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      console.error("Token error:", error);
    }
  }
  next();
};

app.use(authenticate);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      prisma,
      user: req.user,
    };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
