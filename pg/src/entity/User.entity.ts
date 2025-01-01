import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, BaseEntity } from "typeorm"
import { StarredMessages } from "./StarredMessages.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @OneToMany(() => StarredMessages, (starredMessages) => starredMessages.user)
    starredMessages!: Relation<StarredMessages[]>

}
