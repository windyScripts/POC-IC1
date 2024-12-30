import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type UserActivity {
        userId: String!
        activity: String!
        timestamp: String!
    }

    type Query {
        getActivities(userId: String): [UserActivity]
    }

    type Mutation {
        addActivity(userId: String!, activity: String!): UserActivity
    }
`);

export default schema;
