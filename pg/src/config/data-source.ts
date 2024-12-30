import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"
import { StarredMessages } from "../entity/StarredMessages"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, StarredMessages],
    migrations: [],
    subscribers: [],
})
