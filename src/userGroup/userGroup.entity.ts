import { Common } from "src/common/common.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class UserGroup extends Common {
    @PrimaryGeneratedColumn()
    group_id: number

    @Column()
    thumb: string

    @Column()
    cover: string

    @Column()
    name_group: string

    @Column()
    isBlock: boolean

    @OneToOne(() => Users, user => user.group)
    owner: Users

    @ManyToMany(() => Users, user => user.groups)
    @JoinTable()
    users: Users[]
}   