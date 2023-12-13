import { Column, Entity } from "typeorm";

@Entity()
export class Common {
    @Column({nullable: true})
    created_on: Date

    @Column({nullable: true})
    updated_at: Date
}