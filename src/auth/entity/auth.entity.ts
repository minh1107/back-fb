import { Common } from "src/common/common.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    auth_id: number

    @Column()
    refresh_token: string

    @Column()
    expiredTime: Date;

    @Column()
    user_id: number

    @ManyToOne(() => Users, user => user.session)
    user: Users
}