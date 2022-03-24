const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  await server.start();

  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});
