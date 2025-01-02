import gql from 'graphql-tag'

export const typeDefs = gql`
    type Query{
        getUser(id:ID):user
        getMessages(input:userInput):[starredMessage]
    }

    type Mutation{
        createMessage(input:messageInput):createStarredMessageResponse
    }

    type user{
        id:ID
        email:String
        name:String
        starredMessages:[starredMessage]
    }

    input userInput{
        email:String
        name:String
        #starredMessages:[starredMessage]
    }

    input messageInput{
        source:String
        message: String
    }

    type starredMessage {
        id:ID
        source:String
        message: String
        
    }

    type createStarredMessageResponse{
        status: Int
        savedMessage: starredMessage
        message: String
    }

    type findStarredMessagesResponse{
        status: Int
        success: Boolean
        messages: [starredMessage]
    }

    type findUserResponse{
        status: Int
        success: Boolean
        user: user
    }

`
