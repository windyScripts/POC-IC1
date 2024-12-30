import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm"
import { User } from "./User"

@Entity()
export class StarredMessages {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @ManyToOne(() => User, (user) => user.starredMessages)
    user: Relation<User>

    @Column()
    source: string

}
