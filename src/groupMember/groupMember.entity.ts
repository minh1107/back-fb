import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class GroupMember {
    @PrimaryGeneratedColumn()
    group_member_id: number

    @Column()
    position: string

    // @ManyToOne(() => )
}