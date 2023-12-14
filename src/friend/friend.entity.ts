import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "../common/common.entity";
import { Users } from "src/users/users.entity";

@Entity()
export class Friend extends Common {
    @PrimaryGeneratedColumn()
    friend_id: number

    @Column()
    status: boolean

    @ManyToMany(() => Users, user => user.friends)
    users: Users[]
}