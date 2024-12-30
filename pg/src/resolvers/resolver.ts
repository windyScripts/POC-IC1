import { Resolvers } from './types'

export const resolvers: Resolvers = {
    Query: {
      allMessages: async (_, __, {dataSources}) => {
        return 
      },
    },
    Mutation: {
      submitMessage: async (_, {userId, starredMessage}, {dataSources} ) => {
        const { message, source } = starredMessage;
        const submittedMessage = 
  
        return {
          code: 200,
          success: true,
          message: 'Review successfully submitted',
          review: submittedMessage
        }
      }
      },
      User: {

        },
      }
  };