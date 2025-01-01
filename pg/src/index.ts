console.log('Server');

import { ApolloServer } from '@apollo/server';
import { AppDataSource } from './config/pg';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './typeDefs/typeDefs';

// import { User } from './entity/User.entity';
// import { StarredMessages } from './entity/StarredMessages.entity';

const startServer = async () => {
    await AppDataSource.initialize();
    const schema= buildSubgraphSchema([{ typeDefs, resolvers }])

    const server  = new ApolloServer({
        schema:schema
    });


    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 },
    });

    console.log(`🚀 Server ready at ${url}`);
    
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    
    // const starredMessage = new StarredMessages()
    // starredMessage.source = 'sender1'
    // starredMessage.message = 'Hi.'
    // starredMessage.user = user;

    // user.starredMessages = [starredMessage]

    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // await AppDataSource.manager.save(starredMessage)
    // console.log("Saved a new message with id: " + starredMessage.id)

};

startServer();
