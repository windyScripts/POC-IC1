import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
       { name: "clickhouse", url: "http://localhost:4002/graphql" },
       { name: "pg", url: "http://localhost:4003/graphql" }

    ],
  }),
});

const server = new ApolloServer({ gateway , introspection: true});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
});

console.log(`Server ready at ${url}`);