import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import bodyParser from 'body-parser';

import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './typeDefs/typeDefs';
import { cHClient } from './config/clickhouse-config';

const PORT = 4002;

// Create the ApolloServer instance with the federated schema
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

async function startServer() {

  const query = `
  CREATE TABLE IF NOT EXISTS userMessages (
    id UInt32,
    userEmail String,
    text String,
    engagement Enum8('Ignored'=0,'Opened'=1,'Starred'=2),
    type Enum8('news'=1, 'info'=2),
    sendTime UInt32
) ENGINE = MergeTree
 ORDER BY (id)`

  cHClient.exec({query})

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
