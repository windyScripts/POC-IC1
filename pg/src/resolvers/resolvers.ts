import { AppDataSource } from "../config/pg";
import { User } from "../entity/User.entity";

 const getUser = () => {
    const categoryRepository = AppDataSource.getRepository(User);
}

export const resolvers = {
}