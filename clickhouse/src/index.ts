import client from './db';

const initializeDatabase = async () => {
    await client.query({
        query: `
            CREATE TABLE IF NOT EXISTS user_activities (
                userId String,
                activity String,
                timestamp DateTime
            ) ENGINE = MergeTree()
            ORDER BY timestamp;
        `,
        format: 'JSONEachRow',
    });
};

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/activitySchema';
import { resolvers } from './resolvers/activityResolver';
//import initializeDatabase from './db';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL for testing
}));

initializeDatabase().then(() => {
    app.listen(4002, () => {
        console.log('Server is running at http://localhost:4002/graphql');
    });
});


export default initializeDatabase;
