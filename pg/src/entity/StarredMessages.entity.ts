import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, BaseEntity } from "typeorm"
import { User } from "./User.entity"

@Entity()
export class StarredMessages extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    message!: string

    @ManyToOne(() => User, (user) => user.starredMessages)
    user!: Relation<User>

    @Column()
    source!: string

}
