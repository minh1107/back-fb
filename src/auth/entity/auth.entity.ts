import { Common } from "src/common/common.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryColumn()
    id: number

    @Column()
    refresh_token: string

    @Column()
    expiredTime: Date;

    @ManyToOne(() => Users, user => user.session)
    user: Users
}