import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class GroupCategory {
    @PrimaryGeneratedColumn()
    group_category_id: number

    @Column()
    tag: string

}