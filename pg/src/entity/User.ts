import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import { StarredMessages } from "./StarredMessages"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => StarredMessages, (starredMessages) => starredMessages.user)
    starredMessages: Relation<StarredMessages>

}
