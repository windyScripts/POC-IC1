import { AppDataSource } from "../config/pg";
import { User } from "../entity/User.entity";
import { StarredMessages } from "../entity/StarredMessages.entity";


const userRepository = AppDataSource.getRepository(User);
const starredMessageRepository = AppDataSource.getRepository(StarredMessages)

 const getUser =  async (email: string) => {
   
    const user = await userRepository.findOne({where:{email}})
    return {
        status: 200,
        success:true,
        user,
    }
}

const getMessages = async (user: userType) => {
    
    const messages = await starredMessageRepository.find({where:{user}})
    return {
        status: 200,
        success:true,
        messages,
    }

}

const createMessage = async (args:userType,message:messageType) => {
    const starredMessage = new StarredMessages;
    starredMessage.source = message.source
    starredMessage.message = message.message
    starredMessage.user = args;
   const savedMessage =  await starredMessageRepository.save(starredMessage)
    return {
        status:200,
        savedMessage,
        message:'Message successfully saved.'
    }


}

export const resolvers = {
    Query: {
      getUser: async (_:any, { email }:{email:string}) => getUser(email),
      getMessages: async (_:any, { input }:{input:userType}) => getMessages(input),
    },
    Mutation: {
      createMessage: async (_:any, { input }:{input:{args:userType,message:messageType}}) => createMessage(input.args, input.message),
    },
  };
  

type userType = {
    id:number
    name: string
    email: string
    starredMessages: [StarredMessages]
}

type messageType = {
    id: number
    message: string
    source: string
    user: User
}