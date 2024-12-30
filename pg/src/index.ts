// PG application
// stores user message count and starred messages.
// allows retreival of ten messages.
// subgraph 2.

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-tag';

import { AppDataSource } from "./config/data-source"
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

async function startServer(){
await AppDataSource.initialize();

const port = 4003;

const typeDefs = gql`

`;

const resolvers = {
};


const server = new ApolloServer({
schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});


const { url } = await startStandaloneServer(server, {
listen: { port: port || 4001 },
});

console.log(`Server ready at ${url}`);

}

startServer();