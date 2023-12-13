import { Common } from "src/common/common.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryColumn()
    id: number

    @Column()
    refresh_token: string

    @Column()
    role: string

    
}