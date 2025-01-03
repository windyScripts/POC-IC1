import gql from 'graphql-tag'

export const typeDefs = gql`
    type Query{
        getUser(id:ID):user
        getMessages(email:String):findStarredMessagesResponse
    }

    type Mutation{
        createMessage(email:String,message:messageInput):createStarredMessageResponse
        createUser(name:String,email:String):createUserResponse
    }

    type user{
        id:ID
        email:String
        name:String
        starredMessages:[starredMessage]
    }

    type findMessagesUser{
        id:ID
        email:String
        name:String
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
        user: findMessagesUser
        
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
        user:findMessagesUser
    }

    type findUserResponse{
        status: Int
        success: Boolean
        user: user
    }

    type createUserResponse{
        status:Int
        success: Boolean
        user: user
    }

`
