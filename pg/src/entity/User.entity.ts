import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, BaseEntity } from "typeorm"
import { StarredMessages } from "./StarredMessages.entity"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany(() => StarredMessages, (starredMessages) => starredMessages.user)
    starredMessages!: Relation<StarredMessages[]>

}
