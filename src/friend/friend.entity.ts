import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "../common/common.entity";
import { Users } from "src/users/users.entity";

@Entity()
export class Friend extends Common {
    @PrimaryGeneratedColumn()
    friend_id: number

    @Column()
    status: boolean

    @ManyToOne(() => Users, {nullable: false})
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user_id: Users

    @ManyToOne(() => Users, {nullable: false})
    @JoinColumn({ name: 'friend', referencedColumnName: 'user_id' })
    friend: Users
}