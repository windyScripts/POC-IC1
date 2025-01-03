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

const getMessages = async (email: string) => {
    try{
    const user = await userRepository.findOne({where:{email}});
    if(!user){
        throw new Error(`No user with email ${email}`)
    }

    const messages = await starredMessageRepository.find({where:{user}})
    return {
        status: 200,
        success:true,
        messages,
        message:"Messages retreived successfully."
    }
}catch(err){
    return {
        status: 500,
        success: false,
        messages:[],
        message:err
    }
}

}

const createMessage = async (email:string,message:messageType) => {

        const user = await userRepository.findOne({where:{email}})
        if(!user)throw new Error(`User with email ${email} does not exist.`)
        const starredMessage = new StarredMessages;
        starredMessage.source = message.source
        starredMessage.message = message.message
        starredMessage.user = user;
    
    
   const savedMessage =  await starredMessageRepository.save(starredMessage)
    return {
        status:200,
        savedMessage,
        message:'Message successfully saved.'
    }


}

const createUser = async (name:string, email:string ) =>{
const user = new User;
user.name = name;
user.email = email;
user.starredMessages = [];
const savedUser = await userRepository.save(user);
return {
    status:200,
    message:"User created successfully",
    user: savedUser
}
}

export const resolvers = {
    Query: {
      getUser: async (_:any, { email }:{email:string}) => getUser(email),
      getMessages: async (_:any, { email }:{email:string}) => getMessages(email),
    },
    Mutation: {
      createMessage: async (_:any, { email,message }:{email:string,message:messageType}) => createMessage(email, message),
      createUser: async (_:any,{name,email}:{name:string,email:string})=>createUser(name,email)
    },
  };
  

// type userType = {
//     id:number
//     name: string
//     email: string
//     starredMessages: [StarredMessages]
// }

type messageType = {
    message: string
    source: string
}