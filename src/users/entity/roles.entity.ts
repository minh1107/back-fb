import { Common } from "src/common/common.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

export enum role {
    USER = 0,
    STAFF = 1,
    ADMIN = 2,
  }

@Entity()
export class Roles extends Common{
    @PrimaryGeneratedColumn()
    role_id: number

    @Column({type: 'enum', enum: role, default: role.USER})
    role: number

    @ManyToMany(() => Users, users => users.roles, {
      onDelete: 'CASCADE',
    })
    @JoinTable()
    users: Users[]
}

