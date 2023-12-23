import { Common } from "src/common/common.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FriendRequest extends Common{
    @PrimaryGeneratedColumn()
    friend_request_id: number

    @Column()
    status: string

    @ManyToOne(() => Users, user => user.user_requested)
    users: Users
}