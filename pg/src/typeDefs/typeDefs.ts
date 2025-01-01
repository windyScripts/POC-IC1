import gql from 'graphql-tag'

export const typeDefs = gql`
    type Query{
        getUser(id:ID):user
    }

    type Query{
        getMessages(user:User):[starredMessage]
    }

    type Mutation{
        createMessage(message):response
    }

    type user{
        id:ID
        email:String
        name:string
        starredMessages:[starredMessage]
    }

    type starredMessage {
        id:ID
        source:String
        message: String
        
    }

    type createStarredMessageResponse{
        
    }

    type findStarredMessagesResponse{

    }

    type findUserResponse{
        
    }

`
