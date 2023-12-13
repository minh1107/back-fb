import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Common } from "../common/common.entity";

@Entity()
export class Users extends Common{  
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({unique: true})
    email: string

    @Column({})
    password: string

    @Column({unique: true})
    phone: string

    @Column({nullable: true})
    avatar: string

    @Column({nullable: true})
    cover_image: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    school: string

    @Column({nullable: true})
    relation: boolean

    @Column({nullable: true})
    instagram: string

    @Column({nullable: true, type:"varchar"})
    website: string

    @Column({nullable: true})
    last_login: Date
}