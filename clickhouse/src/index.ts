import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import bodyParser from 'body-parser';

import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './typeDefs/typeDefs';

const PORT = 4001;

// Create the ApolloServer instance with the federated schema
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

async function startServer() {
  const app = express();

  // Start the Apollo Server
  await server.start();

  // Add Apollo middleware to the Express app
  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server)
  );

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Subgraph running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
